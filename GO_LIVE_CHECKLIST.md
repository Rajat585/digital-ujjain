# Razorpay Go-Live Checklist

**Do not start this until real hotel data is onboarded** (see the handoff
doc's "Aage Kya Karna Hai" step 3). Enabling real payments against demo/fake
hotel listings risks a fraud complaint and Razorpay account suspension.

Once real hotels are onboarded, the payment code itself needs **no changes**
— everything below is configuration only.

## 1. Razorpay account KYC
- Complete KYC in the Razorpay Dashboard (PAN, bank account, business proof).
- Wait for account activation (Razorpay reviews this — can take a few days).

## 2. Get live keys
- Razorpay Dashboard → Settings → API Keys → generate **Live** keys.
- They'll start with `rzp_live_...` (test ones start with `rzp_test_...`).

## 3. Set up the webhook (do this *before* switching keys)
- Razorpay Dashboard → Settings → Webhooks → Add New Webhook.
- URL: `https://digital-ujjain-backend.onrender.com/api/webhooks/razorpay`
- Active events: check **order.paid**.
- Save, then copy the **webhook secret** it generates.
- You can and should set this up in test mode first and confirm it fires
  (make a test booking, check Render logs for
  "✅ Webhook reconciled..." — it'll only log that line if the browser's own
  request is delayed enough for the webhook to win the race, which is fine,
  it means the safety net works either way).

## 4. Update environment variables
On **both** Render (backend) and — only for `NEXT_PUBLIC_API_URL` if it
changes — Vercel (frontend), update:

| Variable | Render (backend) |
|---|---|
| `RAZORPAY_KEY_ID` | `rzp_live_...` |
| `RAZORPAY_KEY_SECRET` | live secret from dashboard |
| `RAZORPAY_WEBHOOK_SECRET` | secret from step 3 |

Do the same in your local `backend/.env` if you also test from your laptop
against live keys (careful — this means real money on your own laptop too).

## 5. Confirm the mode switch
- Restart the Render service (env var changes need a redeploy/restart).
- Check Render logs for the startup line — it should now say:
  `🔴 RAZORPAY IS IN LIVE MODE — real money will be charged.`
  If it still says 🟡 TEST mode, the env vars didn't take — don't proceed.

## 6. Do one real, small test transaction
- Book the cheapest room yourself with a real card/UPI, real small amount.
- Confirm: booking appears in `/admin`, money actually settles to your
  Razorpay account, and (if you deliberately close the tab right after
  paying, before the confirmation page) the webhook still creates the
  booking within a minute or two.

## 7. Tell your team
- Let your collaborator know live mode is on — from this point, every
  booking through the site is real money.

## Ongoing: reviewing anomalies
Occasionally check for signature-mismatch attempts (usually harmless —
people closing the payment popup at odd times — but worth a glance):

```
curl https://digital-ujjain-backend.onrender.com/api/admin/payment-anomalies -H "x-admin-key: YOUR_ADMIN_KEY"
```
