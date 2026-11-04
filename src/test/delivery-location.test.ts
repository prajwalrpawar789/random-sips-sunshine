import { afterEach, describe, expect, it, vi } from "vitest";
import { detectDeliveryArea, formatDeliveryArea } from "@/lib/delivery-location";

afterEach(() => vi.unstubAllGlobals());

function browserLocation(getCurrentPosition: (...args: any[]) => void) {
  vi.stubGlobal("isSecureContext", true);
  vi.stubGlobal("navigator", { geolocation: { getCurrentPosition } });
}

describe("Optional delivery location", () => {
  it("formats locality data without repeated city names", () => {
    expect(
      formatDeliveryArea({
        locality: "Pune",
        city: "pune",
        principalSubdivision: "Maharashtra",
        postcode: "411001",
        countryName: "India",
      }),
    ).toBe("pune, Maharashtra, 411001, India");
  });

  it("uses fresh device coordinates and sends no contact information", async () => {
    browserLocation(vi.fn((success) => success({ coords: { latitude: 0, longitude: 0 } })));
    const fetchMock = vi
      .fn()
      .mockResolvedValue({
        ok: true,
        json: async () => ({
          lookupSource: "reverseGeocoding",
          locality: "Test area",
          city: "Test city",
          countryName: "Example",
        }),
      });
    vi.stubGlobal("fetch", fetchMock);
    expect(await detectDeliveryArea(new AbortController().signal)).toBe(
      "Test area, Test city, Example",
    );
    const url = fetchMock.mock.calls[0]?.[0] as URL;
    expect(url.origin).toBe("https://api.bigdatacloud.net");
    expect([...url.searchParams.keys()]).toEqual(["latitude", "longitude", "localityLanguage"]);
    expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({
      credentials: "omit",
      referrerPolicy: "no-referrer",
      cache: "no-store",
    });
  });

  it("does not call the provider when permission is declined", async () => {
    browserLocation(vi.fn((_success, error) => error({ code: 1 })));
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await expect(detectDeliveryArea(new AbortController().signal)).rejects.toThrow("declined");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not look up a location after the request was canceled", async () => {
    browserLocation(vi.fn((success) => success({ coords: { latitude: 0, longitude: 0 } })));
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const controller = new AbortController();
    controller.abort();
    await expect(detectDeliveryArea(controller.signal)).rejects.toThrow();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("keeps manual entry available on provider errors and IP-only results", async () => {
    browserLocation(vi.fn((success) => success({ coords: { latitude: 0, longitude: 0 } })));
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ lookupSource: "ipGeolocation", city: "Wrong city" }),
      });
    vi.stubGlobal("fetch", fetchMock);
    await expect(detectDeliveryArea(new AbortController().signal)).rejects.toThrow("manually");
    await expect(detectDeliveryArea(new AbortController().signal)).rejects.toThrow("manually");
  });
});
