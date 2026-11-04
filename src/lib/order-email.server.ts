import nodemailer from "nodemailer";
import { orderRequestSchema, type OrderRequest, type OrderResult } from "./order-request";
import { customerConfirmation } from "./emails/customer-confirmation";

type Email = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  attachments?: ReturnType<typeof customerConfirmation>["attachments"];
};
type SendMail = (email: Email) => Promise<{ accepted: unknown[] }>;
type Config = { from: string; to: string };
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!,
  );
function htmlEmail(title: string, text: string) {
  return `<div style="font-family:Arial,sans-serif;background:#faf9f5;padding:32px;color:#151515;max-width:600px;margin:auto"><div style="color:#649f18;font-size:24px;font-weight:bold">Random Sips</div><h1 style="font-size:22px">${escapeHtml(title)}</h1><div style="white-space:pre-wrap;font-size:14px;line-height:1.7">${escapeHtml(text)}</div><hr style="border:0;border-top:1px solid #dce6ce;margin-top:28px"><p style="color:#71815e;font-size:12px">Fresh. Natural. Refreshing.</p></div>`;
}

// Deduplicates concurrent submissions/retries within this server process.
// SMTP itself does not support transactional or durable idempotency.
export function createOrderEmailService(send: SendMail, config: Config) {
  const requests = new Map<
    string,
    { fingerprint: string; promise: Promise<OrderResult>; expires: number }
  >();
  const attempts = new Map<string, { count: number; expires: number }>();
  return async (input: OrderRequest): Promise<OrderResult> => {
    const parsed = orderRequestSchema.safeParse(input);
    if (!parsed.success)
      return { ok: false, message: "Please check your contact and delivery details." };
    const data = parsed.data;
    const now = Date.now();
    for (const [key, value] of requests) if (value.expires < now) requests.delete(key);
    for (const [key, value] of attempts) if (value.expires < now) attempts.delete(key);
    const fingerprint = JSON.stringify(data);
    const existing = requests.get(data.requestId);
    if (existing)
      return existing.fingerprint === fingerprint
        ? existing.promise
        : { ok: false, message: "Please reopen the form and try again." };
    const emailKey = data.email.toLowerCase();
    const attempt = attempts.get(emailKey);
    if ((attempt?.count ?? 0) >= 3 || requests.size >= 1000)
      return { ok: false, message: "Please wait a few minutes before sending another request." };
    attempts.set(emailKey, {
      count: (attempt?.count ?? 0) + 1,
      expires: attempt?.expires ?? now + 10 * 60_000,
    });
    const reference = `RS-${data.requestId.toUpperCase()}`;
    const details = `Reference: ${reference}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nFresh coconut water: ${data.quantity} × 250 ml\nBottle subtotal: ₹${data.quantity * 100}\n\nDelivery address:\n${data.address}\n\nNotes: ${data.notes || "None"}`;
    const task = (async (): Promise<OrderResult> => {
      const businessText = `A new coconut water request has arrived.\n\n${details}\n\nPlease contact the customer to confirm availability, delivery charges, and the final order.`;
      try {
        const receipt = await send({
          from: config.from,
          to: config.to,
          replyTo: data.email,
          subject: `New Random Sips request · ${reference}`,
          text: businessText,
          html: htmlEmail("A fresh request just arrived", businessText),
        });
        if (!receipt.accepted.length) throw new Error("Business recipient rejected");
      } catch {
        requests.delete(data.requestId);
        return {
          ok: false,
          message: "We couldn't send your request right now. Please try again shortly.",
        };
      }
      try {
        const receipt = await send({
          from: config.from,
          to: data.email,
          replyTo: config.to,
          ...customerConfirmation(data, reference, config.to),
        });
        return { ok: true, reference, confirmationSent: receipt.accepted.length > 0 };
      } catch {
        // The business already received the request: don't ask the user to submit it again.
        return { ok: true, reference, confirmationSent: false };
      }
    })();
    requests.set(data.requestId, { fingerprint, promise: task, expires: now + 24 * 60 * 60_000 });
    return task;
  };
}

let configuredService: ReturnType<typeof createOrderEmailService> | undefined;
export async function sendOrderEmails(data: OrderRequest): Promise<OrderResult> {
  const {
    SMTP_HOST,
    SMTP_PORT = "587",
    SMTP_SECURE = "false",
    SMTP_USER,
    SMTP_PASS,
    EMAIL_FROM,
    ORDER_EMAIL_TO,
  } = process.env;
  if (
    !SMTP_HOST ||
    !SMTP_USER ||
    !SMTP_PASS ||
    !EMAIL_FROM ||
    !ORDER_EMAIL_TO ||
    /example\.com|replace[-_ ]?me|dummy/i.test(`${SMTP_HOST} ${SMTP_USER} ${SMTP_PASS}`)
  ) {
    return {
      ok: false,
      message: "Email requests aren't available just yet. Please try again soon.",
    };
  }
  const port = Number(SMTP_PORT);
  if (
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    !["true", "false"].includes(SMTP_SECURE)
  )
    return {
      ok: false,
      message: "Email requests aren't available just yet. Please try again soon.",
    };
  if (!configuredService) {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: SMTP_SECURE === "true",
      requireTLS: SMTP_SECURE !== "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    configuredService = createOrderEmailService((email) => transport.sendMail(email), {
      from: EMAIL_FROM,
      to: ORDER_EMAIL_TO,
    });
  }
  return configuredService(data);
}
