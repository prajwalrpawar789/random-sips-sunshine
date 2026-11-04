import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OrderRequestForm } from "@/components/landing/OrderRequestForm";
import { detectDeliveryArea } from "@/lib/delivery-location";

vi.mock("@/lib/submit-order", () => ({ submitOrder: vi.fn() }));
vi.mock("@/lib/delivery-location", () => ({ detectDeliveryArea: vi.fn() }));
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Delivery address lookup in the request form", () => {
  it("does not request a location until clicked and fills an editable address", async () => {
    vi.mocked(detectDeliveryArea).mockResolvedValue("Pune, Maharashtra, 411001, India");
    render(<OrderRequestForm />);
    expect(detectDeliveryArea).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Use my location" }));
    await waitFor(() =>
      expect(screen.getByLabelText("Delivery address")).toHaveValue(
        "Pune, Maharashtra, 411001, India",
      ),
    );
    fireEvent.change(screen.getByLabelText("Delivery address"), {
      target: { value: "Flat 7, Test Street, Pune 411001" },
    });
    expect(screen.getByLabelText("Delivery address")).toHaveValue(
      "Flat 7, Test Street, Pune 411001",
    );
  });

  it("preserves an address typed while location is being fetched", async () => {
    let finish!: (area: string) => void;
    vi.mocked(detectDeliveryArea).mockReturnValue(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    render(<OrderRequestForm />);
    fireEvent.click(screen.getByRole("button", { name: "Use my location" }));
    fireEvent.change(screen.getByLabelText("Delivery address"), {
      target: { value: "My manually entered delivery address" },
    });
    await act(async () => finish("Test area, Test city"));
    expect(screen.getByLabelText("Delivery address")).toHaveValue(
      "My manually entered delivery address",
    );
    expect(screen.getByRole("status")).toHaveTextContent("Your typed address has been kept");
  });

  it("allows manual entry when the location service fails", async () => {
    vi.mocked(detectDeliveryArea).mockRejectedValue(
      new Error("Location access was declined. You can enter your address manually."),
    );
    render(<OrderRequestForm />);
    fireEvent.click(screen.getByRole("button", { name: "Use my location" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("declined"));
    expect(screen.getByLabelText("Delivery address")).toBeEnabled();
    expect(screen.getByRole("button", { name: "Send request" })).toBeEnabled();
  });
});
