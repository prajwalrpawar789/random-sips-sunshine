import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";
import { customerConfirmation } from "../src/lib/emails/customer-confirmation.ts";

// Example data only. Stream transport creates files and never connects to SMTP.
const data = {
  requestId: "817957f1-c7e0-46a8-a237-b8a2739730ba",
  name: "Ananya",
  email: "ananya@example.com",
  phone: "+91 90000 00000",
  address: "12 Palm Avenue\nPune, Maharashtra 411001",
  quantity: 12,
  notes: "Please call before arrival.",
  website: "",
};
const reference = `RS-${data.requestId.toUpperCase()}`;
const email = customerConfirmation(data, reference, "info@randomsips.in");
const output = new URL("../artifacts/", import.meta.url);
await mkdir(output, { recursive: true });
await writeFile(
  new URL("customer-confirmation.html", output),
  email.html.replace(
    "cid:random-sips-logo",
    `data:image/png;base64,${email.attachments[0].content}`,
  ),
);
const transport = nodemailer.createTransport({
  streamTransport: true,
  buffer: true,
  newline: "windows",
});
const mime = await transport.sendMail({
  from: "Random Sips <info@randomsips.in>",
  to: data.email,
  replyTo: "info@randomsips.in",
  ...email,
});
await writeFile(new URL("customer-confirmation.eml", output), mime.message);
console.log(
  `Example email preview: ${fileURLToPath(new URL("customer-confirmation.html", output))}`,
);
