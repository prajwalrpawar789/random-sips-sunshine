import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, LoaderCircle, LocateFixed, Mail, Minus, Plus } from "lucide-react";
import { MAX_BOTTLE_QUANTITY, orderRequestSchema, type OrderResult } from "@/lib/order-request";
import { submitOrder } from "@/lib/submit-order";
import { detectDeliveryArea } from "@/lib/delivery-location";

export function OrderRequestForm() {
  const [quantity, setQuantity] = useState<number | "">(6);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Extract<OrderResult, { ok: true }> | null>(null);
  const [email, setEmail] = useState("");
  const request = useRef({ signature: "", id: "" });
  const addressInput = useRef<HTMLTextAreaElement>(null);
  const locationRequest = useRef<AbortController | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");

  useEffect(() => () => locationRequest.current?.abort(), []);

  async function useLocation() {
    if (locating) return;
    const controller = new AbortController();
    locationRequest.current = controller;
    const previousAddress = addressInput.current?.value ?? "";
    setLocating(true);
    setLocationMessage("");
    try {
      const area = await detectDeliveryArea(controller.signal);
      if (controller.signal.aborted || !addressInput.current) return;
      if (addressInput.current.value !== previousAddress) {
        setLocationMessage(
          `Your area: ${area}. Your typed address has been kept; add this area if needed.`,
        );
      } else {
        addressInput.current.value = previousAddress.trim()
          ? `${previousAddress.trim()}\n${area}`
          : area;
        addressInput.current.focus();
        setLocationMessage(
          "Area found. Please add your house / flat number and street, and check the postcode before sending.",
        );
      }
    } catch (error) {
      if (!controller.signal.aborted)
        setLocationMessage(
          error instanceof Error ? error.message : "Please enter your address manually.",
        );
    } finally {
      if (!controller.signal.aborted) setLocating(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      address: String(form.get("address") ?? ""),
      notes: String(form.get("notes") ?? ""),
      website: String(form.get("website") ?? ""),
      quantity,
    };
    const signature = JSON.stringify(values);
    if (request.current.signature !== signature)
      request.current = { signature, id: crypto.randomUUID() };
    const parsed = orderRequestSchema.safeParse({ ...values, requestId: request.current.id });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    setError("");
    locationRequest.current?.abort();
    setLocating(false);
    setPending(true);
    try {
      const response = await submitOrder({ data: parsed.data });
      if (response.ok) {
        setEmail(parsed.data.email);
        setResult(response);
      } else setError(response.message);
    } catch {
      setError("We couldn't send your request. Please check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  if (result)
    return (
      <div className="request-success" role="status">
        <span className="request-success-icon">
          <Check size={28} />
        </span>
        <h3>Your request is with us!</h3>
        <p>
          {result.confirmationSent
            ? `A confirmation email is on its way to ${email}.`
            : "Your request reached our team, but we couldn't send your email copy. Please keep your reference below."}
        </p>
        <p>We’ll contact you to confirm availability and delivery. No payment has been taken.</p>
        <div className="request-reference">{result.reference}</div>
      </div>
    );

  return (
    <form className="email-order-form" onSubmit={handleSubmit}>
      <fieldset disabled={pending}>
        <div className="order-packs" aria-label="Choose a bottle pack">
          {[1, 3, 6, 12].map((q) => (
            <button
              type="button"
              aria-pressed={quantity === q}
              className={quantity === q ? "chosen" : ""}
              onClick={() => setQuantity(q)}
              key={q}
            >
              {q} {q === 1 ? "bottle" : "bottles"}
            </button>
          ))}
        </div>
        <div className="order-counter">
          <span>Bottles · 250 ml each</span>
          <div>
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity === "" || quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, (q || 1) - 1))}
            >
              <Minus size={16} />
            </button>
            <input
              className="order-quantity"
              name="quantity"
              type="number"
              inputMode="numeric"
              aria-label="Number of bottles"
              min={1}
              max={MAX_BOTTLE_QUANTITY}
              step={1}
              required
              value={quantity}
              onChange={(event) =>
                setQuantity(
                  Number.isNaN(event.target.valueAsNumber) ? "" : event.target.valueAsNumber,
                )
              }
              onBlur={() => {
                if (quantity === "") setQuantity(1);
              }}
            />
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={quantity !== "" && quantity >= MAX_BOTTLE_QUANTITY}
              onClick={() => setQuantity((q) => Math.min(MAX_BOTTLE_QUANTITY, (q || 0) + 1))}
            >
              <Plus size={16} />
            </button>
          </div>
          <strong aria-live="polite">
            {quantity !== "" &&
            Number.isSafeInteger(quantity) &&
            quantity >= 1 &&
            quantity <= MAX_BOTTLE_QUANTITY
              ? `₹${quantity * 100}`
              : "—"}
          </strong>
        </div>
        <div className="request-fields">
          <label>
            Full name
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              placeholder="Your name"
            />
          </label>
          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@example.com"
            />
            <small>We’ll send your confirmation here.</small>
          </label>
          <label>
            Phone number
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              minLength={7}
              maxLength={25}
              placeholder="Your contact number"
            />
          </label>
          <div className="request-wide delivery-address">
            <div className="delivery-address-heading">
              <label htmlFor="delivery-address">Delivery address</label>
              <button
                type="button"
                className="use-location"
                onClick={useLocation}
                disabled={locating}
                aria-describedby="location-privacy"
              >
                {locating ? (
                  <LoaderCircle size={14} className="request-spinner" />
                ) : (
                  <LocateFixed size={14} />
                )}
                {locating ? "Finding your area…" : "Use my location"}
              </button>
            </div>
            <textarea
              ref={addressInput}
              id="delivery-address"
              name="address"
              rows={3}
              autoComplete="street-address"
              required
              minLength={10}
              maxLength={600}
              placeholder="House / street, city and postcode"
              aria-describedby="location-privacy location-status"
            />
            <small id="location-privacy" className="location-privacy">
              Optional: “Use my location” shares your current location with{" "}
              <a
                href="https://www.bigdatacloud.com/privacy-and-cookie-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                BigDataCloud
              </a>{" "}
              to find your area. Add your house and street details yourself.
            </small>
            <p id="location-status" className="location-status" role="status">
              {locationMessage}
            </p>
          </div>
          <label className="request-wide">
            Anything else? <span>(optional)</span>
            <textarea
              name="notes"
              rows={2}
              maxLength={1000}
              placeholder="Preferred delivery time, event details, or a question…"
            />
          </label>
        </div>
        <label className="request-trap" aria-hidden="true">
          Leave this blank
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <p className="request-consent">
          By sending, you agree that Random Sips may use these details to respond to your request
          and email you a confirmation. Availability and delivery charges will be confirmed by our
          team.
        </p>
        {error && (
          <p className="request-error" role="alert">
            {error}
          </p>
        )}
        <button className="sip-button request-submit" type="submit">
          {pending ? <LoaderCircle size={17} className="request-spinner" /> : <Mail size={17} />}
          {pending ? "Sending your request…" : "Send request"}
        </button>
        <p className="request-footnote">No payment now. Just a fresh start.</p>
      </fieldset>
    </form>
  );
}
