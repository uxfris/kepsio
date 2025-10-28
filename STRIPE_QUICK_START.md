# Stripe Integration - Quick Start Checklist

## 🚀 5-Minute Setup Guide

Follow these steps to get Stripe payments working:

---

## ✅ Step 1: Stripe Dashboard Setup (5 minutes)

### 1.1 Create Products

Go to: https://dashboard.stripe.com/test/products

**Create "Pro Plan":**

- Click "+ Add product"
- Name: `Pro Plan`
- Add Monthly Price: `$19.00 USD` → **Copy Price ID**
- Add Annual Price: `$15.83 USD` → **Copy Price ID**

**Create "Enterprise Plan":**

- Click "+ Add product"
- Name: `Enterprise Plan`
- Add Monthly Price: `$100.00 USD` → **Copy Price ID**

### 1.2 Get API Keys

Go to: https://dashboard.stripe.com/test/apikeys

- **Copy Publishable Key** (starts with `pk_test_`)
- **Copy Secret Key** (starts with `sk_test_`)

---

## ✅ Step 2: Environment Variables (2 minutes)

Create/update `.env.local` in your project root:

```bash
# Paste your Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_paste_here"
STRIPE_SECRET_KEY="sk_test_paste_here"

# Paste your Price IDs
STRIPE_PRICE_PRO_MONTHLY="price_paste_here"
STRIPE_PRICE_PRO_ANNUAL="price_paste_here"
STRIPE_PRICE_ENTERPRISE_MONTHLY="price_paste_here"

# Set your app URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Webhook secret (get from Step 3)
STRIPE_WEBHOOK_SECRET="whsec_paste_here"
```

---

## ✅ Step 3: Webhook Setup (3 minutes)

### Option A: Local Development (Recommended)

**Install Stripe CLI:**

```bash
brew install stripe/stripe-cli/stripe
```

**Login:**

```bash
stripe login
```

**Start webhook forwarding:**

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Copy the webhook secret** from the output → Add to `.env.local`

### Option B: Production

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "+ Add endpoint"
3. URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `customer.subscription.*`, `invoice.*`
5. Copy signing secret → Add to production env

---

## ✅ Step 4: Start Testing (1 minute)

**Terminal 1 - Start your app:**

```bash
npm run dev
```

**Terminal 2 - Start webhook forwarding:**

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## ✅ Step 5: Test Purchase (2 minutes)

1. **Open:** http://localhost:3000/upgrade
2. **Click:** "Upgrade to Pro"
3. **Enter test card:**
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/34`
   - CVC: `123`
   - ZIP: `12345`
4. **Click:** "Subscribe"
5. **Verify:**
   - ✅ Redirected to success page
   - ✅ Webhook events in Terminal 2
   - ✅ Check database: subscription = "pro"

---

## 🎯 Quick Test Commands

### Check subscription in database:

```sql
SELECT
  email, plan, status, "stripeCustomerId"
FROM users u
JOIN subscriptions s ON u.id = s."userId"
WHERE u.email = 'your-email@example.com';
```

### Trigger webhook events manually:

```bash
stripe trigger payment_intent.succeeded
stripe trigger customer.subscription.created
```

---

## 🔍 Troubleshooting

### ❌ "Missing Stripe Price ID" error

→ Check Price IDs in `.env.local` are correct

### ❌ Checkout button does nothing

→ Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
→ Check browser console for errors

### ❌ Webhook signature verification failed

→ Ensure `STRIPE_WEBHOOK_SECRET` matches Stripe CLI output
→ Restart both terminals after updating `.env.local`

### ❌ Database not updating

→ Check Terminal 2 for webhook delivery
→ Verify webhook endpoint logs
→ Check userId is in session metadata

---

## 📋 Production Checklist

Before going live:

- [ ] Create products in **live mode**
- [ ] Get **live** API keys (pk*live*, sk*live*)
- [ ] Update all Price IDs to **live** prices
- [ ] Configure **live** webhook endpoint
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Test checkout with real card
- [ ] Verify webhooks delivered
- [ ] Test customer portal
- [ ] Monitor first few transactions

---

## 🎉 You're Done!

Your Stripe integration is ready. Users can now:

✅ Upgrade to Pro/Enterprise plans  
✅ Manage subscriptions via Customer Portal  
✅ See real-time subscription status  
✅ Automatic billing and renewals

---

## 📚 Need More Help?

- **Full Guide:** See `STRIPE_INTEGRATION_GUIDE.md`
- **Implementation Details:** See `STRIPE_IMPLEMENTATION_SUMMARY.md`
- **Stripe Docs:** https://stripe.com/docs
- **Test Cards:** https://stripe.com/docs/testing

---

**Last Updated:** October 28, 2025
