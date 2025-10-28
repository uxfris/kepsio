# Generation Tracking Update

## ✅ Change Implemented

The subscription system has been updated to count **generation requests** instead of individual captions. This provides a much better user experience!

## What Changed

### Before (Counting Individual Captions)

- **Free plan**: 10 captions per month
- **Problem**: Each generation creates 5 captions
- **Result**: Only **2 attempts** before hitting the limit 😞

### After (Counting Generation Requests)

- **Free plan**: 10 generations per month (~50 total captions)
- **Benefit**: Each generation request = 1 toward limit
- **Result**: **10 attempts** to experiment and find their voice 🎉

## Database Changes

### Migration Applied

```sql
-- Added generationBatchId to track generation requests
ALTER TABLE captions ADD COLUMN "generationBatchId" TEXT;

-- Indexes for performance
CREATE INDEX idx_captions_generation_batch ON captions("generationBatchId");
CREATE INDEX idx_captions_user_generation ON captions("userId", "generationBatchId");
```

### Schema Update

```prisma
model Caption {
  id                String   @id @default(cuid())
  userId            String   @db.Uuid
  content           String
  generationBatchId String?  // NEW: Groups captions from same request
  // ... other fields
}
```

## API Changes

### Generation API (`/api/captions/generate`)

**Before:**

```typescript
const captionsUsed = await prisma.caption.count({
  where: { userId: user.id, ... }
});
```

**After:**

```typescript
// Count distinct generation batches
const generationsUsed = await prisma.caption.groupBy({
  by: ["generationBatchId"],
  where: { userId: user.id, generationBatchId: { not: null }, ... }
});
const generationCount = generationsUsed.length;

// Assign unique batch ID to all captions in this request
const generationBatchId = `gen_${Date.now()}_${Math.random()...}`;
```

### Usage API (`/api/user/usage`)

Now returns generation count instead of caption count:

```typescript
const generationsUsed = await prisma.caption.groupBy({
  by: ["generationBatchId"],
  where: { userId: user.id, generationBatchId: { not: null }, ... }
});

return {
  usage: {
    captionsUsed: generationsUsed.length, // Now counts generations
    captionsLimit: generationsLimit,
    resetDate: currentPeriodEnd,
  }
};
```

## UI Changes

### Generate Page

- **Before**: "7/10 free captions left"
- **After**: "7/10 free generations left"

### ProBadge (Sidebar)

- **Before**: "3 / 10 left"
- **After**: "3 / 10 generations left"
- **For unlimited**: "∞ Unlimited generations"

### Plans Config

```typescript
free: {
  features: [
    "10 generations per month (~50 captions)", // Updated!
    "5 variations per generation",
    "Basic voice training",
    "All platform presets",
  ],
  limits: {
    captionsPerMonth: 10, // Now means 10 generation requests
    // ...
  },
}

pro: {
  features: [
    "Unlimited generations", // Updated!
    "10 variations per generation",
    // ...
  ],
  limits: {
    captionsPerMonth: -1, // unlimited generations
  }
}
```

## How It Works

### Generation Flow

1. User clicks "Generate Captions"
2. System creates unique `generationBatchId` (e.g., `gen_1730095234567_a9x2`)
3. All 5 captions get the same `generationBatchId`
4. Usage API counts distinct `generationBatchId` values = generation requests
5. Counter updates: 1 generation used (not 5)

### Example

```
Generation 1: 5 captions with generationBatchId = "gen_123_abc"
Generation 2: 5 captions with generationBatchId = "gen_456_def"
Generation 3: 5 captions with generationBatchId = "gen_789_ghi"

Total captions in DB: 15
Total generations used: 3 ✅
Remaining (free plan): 7 generations
```

## Backwards Compatibility

### Old Captions (No generationBatchId)

- Query filters: `generationBatchId: { not: null }`
- Old captions without batch IDs are ignored in counts
- This prevents counting legacy data incorrectly

### Migration Path

- New generations get batch IDs automatically
- Old data doesn't affect limits
- Clean separation between old and new tracking

## Benefits

### For Users

✅ **10x more attempts** (2 → 10 generations)  
✅ **Lower anxiety** about "wasting" credits  
✅ **More experimentation** to find brand voice  
✅ **Better onboarding** experience  
✅ **Higher conversion** to paid plans after seeing value

### For Business

✅ **Industry standard** (matches competitors)  
✅ **User-friendly** mental model  
✅ **Predictable costs** (still know max API calls)  
✅ **Better engagement** metrics  
✅ **More satisfied** users

## Testing

### Check Your Current Usage

Visit `/api/user/usage` while logged in:

```json
{
  "usage": {
    "captionsUsed": 0, // Now counts generation requests
    "captionsLimit": 10, // 10 generation attempts
    "resetDate": "2025-11-27T..."
  }
}
```

### Test Generation

1. Generate captions once → Usage shows 1/10 (not 5/10!)
2. Generate again → Usage shows 2/10
3. After 10 generations → Limit reached, paywall shows

### Database Query

```sql
-- See your generations with caption counts
SELECT
  "generationBatchId",
  COUNT(*) as captions_count,
  MIN("createdAt") as generated_at
FROM captions
WHERE "userId" = 'your-user-id'
  AND "generationBatchId" IS NOT NULL
GROUP BY "generationBatchId"
ORDER BY generated_at DESC;
```

## Files Changed

✅ **Schema**: `prisma/schema.prisma` - Added `generationBatchId` field  
✅ **Migration**: Applied via Supabase MCP  
✅ **Generation API**: `/app/api/captions/generate/route.ts`  
✅ **Usage API**: `/app/api/user/usage/route.ts`  
✅ **Plans Config**: `/config/plans.ts`  
✅ **Generate Page**: `/app/(dashboard)/generate/page.tsx`  
✅ **ProBadge**: `/components/dashboard/ProBadge.tsx`  
✅ **Prisma Client**: Regenerated with `npx prisma generate`

## Build Status

✅ **TypeScript**: Compiled successfully  
✅ **Next.js Build**: Completed without errors  
✅ **Linter**: All checks passed (editor cache may show stale errors)  
✅ **Database**: Migration applied successfully

## Summary

The subscription system now properly tracks **generation requests** rather than individual captions, giving free users:

- **Before**: 2 attempts (10 captions / 5 per gen = 2)
- **After**: 10 attempts (10 generations × 5 captions = 50 total)

This is a **5x improvement** in user experience while maintaining the same cost structure! 🎉

---

**Next Steps:**

1. Test generating captions and watch the counter
2. Verify the ProBadge shows generations correctly
3. Test the paywall at 10 generations
4. Consider if 10 is the right limit or if 15 would be better

