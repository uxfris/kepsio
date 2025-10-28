# Troubleshooting: "Failed to generate captions" Error

## Issue

You're getting the error: **"Failed to generate captions"** when trying to generate captions.

## Root Cause

The database schema needs to be updated with new fields (`platform`, `style`, `metadata`) but the migration hasn't been applied yet.

## Solution

### Option 1: Run SQL Directly in Supabase (RECOMMENDED)

1. **Open Supabase Dashboard**

   - Go to https://supabase.com/dashboard
   - Select your project
   - Navigate to **SQL Editor**

2. **Run the Migration SQL**

   - Open the file `RUN_THIS_IN_SUPABASE.sql` in this repo
   - Copy all the SQL
   - Paste into Supabase SQL Editor
   - Click **Run** (or press Cmd/Ctrl + Enter)

3. **Verify Success**

   - You should see 3 rows returned showing:
     - `platform` (TEXT, default 'instagram')
     - `style` (TEXT)
     - `metadata` (JSONB)

4. **Regenerate Prisma Client**

   ```bash
   npx prisma generate
   ```

5. **Restart Your Dev Server**

   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

6. **Test Again**
   - Navigate to `/generate`
   - Try generating captions
   - Should work now! ✅

### Option 2: Using Prisma Migrate (If you have direct database access)

```bash
# This might not work with Supabase pooler connection
npx prisma migrate deploy
npx prisma generate
```

### Option 3: Using Prisma DB Push (Quick fix, no migration history)

```bash
npx prisma db push
npx prisma generate
```

## How to Verify the Fix

### 1. Check Database Schema in Supabase

Go to **Supabase Dashboard** → **Table Editor** → **captions** table

You should see these new columns:

- ✅ `platform` (text)
- ✅ `style` (text)
- ✅ `metadata` (jsonb)

### 2. Test Caption Generation

1. Go to `/generate`
2. Enter test content: "Launching our new product"
3. Click "Generate Captions"
4. Should generate 5 captions successfully ✅

### 3. Check Generated Captions in Database

1. **Supabase Dashboard** → **Table Editor** → **captions**
2. Find your newly generated captions
3. Verify the new fields are populated:
   - `platform` should be "instagram" or your voice profile platform
   - `style` should be something like "Hook-first", "Story-driven", etc.
   - `metadata` should contain JSON data

## Common Errors & Solutions

### Error: "P1001: Can't reach database server"

**Problem:** Migration trying to use pooler URL instead of direct URL

**Solution:** Run the SQL directly in Supabase (Option 1 above)

---

### Error: "column captions.platform does not exist"

**Problem:** Migration wasn't applied

**Solution:**

1. Run `RUN_THIS_IN_SUPABASE.sql` in Supabase SQL Editor
2. Regenerate Prisma client: `npx prisma generate`
3. Restart dev server

---

### Error: "Invalid API key"

**Problem:** OpenAI API key is incorrect or expired

**Solution:**

1. Check `.env` file has `OPENAI_API_KEY`
2. Verify key is correct at https://platform.openai.com/api-keys
3. Check you have credits remaining

---

### Error: "User not authenticated"

**Problem:** Not logged in or session expired

**Solution:**

1. Log out and log back in
2. Clear cookies
3. Check Supabase authentication is working

---

### Error: "Voice profile not found"

**Problem:** User hasn't completed onboarding

**Solution:**

1. Navigate to `/brand-voice`
2. Complete the onboarding flow
3. Add at least one training sample
4. Try generating captions again

---

## Quick Diagnosis

Run this checklist to diagnose the issue:

### ✅ Environment Check

```bash
# Check OpenAI key is set
grep OPENAI_API_KEY .env

# Should output your key
```

### ✅ Database Check

Run in Supabase SQL Editor:

```sql
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'captions';
```

Should include: `platform`, `style`, `metadata`

### ✅ Prisma Check

```bash
# Ensure Prisma client is up to date
npx prisma generate
```

### ✅ Server Check

- Dev server should be running on `http://localhost:3000`
- Check terminal for any errors
- Look for "Caption generation error" in logs

## Detailed Error Messages

Now that we've improved error handling, you should see more detailed error messages. Common ones:

### "OPENAI_API_KEY is not set"

→ Add the API key to your `.env` file

### "column captions.platform does not exist"

→ Run the migration SQL in Supabase

### "Invalid response from OpenAI"

→ Check your OpenAI account credits and API key permissions

### "Failed to save caption to database"

→ Check database connection and permissions

## Still Not Working?

### 1. Check Server Logs

Look at your terminal where `npm run dev` is running. You should see detailed error messages like:

```
Caption generation error: Error: column captions.platform does not exist
```

This tells you exactly what's wrong.

### 2. Check Browser Console

Open Developer Tools (F12) → Console tab

Look for errors that show the actual API response:

```javascript
Caption generation error: column captions.platform does not exist
```

### 3. Test API Directly

You can test the API endpoint directly:

```bash
curl -X POST http://localhost:3000/api/captions/generate \
  -H "Content-Type: application/json" \
  -d '{
    "contentInput": "Test content",
    "contextData": {},
    "selectedContextItems": [],
    "options": {
      "cta": "none",
      "hashtagCount": 0,
      "captionLength": "medium",
      "emojiStyle": "moderate"
    }
  }'
```

This will show you the exact error response from the API.

## Prevention

To avoid this issue in the future:

1. ✅ Always run migrations before testing new features
2. ✅ Check Supabase dashboard for schema changes
3. ✅ Regenerate Prisma client after schema changes
4. ✅ Restart dev server after migrations

## Success Indicators

You'll know it's working when:

✅ No errors in browser console
✅ Caption generation completes in 3-5 seconds
✅ 5 captions appear in the results
✅ Captions are saved to database (visible in Supabase)
✅ Dashboard shows recent captions with badges

---

## Need More Help?

If you're still stuck:

1. **Share the full error message** from the browser console
2. **Check the terminal logs** where `npm run dev` is running
3. **Verify database schema** in Supabase Table Editor
4. **Check OpenAI dashboard** for API issues

---

## Quick Reference

```bash
# Fix 99% of issues:
# 1. Run SQL in Supabase (RUN_THIS_IN_SUPABASE.sql)
# 2. Regenerate Prisma
npx prisma generate
# 3. Restart server
npm run dev
```

That's it! 🎉
