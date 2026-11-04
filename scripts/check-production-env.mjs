// Read the actual runtime environment. For local checks:
// node --env-file=.env.local scripts/check-production-env.mjs
const required = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "EMAIL_FROM",
  "ORDER_EMAIL_TO",
  "ORDER_EMAIL_BCC",
];
const invalid = required.filter((key) => !process.env[key]?.trim());
for (const key of ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"]) {
  if (
    /example\.com|yourprovider|yourdomain|yourcompany|replace[-_ ]?me|dummy/i.test(
      process.env[key] ?? "",
    )
  )
    invalid.push(key);
}
const port = Number(process.env.SMTP_PORT);
if (!Number.isInteger(port) || port < 1 || port > 65535) invalid.push("SMTP_PORT");
if (!["true", "false"].includes(process.env.SMTP_SECURE ?? "")) invalid.push("SMTP_SECURE");
const address = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;
if (!address.test(process.env.ORDER_EMAIL_TO ?? "")) invalid.push("ORDER_EMAIL_TO");
if (!address.test(process.env.ORDER_EMAIL_BCC ?? "")) invalid.push("ORDER_EMAIL_BCC");
const sender =
  (process.env.EMAIL_FROM ?? "").match(/<([^<>]+)>$/)?.[1] ?? process.env.EMAIL_FROM ?? "";
if (!address.test(sender)) invalid.push("EMAIL_FROM");
if (invalid.length) {
  console.error(
    `Production email settings need attention: ${[...new Set(invalid)].join(", ")}. Set real values in your hosting environment. No credentials have been printed.`,
  );
  process.exitCode = 1;
} else {
  console.log(
    "Required email settings are present. Verify a real request and customer acknowledgment before launch.",
  );
}
