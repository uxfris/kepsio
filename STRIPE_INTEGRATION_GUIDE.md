# Stripe Payment Integration - Complete Setup Guide

## 🎯 Overview

This guide walks you through setting up Stripe payments for your Kepsio subscription system. The integration supports:

- ✅ Stripe Checkout for seamless payment collection
- ✅ Webhook handling for automatic subscription updates
- ✅ Customer Portal for subscription management
- ✅ Multiple billing cycles (Monthly/Annual)
- ✅ Pro and Enterprise plans

---

## 📋 Prerequisites

1. **Stripe Account** - Sign up at https://stripe.com
2. **Environment Variables** - Access to `.env.local` file
3. **Database Access** - Supabase/PostgreSQL credentials
4. **Domain/URL** - For webhook configuration

---

## 🚀 Step-by-Step Setup

### Step 1: Create Products in Stripe Dashboard

1. **Navigate to Stripe Dashboard** → Products
2. **Create Pro Plan Product:**
   - Name: `Pro Plan`
   - Description: `Unlimited caption generation with advanced features`
3. **Add Monthly Price:**
   - Price: `$19.00 USD`
   - Billing: `Recurring - Monthly`
   - Copy the **Price ID** (starts with `price_`)
4. **Add Annual Price:**

   - Price: `$15.83 USD` (or `$190/year`)
   - Billing: `Recurring - Yearly`
   - Copy the **Price ID**

5. **Create Enterprise Plan Product:**
   - Name: `Enterprise Plan`
   - Description: `For teams and brands at scale`
6. **Add Monthly Price:**
   - Price: `$100.00 USD`
   - Billing: `Recurring - Monthly`
   - Copy the **Price ID**

> **Important:** Save all Price IDs - you'll need them for environment variables!

---

### Step 2: Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Stripe API Keys (from Dashboard → Developers → API Keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxx"
STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxx"

# Stripe Price IDs (from Step 1)
STRIPE_PRICE_PRO_MONTHLY="price_xxxxxxxxxxxxx"
STRIPE_PRICE_PRO_ANNUAL="price_xxxxxxxxxxxxx"
STRIPE_PRICE_ENTERPRISE_MONTHLY="price_xxxxxxxxxxxxx"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # Change to production URL when deploying

# Webhook Secret (we'll get this in Step 3)
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
```

---

### Step 3: Set Up Webhooks

#### For Local Development:

1. **Install Stripe CLI:**

   ```bash
   brew install stripe/stripe-cli/stripe
   # or on other platforms: https://stripe.com/docs/stripe-cli
   ```

2. **Login to Stripe:**

   ```bash
   stripe login
   ```

3. **Forward Webhooks to Local Server:**

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copy the Webhook Secret** from the output (starts with `whsec_`)
   - Add it to `.env.local` as `STRIPE_WEBHOOK_SECRET`

#### For Production:

1. **Navigate to Stripe Dashboard** → Developers → Webhooks
2. **Click "Add Endpoint"**
3. **Set Endpoint URL:** `https://yourdomain.com/api/webhooks/stripe`
4. **Select Events to Listen For:**

   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

5. **Copy the Signing Secret** and add to production env as `STRIPE_WEBHOOK_SECRET`

---

### Step 4: Test the Integration

#### 4.1 Start Development Server

```bash
npm run dev
```

#### 4.2 Start Stripe Webhook Forwarding (in a separate terminal)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

#### 4.3 Test Checkout Flow

1. **Navigate to** http://localhost:3000/upgrade
2. **Select billing cycle** (Monthly/Annual)
3. **Click "Upgrade to Pro"**
4. **Use Stripe Test Card:**

   - Card Number: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any valid ZIP

5. **Complete Payment**
6. **Verify:**
   - Redirected to `/success` page
   - Webhook events appear in Stripe CLI
   - Database subscription updated to `pro`
   - Usage limit changed to unlimited

#### 4.4 Test Customer Portal

1. **After upgrading, navigate to** http://localhost:3000/settings/billing
2. **Click "Manage Subscription"**
3. **Verify you can:**
   - View subscription details
   - Update payment method
   - View invoices
   - Cancel subscription

---

## 🔍 Testing Scenarios

### Test Card Numbers

| Scenario           | Card Number           | Expected Result          |
| ------------------ | --------------------- | ------------------------ |
| Success            | `4242 4242 4242 4242` | Payment succeeds         |
| Decline            | `4000 0000 0000 9995` | Card declined            |
| Requires Auth      | `4000 0025 0000 3155` | 3D Secure authentication |
| Insufficient Funds | `4000 0000 0000 9995` | Insufficient funds error |

### Webhook Testing

Use Stripe CLI to trigger events manually:

```bash
# Test successful payment
stripe trigger payment_intent.succeeded

# Test subscription creation
stripe trigger customer.subscription.created

# Test failed payment
stripe trigger invoice.payment_failed
```

---

## 📊 Database Verification

### Check Subscription Status

