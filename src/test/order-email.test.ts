// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { createOrderEmailService, sendOrderEmails } from "@/lib/order-email.server";
import type { OrderRequest } from "@/lib/order-request";

const request: OrderRequest = {
  requestId: "817957f1-c7e0-46a8-a237-b8a2739730ba",
  name: "Test <Customer>",
  email: "customer@example.com",
  phone: "+91 9876543210",
  address: "123 Test Street, Pune 411001",
  quantity: 3,
  notes: "Before noon",
  website: "",
};
const config = { from: "Random Sips <info@example.com>", to: "team@example.com" };

describe("Order request emails", () => {
  it("sends separate business and customer emails with server-calculated pricing", async () => {
    const send = vi.fn().mockResolvedValue({ accepted: ["recipient"] });
    const service = createOrderEmailService(send, config);
    const result = await service({ ...request, quantity: 1000 });
    expect(result).toMatchObject({ ok: true, confirmationSent: true });
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[0]?.[0]).toMatchObject({ to: config.to, replyTo: request.email });
    expect(send.mock.calls[1]?.[0]).toMatchObject({ to: request.email, replyTo: config.to });
    expect(send.mock.calls[0]?.[0].text).toContain("1000 × 250 ml");
    expect(send.mock.calls[0]?.[0].text).toContain("₹100000");
    expect(send.mock.calls[1]?.[0].html).toContain("Test &lt;Customer&gt;");
    expect(send.mock.calls[1]?.[0].text).toContain("not confirmed yet");
    expect(send.mock.calls[1]?.[0].html).toContain("₹1,00,000");
    expect(send.mock.calls[1]?.[0].html).toContain("cid:random-sips-logo");
    expect(send.mock.calls[1]?.[0].attachments[0]).toMatchObject({
      cid: "random-sips-logo",
      contentType: "image/png",
      contentDisposition: "inline",
    });
    expect(send.mock.calls[1]?.[0].html).toContain("https://www.instagram.com/random_sips11");
  });

  it("deduplicates concurrent submissions and rejects altered data under the same ID", async () => {
    const send = vi.fn().mockResolvedValue({ accepted: ["recipient"] });
    const service = createOrderEmailService(send, config);
    await Promise.all([service(request), service(request)]);
    expect(send).toHaveBeenCalledTimes(2);
    expect(await service({ ...request, quantity: 12 })).toMatchObject({ ok: false });
  });

  it("does not acknowledge an order to the customer if the business email failed", async () => {
    const send = vi.fn().mockRejectedValue(new Error("SMTP unavailable"));
    expect(await createOrderEmailService(send, config)(request)).toMatchObject({ ok: false });
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("preserves accepted requests when only the customer email fails", async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce({ accepted: [config.to] })
      .mockRejectedValueOnce(new Error("Customer rejected"));
    const service = createOrderEmailService(send, config);
    expect(await service(request)).toMatchObject({ ok: true, confirmationSent: false });
    await service(request);
    expect(send).toHaveBeenCalledTimes(2);
  });

  it("rejects invalid input without sending email", async () => {
    const send = vi.fn();
    const service = createOrderEmailService(send, config);
    expect(await service({ ...request, quantity: -1 })).toMatchObject({ ok: false });
    expect(await service({ ...request, quantity: 1.5 })).toMatchObject({ ok: false });
    expect(await service({ ...request, email: "bad\r\nBcc:spam@example.com" })).toMatchObject({
      ok: false,
    });
    expect(await service({ ...request, website: "spam" })).toMatchObject({ ok: false });
    expect(send).not.toHaveBeenCalled();
  });

  it("does not send or report success with dummy SMTP settings", async () => {
    vi.stubEnv("SMTP_HOST", "smtp.example.com");
    expect(await sendOrderEmails(request)).toMatchObject({ ok: false });
    vi.unstubAllEnvs();
  });
});
