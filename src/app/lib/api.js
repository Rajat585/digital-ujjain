// Small fetch wrapper for talking to the Digital Ujjain backend.
// Set NEXT_PUBLIC_API_URL in .env.local when deploying (defaults to local dev backend).

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function apiPost(path, body) {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: data.error || "Something went wrong. Please try again." };
    }
    return { ok: true, data };
  } catch (err) {
    // Network error / backend not running — fail gracefully instead of crashing the UI
    return { ok: false, error: "Could not reach the server. Please check your connection." };
  }
}

export const api = {
  // Step 1 of a paid booking: ask the backend to create a Razorpay order.
  // Server computes the real price — the browser never gets to set the amount.
  createHotelOrder: (payload) => apiPost("/api/payments/hotel/create-order", payload),
  createSathiOrder: (payload) => apiPost("/api/payments/sathi/create-order", payload),

  // Step 2: after Razorpay Checkout succeeds, send the payment proof here.
  // The backend verifies the signature and only then creates the booking.
  bookHotel: (payload) => apiPost("/api/bookings/hotel", payload),
  bookSathi: (payload) => apiPost("/api/bookings/sathi", payload),

  // Tourist just flags the trip as done — does not move any money.
  markSathiComplete: (bookingId) => apiPost(`/api/bookings/sathi/${bookingId}/mark-complete`, {}),

  submitSathiApplication: (payload) => apiPost("/api/sathi-applications", payload),
  submitReport: (payload) => apiPost("/api/reports", payload),
  submitFeedback: (payload) => apiPost("/api/feedback", payload),
};

// Opens Razorpay Checkout and resolves with the payment result once the user
// completes (or cancels/fails) the payment. Wraps the callback-based widget
// API in a Promise so booking components can just `await` it.
export function openRazorpayCheckout({ orderId, amount, keyId, name, description, prefill }) {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.Razorpay) {
      resolve({ ok: false, error: "Payment widget failed to load. Please refresh and try again." });
      return;
    }
    const rzp = new window.Razorpay({
      key: keyId,
      amount: Math.round(amount * 100),
      currency: "INR",
      order_id: orderId,
      name: name || "Digital Ujjain — Simhastha 2028",
      description: description || "Booking payment",
      prefill: prefill || {},
      theme: { color: "#D4AF37" },
      handler: (response) => {
        resolve({
          ok: true,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      modal: {
        ondismiss: () => resolve({ ok: false, error: "Payment was cancelled." }),
      },
    });
    rzp.on("payment.failed", (resp) => {
      resolve({ ok: false, error: resp?.error?.description || "Payment failed. Please try again." });
    });
    rzp.open();
  });
}
