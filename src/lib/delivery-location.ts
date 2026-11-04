type Locality = {
  locality?: string;
  city?: string;
  principalSubdivision?: string;
  postcode?: string;
  countryName?: string;
  lookupSource?: string;
};

export function formatDeliveryArea(result: Locality): string {
  const parts = [
    result.locality,
    result.city,
    result.principalSubdivision,
    result.postcode,
    result.countryName,
  ]
    .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
    .map((part) => part.trim());
  return [...new Map(parts.map((part) => [part.toLowerCase(), part])).values()].join(", ");
}

// Client-only: this free endpoint must be called directly from the user's device
// with fresh, permission-granted coordinates. Never call it from the server.
export async function detectDeliveryArea(signal: AbortSignal): Promise<string> {
  if (!window.isSecureContext || !navigator.geolocation)
    throw new Error("Location isn't available here. Please enter your address manually.");
  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 12_000,
      maximumAge: 0,
    });
  }).catch((error: GeolocationPositionError) => {
    if (error.code === 1)
      throw new Error("Location access was declined. You can enter your address manually.");
    if (error.code === 3)
      throw new Error("Location took too long. Please try again or enter your address manually.");
    throw new Error("We couldn't find your location. Please enter your address manually.");
  });
  signal.throwIfAborted();
  const url = new URL("https://api.bigdatacloud.net/data/reverse-geocode-client");
  url.search = new URLSearchParams({
    latitude: String(position.coords.latitude),
    longitude: String(position.coords.longitude),
    localityLanguage: "en",
  }).toString();
  try {
    const response = await fetch(url, {
      signal: AbortSignal.any([signal, AbortSignal.timeout(10_000)]),
      credentials: "omit",
      referrerPolicy: "no-referrer",
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Lookup failed");
    const data = (await response.json()) as Locality;
    // An approximate IP fallback must not be presented as the customer's GPS location.
    if (data.lookupSource !== "reverseGeocoding") throw new Error("GPS locality unavailable");
    const area = formatDeliveryArea(data);
    if (!area) throw new Error("No locality found");
    return area;
  } catch {
    if (signal.aborted) throw signal.reason;
    throw new Error("We couldn't look up your area. Please enter your address manually.");
  }
}
