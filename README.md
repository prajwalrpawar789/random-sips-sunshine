# Random Sips

Responsive coconut water landing page with a request form, optional delivery-area
lookup, and SMTP request / customer acknowledgment emails.

## Local development

Use Node.js 24 and npm. The npm lockfile is the source of truth.

```sh
npm ci
npm run dev
```

Copy `.env.example` to `.env.local` on a new checkout. The existing local file
contains placeholder SMTP settings until you replace them. Environment files
are ignored by Git. Do not put credentials in `VITE_` variables.

## Production: Vercel

The build targets Nitro’s `vercel` preset and generates Vercel Node functions
plus static assets. SMTP stays server-side. `vercel.json` identifies TanStack
Start; Node.js 24 is pinned in `package.json`. Do not override the output
directory with a static folder such as `dist`.

Add these in Vercel → Project Settings → Environment Variables for the
Production environment (and Preview if you want to test email there):

| Variable         | Purpose                                                  |
| ---------------- | -------------------------------------------------------- |
| `SMTP_HOST`      | Email provider's SMTP hostname                           |
| `SMTP_PORT`      | Usually 587 (STARTTLS) or 465 (TLS)                      |
| `SMTP_SECURE`    | `false` for 587; `true` for 465                          |
| `SMTP_USER`      | SMTP username / sending mailbox                          |
| `SMTP_PASS`      | SMTP password or app password                            |
| `EMAIL_FROM`     | Verified sender, e.g. `Random Sips <info@randomsips.in>` |
| `ORDER_EMAIL_TO` | Inbox that receives customer requests                    |

The example recipient is `poojakothawale1105@gmail.com`. Replace it if needed.
No credential values are printed by the environment check.

```sh
npm ci
npm run check
npm test
npm run build
npm run check:env
```

Import the Git repository in Vercel, select the folder containing this
`package.json`, and confirm the framework is **TanStack Start**. The install
command is `npm ci` and the build command is `npm run build`. Vercel consumes
`.vercel/output/` automatically. Add your SMTP settings before production
launch, then deploy. Environment-variable changes require a redeployment.

Vercel provides HTTPS for deployed domains, which the location feature requires.
Do not switch the email function to the Edge runtime: Nodemailer uses Node APIs.
The production build can be reviewed through a Vercel preview deployment.

For a local environment check, run
`node --env-file=.env.local scripts/check-production-env.mjs`. The script checks
configuration without sending an email or printing credentials.

Deployment references:

- https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel
- https://nitro.build/deploy/providers/vercel

Before accepting live requests, replace dummy SMTP settings, verify the sending
mailbox/domain, and test both the business email and customer acknowledgment.
Dummy SMTP settings return an error rather than claiming a request was sent.

## Request behavior

Bottles cost ₹100 each (250 ml). Customers can type custom whole-number
quantities, including bulk requests. The server validates all fields and
calculates the subtotal. Delivery and the final amount need team confirmation;
the form does not collect payment.

The business is emailed first. The customer then receives a separate branded
acknowledgment, with replies going to `ORDER_EMAIL_TO`. A failed business send
shows an error. If only the customer copy fails, the page explains that the
request reached the team but the email copy failed.

CSRF protection, a honeypot, and per-email throttling are enabled. Retry
suppression and throttling are in-memory within one function instance. Vercel
can run multiple instances, so these are best-effort protections. Before
scaling campaigns or relying on guaranteed deduplication, add shared request
storage / a queue and a shared rate limiter, plus appropriate Vercel Firewall
rules for the request endpoint.
SMTP acceptance is not proof of inbox delivery.

## Optional location lookup

“Use my location” requests location only after the customer clicks it. With
permission, fresh coordinates go directly from the customer's browser to
BigDataCloud's free client-side reverse-geocoding endpoint. No API key is needed.
Coordinates are not persisted by this app, sent to SMTP, or included in emails.
The provider receives coordinates and the client's IP address under its own
privacy policy. The form explains this before the customer uses the button.

The lookup fills an approximate area / city / state / postcode when available;
it does not determine a house number or street. Customers must complete and
check their address. Manual entry works without any location permission.
Denied access, timeout, provider failure, and IP-only results do not prevent
manual entry. A pending lookup does not overwrite an edited address.

Provider documentation:

- https://www.bigdatacloud.com/docs/free-api/free-reverse-geocode-to-city-api
- https://www.bigdatacloud.com/privacy-and-cookie-policy

## Email template preview

`src/lib/emails/customer-confirmation.ts` generates HTML and plain-text messages
with an inline PNG logo. User text is escaped before entering HTML.

```sh
npm run email:preview
```

This creates example HTML / EML files under ignored `artifacts/`, using a local
stream transport that sends no email. These files are not public site routes.

## Project structure

- `src/components/landing/`: active landing page and request form
- `src/components/ui/dialog.tsx`: accessible recipe / information dialogs
- `src/lib/`: request validation, SMTP, email template, location lookup
- `src/assets/`: optimized images used by the live page
- `src/test/`: route, SMTP behavior, and location fallback tests
- `scripts/`: production environment check and offline email preview

The existing Lovable project metadata and Git history are preserved. Legacy
components and duplicate assets were archived outside this project before
cleanup. Generated builds, local environment files, and previews are ignored.
