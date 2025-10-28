# Subscription System Implementation

## Overview

A minimal subscription system has been implemented to track usage limits for caption generation. Users start with a free plan by default.

## What Was Implemented

### 1. Database Setup

- Existing `subscriptions` table is now utilized
- Existing `captions` table tracks generation history
- Users automatically get a free subscription on signup

### 2. API Endpoints

#### `GET /api/user/subscription`

Fetches the user's current subscription details:

- Plan type (free, pro, enterprise)
- Status (active, canceled, past_due)
- Current period end date
- Creates a free subscription if none exists

#### `GET /api/user/usage`

Fetches the user's usage statistics:

- Captions used in current period
- Caption limit based on plan
- Reset date (period end date)

### 3. Usage Limits Enforcement

**In `/api/captions/generate`:**

- Checks subscription plan before generating
- Calculates current usage against limit
- Returns 429 error with usage details if limit exceeded
- Unlimited plans (pro/enterprise with -1 limit) skip the check

### 4. Frontend Integration

**In `/app/(dashboard)/generate/page.tsx`:**

- Fetches subscription and usage data via hooks
- Displays real-time usage counter (e.g., "7/10 free captions left")
- Shows paywall modal when limit is reached
- Refetches usage after each generation
- Handles usage limit errors from API

**In `hooks/useCaptionGeneration.ts`:**

- Properly handles and throws usage limit errors
- Includes error details for UI display

### 5. User Signup Flow

**In `/app/auth/callback/route.ts`:**

- New users automatically get a free subscription
- 30-day period from signup
- Status set to "active"

## Plan Configuration

**Defined in `/config/plans.ts`:**

### Free Plan

- 10 captions per month
- 5 variations per generation
- 1 voice profile
- All platform presets

### Pro Plan

- Unlimited captions (captionsPerMonth: -1)
- 10 variations per generation
- 5 voice profiles
- Advanced features

### Enterprise Plan

- Unlimited everything (all limits set to -1)

## Usage Tracking Logic

1. When checking limits, calculate period start: `currentPeriodEnd - 30 days`
2. Count captions created within this period
3. Compare against plan limit
4. Block generation if at or above limit
5. Each caption generation creates entries in the `captions` table
6. Since 5 captions are generated per request, this counts as 5 toward the limit

## Testing the System

### For Existing User

- Existing user has been given a free subscription
- Current usage: 0/10 captions
- Period ends: 2025-11-27

### To Test Limits

1. Generate captions (uses 5 toward limit)
2. Counter updates automatically
3. At 10 captions, paywall shows
4. API blocks further generation

### To Upgrade (Future Implementation)

- Paywall modal is already in place
- Update subscription plan in database
- New limits apply immediately

## Database Queries

### Check a User's Subscription

```sql
SELECT * FROM subscriptions WHERE "userId" = 'user-id';
```

### Check Usage in Current Period

```sql
SELECT COUNT(*) FROM captions
WHERE "userId" = 'user-id'
AND "createdAt" >= (NOW() - INTERVAL '30 days');
```

### Manually Update Subscription Plan

```sql
UPDATE subscriptions
SET plan = 'pro',
    "currentPeriodEnd" = NOW() + INTERVAL '30 days',
    "updatedAt" = NOW()
WHERE "userId" = 'user-id';
```

## Future Enhancements

1. **Stripe Integration**: Connect to billing/webhooks for paid plans
2. **Period Reset**: Automatic reset logic (currently just extends 30 days from currentPeriodEnd)
3. **Usage Analytics**: Track generation patterns
4. **Soft Limits**: Warning at 80% usage
5. **Team Seats**: Multi-user subscriptions for enterprise
6. **API Rate Limiting**: Additional protection layer

## Security Note

The subscription system includes a security advisory:

- **Warning**: Leaked password protection is disabled
- **Recommendation**: Enable password strength checks via HaveIBeenPwned
- **Link**: https://supabase.com/docs/guides/auth/password-security

This is a general Auth setting, not specific to the subscription implementation.