```sql
SELECT
  u.email,
  s.plan,
  s.status,
  s."stripeCustomerId",
  s."stripeSubscriptionId",
  s."currentPeriodEnd"
FROM users u
JOIN subscriptions s ON u.id = s."userId"
WHERE u.email = 'your-email@example.com';
```

### Verify Webhook Processing

After a successful checkout, verify:

```sql
-- Should show updated subscription
SELECT * FROM subscriptions
WHERE plan = 'pro'
AND status = 'active'
ORDER BY "updatedAt" DESC LIMIT 1;
```

---

## 🛠️ Troubleshooting

### Issue: Webhook signature verification failed

**Solution:**

- Ensure `STRIPE_WEBHOOK_SECRET` matches the one from Stripe CLI or Dashboard
- Verify webhook endpoint is receiving raw body (not parsed JSON)
- Check that the secret starts with `whsec_`

### Issue: Checkout URL not generated

**Solution:**

- Verify all Price IDs are correct in environment variables
- Check Stripe API keys are for the correct mode (test vs live)
- Ensure `NEXT_PUBLIC_APP_URL` is set correctly

### Issue: Database not updating after payment

**Solution:**

- Check Stripe CLI for webhook delivery status
- Verify webhook endpoint logs in terminal
- Ensure database connection is working
- Check that `userId` metadata is included in checkout session

### Issue: Customer Portal not opening

**Solution:**

- Verify user has `stripeCustomerId` in database
- Check that subscription status is `active`
- Ensure Stripe Customer Portal is enabled in Stripe Dashboard

---

## 🔐 Security Best Practices

1. **Environment Variables:**

   - Never commit `.env.local` to git
   - Use different API keys for development and production
   - Rotate secrets regularly

2. **Webhook Verification:**

   - Always verify webhook signatures
   - Use raw body for signature verification
   - Log suspicious webhook attempts

3. **Customer Data:**

   - Store only necessary Stripe IDs
   - Don't store card details (Stripe handles this)
   - Implement proper access controls

4. **Error Handling:**
   - Never expose Stripe errors to end users
   - Log errors securely
   - Implement retry logic for transient failures

---

## 📱 Production Deployment Checklist

- [ ] Switch to Stripe live API keys
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Configure production webhook endpoint in Stripe Dashboard
- [ ] Update webhook secret to production value
- [ ] Test checkout flow on production
- [ ] Test webhook delivery on production
- [ ] Verify customer portal works
- [ ] Monitor webhook delivery in Stripe Dashboard
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure email notifications for failed payments

---

## 🔗 API Endpoints Reference

### POST `/api/billing/create-checkout`

Creates a Stripe Checkout session.

**Request Body:**

```json
{
  "planId": "pro",
  "billingCycle": "annual"
}
```

**Response:**

```json
{
  "url": "https://checkout.stripe.com/...",
  "sessionId": "cs_test_..."
}
```

### POST `/api/billing/portal`

Creates a Customer Portal session.

**Response:**

```json
{
  "url": "https://billing.stripe.com/..."
}
```

### POST `/api/webhooks/stripe`

Handles Stripe webhook events.

**Headers:**

- `stripe-signature`: Webhook signature for verification

**Events Handled:**

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

---

## 📚 Additional Resources

- **Stripe Documentation:** https://stripe.com/docs
- **Stripe CLI:** https://stripe.com/docs/stripe-cli
- **Webhook Events:** https://stripe.com/docs/api/events
- **Test Cards:** https://stripe.com/docs/testing
- **Customer Portal:** https://stripe.com/docs/billing/subscriptions/integrating-customer-portal

---

## 💡 Features Implemented

✅ **Checkout Flow**

- Monthly and annual billing
- Metadata tracking (userId, planId)
- Automatic customer creation
- Promo code support

✅ **Webhook Processing**

- Subscription creation
- Status updates
- Payment success/failure handling
- Automatic downgrade on cancellation

✅ **Customer Portal**

- View subscription details
- Update payment methods
- View invoices
- Cancel subscriptions

✅ **Frontend Integration**

- Dynamic pricing display
- Current plan indicator
- Loading states
- Error handling
- Success confirmation page

✅ **Database Sync**

- Automatic subscription updates
- Usage tracking integration
- Customer ID storage
- Period tracking

---

## 🎉 Next Steps

1. **Test thoroughly** in development mode
2. **Monitor webhook delivery** for a few days
3. **Set up email notifications** for subscription events
4. **Implement invoice receipts** (optional)
5. **Add analytics tracking** for conversion rates
6. **Consider implementing:**
   - Trial periods
   - Coupon codes
   - Team subscriptions
   - Usage-based billing

---

## 📞 Support

If you encounter issues:

1. Check this guide first
2. Review Stripe Dashboard logs
3. Check application logs
4. Test with Stripe CLI
5. Contact Stripe support for payment-specific issues

---

**Implementation Date:** October 28, 2025  
**Status:** ✅ Complete and Ready for Testing
