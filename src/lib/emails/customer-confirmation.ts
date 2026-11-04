import type { OrderRequest } from "../order-request";
import { emailLogo } from "./email-logo.ts";

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!,
  );
const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export function customerConfirmation(data: OrderRequest, reference: string, replyEmail: string) {
  const safe = {
    name: escape(data.name),
    reference: escape(reference),
    address: escape(data.address).replace(/\r?\n/g, "<br>"),
    phone: escape(data.phone),
    email: escape(data.email),
    notes: escape(data.notes).replace(/\r?\n/g, "<br>"),
  };
  const total = money(data.quantity * 100);
  const text = `RANDOM SIPS — Fresh. Natural. Refreshing.\n\nYour request is with us!\n\nHi ${data.name},\n\nThanks for choosing Random Sips. We've received your request for ${data.quantity} bottles of fresh coconut water. Our team will get in touch to confirm availability, delivery details, and any delivery charges.\n\nREQUEST SUMMARY\nReference: ${reference}\nFresh coconut water · 250 ml per bottle\nQuantity: ${data.quantity}\nPrice per bottle: ₹100\nBottle subtotal: ${total}\nDelivery charges: To be confirmed\n\nDELIVERY DETAILS\n${data.name}\n${data.address}\nPhone: ${data.phone}\nEmail: ${data.email}\n${data.notes ? `\nYour note: ${data.notes}\n` : ""}\nWHAT HAPPENS NEXT?\n1. Our team checks your request and availability.\n2. We contact you to confirm delivery and the final amount.\n\nYour order and delivery are not confirmed yet. No payment has been taken.\n\nNeed to change something? Reply to this email and include your request reference.\n\nStay refreshed,\nThe Random Sips team\n\nInstagram: https://www.instagram.com/random_sips11`;
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Your Random Sips request</title><style>@media only screen and (max-width:620px){.outer{padding:12px!important}.content{padding-left:24px!important;padding-right:24px!important}.headline{font-size:32px!important}.brand-logo{width:66px!important;height:66px!important}.brand-name{font-size:24px!important}}</style></head>
<body style="margin:0;padding:0;background:#eef2e8;color:#20271b;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%">
<div style="display:none;font-size:1px;color:#eef2e8;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all">Thanks for your request! Here’s your summary and what happens next. Delivery confirmation will follow.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#eef2e8"><tr><td class="outer" align="center" style="padding:32px 16px">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#fffdf8;border:1px solid #dfe6d4;border-radius:20px;overflow:hidden">
<tr><td class="content" style="padding:28px 40px;border-bottom:1px solid #e4e9dc;background:#f5f7ee"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td width="98"><img class="brand-logo" src="cid:random-sips-logo" width="78" height="78" alt="Random Sips" style="display:block;border:0;width:78px;height:78px"></td><td><p class="brand-name" style="margin:0 0 7px;color:#27572a;font-family:Georgia,'Times New Roman',serif;font-size:29px;font-weight:bold">Random Sips</p><p style="margin:0;color:#6c8259;font-size:9px;letter-spacing:1.8px;text-transform:uppercase">Fresh · Natural · Refreshing</p></td></tr></table></td></tr>
<tr><td class="content" style="padding:36px 40px 24px"><span style="display:inline-block;border:1px solid #d5e5bc;background:#edf5e0;border-radius:20px;padding:8px 12px;color:#59841f;font-size:10px;font-weight:bold;letter-spacing:1.2px">REQUEST RECEIVED</span><h1 class="headline" style="margin:22px 0;color:#1e2b19;font-family:Georgia,'Times New Roman',serif;font-size:38px;line-height:1.12;letter-spacing:-1px">Your fresh sips are<br>one step closer.</h1><p style="margin:0 0 12px;font-size:15px;line-height:1.7">Hi ${safe.name},</p><p style="margin:0;font-size:14px;line-height:1.8;color:#6b7363">Thanks for choosing Random Sips! We’ve received your request. Here’s a little recap while our team checks availability and plans your delivery.</p></td></tr>
<tr><td class="content" style="padding:0 40px 28px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f7ed;border:1px solid #dfe7d3;border-radius:12px"><tr><td style="padding:22px"><p style="margin:0 0 9px;color:#6c8253;font-size:10px;font-weight:bold;letter-spacing:1.3px;text-transform:uppercase">Your request reference</p><p style="margin:0;color:#34472a;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;word-break:break-all;overflow-wrap:anywhere">${safe.reference}</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;border-top:1px solid #dce5d0"><tr><td colspan="2" style="padding:19px 0 15px"><p style="margin:0 0 5px;color:#273b1b;font-size:15px;font-weight:bold">Fresh coconut water</p><p style="margin:0;color:#7a856f;font-size:12px">250 ml per bottle · ${money(100)} each</p></td></tr><tr><td style="padding:6px 0;font-size:13px;color:#6b7363">Bottles</td><td align="right" style="padding:6px 0;font-size:13px;color:#34472a;font-weight:bold">${data.quantity.toLocaleString("en-IN")}</td></tr><tr><td style="padding:8px 0 17px;font-size:12px;color:#6b7363">Delivery charges</td><td align="right" style="padding:8px 0 17px;font-size:12px;color:#6b7363">To be confirmed</td></tr><tr><td style="padding-top:17px;border-top:1px solid #dce5d0;font-size:14px;font-weight:bold;color:#273b1b">Bottle subtotal</td><td align="right" style="padding-top:17px;border-top:1px solid #dce5d0;font-size:24px;font-weight:bold;color:#507c1a">${total}</td></tr></table></td></tr></table></td></tr>
<tr><td class="content" style="padding:0 40px 25px"><h2 style="margin:0 0 13px;font-size:12px;letter-spacing:1px;color:#4d6537;text-transform:uppercase">Delivery details</h2><p style="margin:0 0 7px;font-size:14px;font-weight:bold;line-height:1.6">${safe.name}</p><p style="margin:0 0 12px;font-size:13px;line-height:1.8;color:#6b7363;overflow-wrap:anywhere">${safe.address}</p><p style="margin:0;font-size:12px;line-height:1.9;color:#6b7363;overflow-wrap:anywhere">${safe.phone}<br>${safe.email}</p>${data.notes ? `<p style="margin:16px 0 0;font-size:12px;line-height:1.8;color:#6b7363"><strong style="color:#4d6537">Your note</strong><br>${safe.notes}</p>` : ""}</td></tr>
<tr><td class="content" style="padding:0 40px 28px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #e4e9dc"><tr><td style="padding-top:24px"><h2 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:23px;color:#273b1b">What happens next?</h2><p style="margin:0 0 10px;font-size:13px;line-height:1.8;color:#6b7363"><strong style="color:#71a335">01.</strong>&nbsp; We check your request and bottle availability.</p><p style="margin:0 0 20px;font-size:13px;line-height:1.8;color:#6b7363"><strong style="color:#71a335">02.</strong>&nbsp; We get in touch to confirm delivery and your final amount.</p><p style="margin:0;background:#fff7e7;border-left:3px solid #e8c365;padding:13px 15px;color:#817043;font-size:12px;line-height:1.7">This email acknowledges your request. Your order and delivery are not confirmed yet. No payment has been taken.</p></td></tr></table></td></tr>
<tr><td class="content" style="padding:0 40px 32px"><p style="margin:0 0 18px;font-size:13px;line-height:1.8;color:#6b7363">Need to change something? <a href="mailto:${escape(encodeURIComponent(replyEmail))}" style="color:#598a20;font-weight:bold;text-decoration:underline">Reply to this email</a> and include your request reference. We’re happy to help.</p><p style="margin:0;font-size:14px;line-height:1.8;color:#3d5529">Stay refreshed,<br><strong>The Random Sips team</strong></p></td></tr>
<tr><td class="content" align="center" style="padding:24px 40px;background:#e8f0db;border-top:1px solid #d9e4c9"><a href="https://www.instagram.com/random_sips11" style="color:#4d7230;font-size:12px;font-weight:bold;text-decoration:none">A little everyday sunshine · @random_sips11</a><p style="margin:13px 0 0;color:#7b8a6b;font-size:10px;line-height:1.7">You received this email because you submitted a request to Random Sips.<br>© ${new Date().getFullYear()} Random Sips. Fresh. Natural. Refreshing.</p></td></tr>
</table></td></tr></table></body></html>`;
  return {
    subject: `Your Random Sips request is with us · ${reference}`,
    text,
    html,
    attachments: [
      {
        filename: "random-sips-logo.png",
        content: emailLogo,
        encoding: "base64",
        cid: "random-sips-logo",
        contentType: "image/png",
        contentDisposition: "inline" as const,
      },
    ],
  };
}
