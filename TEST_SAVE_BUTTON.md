# Save Button Testing & Debugging Guide

## Critical First Step: Run the Database Migration

**IMPORTANT**: The save button won't work until you add the `isSaved` column to your database.

### Run this SQL in your Supabase SQL Editor:

```sql
-- Add the isSaved column to the captions table
ALTER TABLE "captions" ADD COLUMN IF NOT EXISTS "isSaved" BOOLEAN NOT NULL DEFAULT false;

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'captions'
AND column_name = 'isSaved';
```

If the query returns a row with the column info, the migration is successful!

## Testing Steps

### 1. Test the Generate Page

1. Go to `/generate`
2. Generate some captions
3. Open your browser console (F12 → Console tab)
4. Look for any errors
5. Hover over a caption card and click the save button
6. Check the console for:
   - POST request to `/api/captions/save`
   - Response with `{ success: true, isSaved: true/false }`

**Expected Behavior:**

- Button should show a hollow bookmark icon initially
- After clicking, it should change to a filled bookmark icon
- No console errors

**Common Issues:**

- If you see "Cannot read property 'id' of undefined" → captions aren't being saved to DB
- If you see database errors → migration not run

### 2. Test the Dashboard Page

1. Go to `/dashboard`
2. Scroll to "Recent Captions"
3. Hover over a caption card
4. Click the save button (bookmark icon)
5. Check browser console

**Expected Behavior:**

- Icon changes from hollow to filled bookmark
- Refresh the page - state should persist
- Caption should appear in Library

**Common Issues:**

- If clicking does nothing → check console for errors
- If API returns 401 → authentication issue
- If you see "isSaved is undefined" → migration not run

### 3. Test the Library Page

1. Go to `/library`
2. You should see all saved captions
3. Click "Unsave" on any caption
4. Caption should be removed from the list

**Expected Behavior:**

- Shows all captions where `isSaved = true`
- Clicking unsave removes it from the list
- Shows toast notification

## Debugging with Console Logs

Add these temporary console logs to debug:

### In Dashboard page (around line 265):

```typescript
const handleSaveCaption = async (captionId: string) => {
  console.log("🔍 Saving caption:", captionId);
  try {
    setSavingCaptionId(captionId);
    const response = await fetch("/api/captions/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ captionId }),
    });

    console.log("📡 Response status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Save response:", data);
      // ... rest of code
    }
  } catch (error) {
    console.error("❌ Failed to save caption:", error);
  }
};
```

### Check if captions have IDs in Dashboard:

Add this inside the caption map (around line 238):

```typescript
{
  recentCaptions.map((caption, index) => {
    console.log("Caption data:", { id: caption.id, isSaved: caption.isSaved });
    return (
      <CaptionCard
      // ... rest
      />
    );
  });
}
```

## Common Issues & Solutions

### Issue 1: "Cannot find caption with ID"

**Cause:** Captions generated before the update don't have IDs tracked
**Solution:** Generate new captions after the update

### Issue 2: "Column 'isSaved' does not exist"

**Cause:** Database migration not run
**Solution:** Run the SQL migration above

### Issue 3: Save button doesn't respond

**Cause:** onClick handler not being called
**Solution:**

1. Check if `caption.id` is defined
2. Verify the action is in the `actions` array
3. Check browser console for React errors

### Issue 4: State updates but doesn't persist

**Cause:** API call failing or not saving to database
**Solution:**

1. Check Network tab in browser dev tools
2. Look for POST to `/api/captions/save`
3. Check response - should be `{ success: true, isSaved: boolean }`

## API Endpoint Test

Test the save endpoint directly using curl or Postman:

```bash
# Replace YOUR_CAPTION_ID with an actual caption ID from your database
curl -X POST http://localhost:3000/api/captions/save \
  -H "Content-Type: application/json" \
  -d '{"captionId": "YOUR_CAPTION_ID"}'
```

**Expected Response:**

```json
{
  "success": true,
  "caption": { ...caption data... },
  "isSaved": true
}
```

## Manual Database Check

Run this query in Supabase SQL Editor to verify:

```sql
-- Check if captions are being saved
SELECT id, content, "isSaved", "createdAt"
FROM captions
ORDER BY "createdAt" DESC
LIMIT 10;

-- Toggle a caption manually for testing
UPDATE captions
SET "isSaved" = true
WHERE id = 'YOUR_CAPTION_ID';
```

## Quick Checklist

- [ ] Database migration run (`isSaved` column exists)
- [ ] Generated new captions after implementing save feature
- [ ] Captions have IDs (check in Network tab → recent API response)
- [ ] No console errors when clicking save button
- [ ] Network tab shows POST to `/api/captions/save`
- [ ] API returns success response
- [ ] Icon changes after save
- [ ] State persists after page refresh
- [ ] Saved captions appear in Library page

## Still Not Working?

If you've checked everything above and it's still not working, please share:

1. Browser console errors
2. Network tab - POST request to `/api/captions/save` (headers, body, response)
3. Result of the database verification query
4. Which page you're testing (Generate, Dashboard, or Library)

This will help identify the exact issue!
