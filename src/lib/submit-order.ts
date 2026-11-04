import { createServerFn } from "@tanstack/react-start";
import { orderRequestSchema } from "./order-request";

export const submitOrder = createServerFn({ method: "POST" })
  .validator(orderRequestSchema)
  .handler(async ({ data }) => {
    const { sendOrderEmails } = await import("./order-email.server");
    return sendOrderEmails(data);
  });
