import { z } from "zod";

// Keep the calculated ₹100-per-bottle subtotal within JavaScript's safe integer range.
export const MAX_BOTTLE_QUANTITY = Math.floor(Number.MAX_SAFE_INTEGER / 100);

export const orderRequestSchema = z.object({
  requestId: z.string().uuid(),
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number.")
    .max(25)
    .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number."),
  address: z.string().trim().min(10, "Please include your delivery address and postcode.").max(600),
  quantity: z.number().int().min(1).max(MAX_BOTTLE_QUANTITY),
  notes: z.string().trim().max(1000),
  website: z.string().max(0),
});

export type OrderRequest = z.infer<typeof orderRequestSchema>;
export type OrderResult =
  { ok: true; reference: string; confirmationSent: boolean } | { ok: false; message: string };
