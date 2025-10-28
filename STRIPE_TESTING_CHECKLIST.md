# Stripe Testing Checklist

## ⚠️ IMPORTANT: Always Run BOTH Terminals!

### Terminal 1: Start Your App

```bash
npm run dev
```

### Terminal 2: Start Webhook Forwarding

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## ✅ Pre-Test Checklist

- [ ] Terminal 1 running (`npm run dev`)
- [ ] Terminal 2 running (`stripe listen`)
- [ ] See "Ready! Your webhook signing secret..." in Terminal 2
- [ ] Environment variables set in `.env.local`
- [ ] Stripe Price IDs configured

---

## 🧪 Test Flow

1. **Visit** http://localhost:3000/upgrade
2. **Click** "Upgrade to Pro"
3. **Enter test card:** `4242 4242 4242 4242`
4. **Complete checkout**
5. **Watch Terminal 2** for webhook events:
   ```
   --> checkout.session.completed [evt_xxx]
   <-- [200] POST http://localhost:3000/api/webhooks/stripe
   ```
6. **Verify** subscription updated in database
7. **Check** frontend shows "Pro" plan

---

## 🔍 Verify Webhook Processing

### Check Terminal 2 Output

✅ **Good** - Webhook processed:

```
2025-10-28 08:41:20  --> checkout.session.completed [evt_xxx]
2025-10-28 08:41:21  <-- [200] POST http://localhost:3000/api/webhooks/stripe
```

❌ **Bad** - Webhook failed:

```
2025-10-28 08:41:20  --> checkout.session.completed [evt_xxx]
2025-10-28 08:41:21  <-- [400] POST http://localhost:3000/api/webhooks/stripe
```

### Check Database

```sql
SELECT plan, status, "stripeSubscriptionId", "updatedAt"
FROM subscriptions
WHERE "userId" = '66576fe7-966b-493d-b644-f9008822a821';
```

Should show:

- ✅ `plan`: "pro"
- ✅ `status`: "active"
- ✅ `stripeSubscriptionId`: "sub_xxx..." (not NULL)

---

## 🚨 Common Issues

### Issue: No webhook events in Terminal 2

**Cause:** Terminal 2 not running

**Fix:** Start `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

---

### Issue: Webhook signature verification failed

**Cause:** Wrong `STRIPE_WEBHOOK_SECRET` in `.env.local`

**Fix:**

1. Copy secret from Terminal 2 output (starts with `whsec_`)
2. Update `STRIPE_WEBHOOK_SECRET` in `.env.local`
3. Restart `npm run dev`

---

### Issue: [400] or [500] response in Terminal 2

**Cause:** Error in webhook handler

**Fix:**

1. Check Terminal 1 (app logs) for errors
2. Verify database connection
3. Check Prisma client is working

---

## 🔄 Reset Subscription for Testing

### Reset to Free Plan

```sql
UPDATE subscriptions
SET
  plan = 'free',
  "stripeSubscriptionId" = NULL,
  "currentPeriodEnd" = NOW() + INTERVAL '30 days'
WHERE "userId" = '66576fe7-966b-493d-b644-f9008822a821';
```

### Manually Set to Pro (if webhook fails)

```sql
UPDATE subscriptions
SET
  plan = 'pro',
  status = 'active',
  "currentPeriodEnd" = NOW() + INTERVAL '30 days'
WHERE "userId" = '66576fe7-966b-493d-b644-f9008822a821';
```

---

## 📊 Webhook Events to Watch For

| Event                           | What It Does                   |
| ------------------------------- | ------------------------------ |
| `checkout.session.completed`    | Creates/upgrades subscription  |
| `customer.subscription.created` | Confirms subscription creation |
| `customer.subscription.updated` | Updates subscription status    |
| `invoice.payment_succeeded`     | Confirms payment received      |

---

## 🎯 Success Criteria

- ✅ Terminal 2 shows `[200]` responses
- ✅ Database `plan` changed to "pro"
- ✅ `stripeSubscriptionId` is not NULL
- ✅ Frontend shows "Pro" in settings
- ✅ Usage counter shows "∞"
- ✅ Can access Customer Portal from settings

---

**Remember:** Always keep Terminal 2 running during tests! 🚀

