# Stripe Webhook Fix - Subscription Update Issue

## Problem

After completing a Stripe checkout, the subscription data was not being updated in the database. The webhook was returning 500 errors for:

- `customer.subscription.created`
- `checkout.session.completed`

## Root Cause

The error was: `Invalid Date` being created because `stripeSubscription.current_period_end` was `undefined`.

```
currentPeriodEnd: new Date("Invalid Date")
Invalid current_period_end timestamp: undefined
```

**The Real Issue:** In Stripe's newer API versions (2025-09-30.clover), the `current_period_end` field is NOT at the subscription object's top level. Instead, it's nested inside the subscription items:

```json
{
  "items": {
    "data": [
      {
        "id": "si_TJmROYUZKpvJqL",
        "current_period_end": 1764320867,
        "current_period_start": 1761642467,
        ...
      }
    ]
  }
}
```

## Changes Made

### 1. Database Migration

Applied migration to make `userId` unique in subscriptions table:

```sql
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_key" UNIQUE ("userId");
```

### 2. Enhanced Error Handling

- Wrapped event handlers in try-catch blocks
- Added specific error logging for each webhook event
- Return 500 status on handler failures so Stripe retries

### 3. Fixed Subscription Period End Access

Changed how we access `current_period_end` to support newer Stripe API versions:

```typescript
// Get current_period_end from subscription items
// In newer Stripe API versions, this is nested in items.data[0]
const subscriptionData = stripeSubscription as any;
const periodEndTimestamp =
  subscriptionData.current_period_end ||
  subscriptionData.items?.data?.[0]?.current_period_end;
```

This tries the old location first (for backwards compatibility), then falls back to the new nested location.

### 4. Added Timestamp Validation

For all date conversions from Stripe timestamps:

```typescript
// Validate it's a number
if (!periodEndTimestamp || typeof periodEndTimestamp !== "number") {
  throw new Error(
    `Invalid current_period_end timestamp: ${periodEndTimestamp}`
  );
}

// Create Date and validate it's valid
const currentPeriodEnd = new Date(periodEndTimestamp * 1000);
if (isNaN(currentPeriodEnd.getTime())) {
  throw new Error(`Invalid date from timestamp: ${periodEndTimestamp}`);
}
```

### 5. Fixed TypeScript Issues

- Used `as any` type assertions for Stripe properties
- Replaced `upsert` with `findFirst` + `update`/`create` pattern due to Prisma client issues

### 6. Comprehensive Logging

Added detailed logging throughout webhook handlers:

- `[handleCheckoutCompleted]` - Session processing
- `[handleSubscriptionUpdate]` - Subscription updates
- `[updateSubscriptionInDb]` - Database operations
- `[updateSubscriptionStatus]` - Status changes

## Testing

To test the fix:

1. Start dev server: `npm run dev`
2. Start Stripe webhook listener: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. Complete a test purchase
4. Check dev server logs for detailed output
5. Verify subscription is updated in database

## Expected Behavior

After a successful purchase:

1. Webhook receives `checkout.session.completed` event
2. Retrieves full subscription details from Stripe
3. Extracts `current_period_end` from `items.data[0]`
4. Validates timestamp and converts to Date
5. Updates/creates subscription record in database
6. Returns 200 status to Stripe
7. User's dashboard reflects new subscription immediately

## Stripe API Version Note

This fix handles both old and new Stripe API versions by checking for `current_period_end` in multiple locations. If you're using Stripe API version 2025-09-30.clover or newer, the field will be in `subscription.items.data[0].current_period_end`.
