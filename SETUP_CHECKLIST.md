# Setup Checklist - Caption Generation Feature

Use this checklist to ensure everything is properly configured.

## Pre-Implementation ✅

- [x] Database schema updated
- [x] Query functions created
- [x] API endpoints implemented
- [x] Frontend components updated
- [x] Badge component created
- [x] Types updated
- [x] Documentation written

## Your Setup Tasks

### 1. Environment Variables

- [ ] Add `OPENAI_API_KEY` to `.env` file
  ```env
  OPENAI_API_KEY=sk-...your-key...
  ```
- [ ] Verify `DATABASE_URL` is set
- [ ] Verify `DIRECT_URL` is set (for Supabase)
- [ ] Check `.env.example` for any missing variables

**Verify:**

```bash
grep OPENAI_API_KEY .env
grep DATABASE_URL .env
```

### 2. Database Migration

- [ ] Run Prisma migration:
  ```bash
  npx prisma migrate dev --name add_caption_metadata
  ```
- [ ] Verify migration succeeded:
  ```bash
  npx prisma migrate status
  ```
- [ ] Regenerate Prisma client:
  ```bash
  npx prisma generate
  ```

**Alternative if migration fails:**

- [ ] Manually run SQL from `prisma/migrations/add_caption_metadata.sql`

### 3. Dependencies

- [ ] Ensure OpenAI SDK is installed:
  ```bash
  npm list openai
  # or
  pnpm list openai
  ```
- [ ] Install if missing:
  ```bash
  npm install openai
  # or
  pnpm install openai
  ```

### 4. Code Verification

- [ ] Check no TypeScript errors:
  ```bash
  npm run build
  # or
  pnpm build
  ```
- [ ] Verify no linting errors:
  ```bash
  npm run lint
  # or
  pnpm lint
  ```

### 5. Test the Implementation

#### Test 1: Generate Captions

- [ ] Start dev server: `npm run dev`
- [ ] Navigate to `http://localhost:3000/generate`
- [ ] Enter test content: "Launching our new product"
- [ ] Click "Generate Captions"
- [ ] Wait 3-5 seconds
- [ ] Verify 5 captions appear
- [ ] Check captions are diverse

#### Test 2: Database Persistence

- [ ] Check database has new captions:
  ```bash
  npx prisma studio
  ```
- [ ] Navigate to "Caption" model
- [ ] Verify new records exist
- [ ] Check `platform`, `style`, `metadata` fields are populated

#### Test 3: Dashboard Display

- [ ] Navigate to `http://localhost:3000/dashboard`
- [ ] Verify captions from test 1 appear
- [ ] Check platform badges show correctly
- [ ] Verify style tags display
- [ ] Test copy button works
- [ ] Check timestamps are accurate

#### Test 4: Voice Profile Integration

- [ ] Navigate to `http://localhost:3000/brand-voice`
- [ ] Complete voice profile setup
- [ ] Generate new captions
- [ ] Verify captions match selected tone
- [ ] Check platform preference is respected

### 6. Production Readiness

- [ ] Environment variables set in production
- [ ] Database migrations applied to production
- [ ] OpenAI API key has sufficient credits
- [ ] Rate limiting configured (if needed)
- [ ] Error monitoring setup (Sentry, etc.)
- [ ] Backup strategy in place

## Troubleshooting

### ❌ Issue: Database migration fails

**Solutions:**

1. Check database is accessible
2. Verify DATABASE_URL is correct
3. Try manual SQL execution
4. Check Prisma schema syntax

**Commands:**

```bash
npx prisma db push --skip-generate
npx prisma generate
```

### ❌ Issue: OpenAI API errors

**Solutions:**

1. Verify API key is correct
2. Check OpenAI account has credits
3. Check API key has proper permissions
4. Review rate limits

**Test API key:**

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### ❌ Issue: Captions not saving

**Solutions:**

1. Check database connection
2. Verify migration ran successfully
3. Check API logs for errors
4. Verify user is authenticated

**Check logs:**

```bash
# In terminal running dev server
# Look for "Caption generation error" or "Error creating caption"
```

### ❌ Issue: Voice profile not loading

**Solutions:**

1. Complete onboarding at `/brand-voice`
2. Check voice_profiles table exists
3. Verify user has a profile
4. Check foreign key relationships

**Verify in Prisma Studio:**

```bash
npx prisma studio
# Check VoiceProfile model
```

### ❌ Issue: UI badges not showing

**Solutions:**

1. Verify Badge component imported correctly
2. Check CSS is loading
3. Clear browser cache
4. Check component exports

## Performance Checklist

- [ ] API responds in < 6 seconds
- [ ] Database queries < 100ms
- [ ] No console errors
- [ ] No memory leaks
- [ ] Proper loading states
- [ ] Error boundaries working

## Security Checklist

- [ ] API keys not exposed in frontend
- [ ] User authentication required
- [ ] SQL injection protected (via Prisma)
- [ ] XSS prevention in place
- [ ] CSRF protection enabled
- [ ] Rate limiting configured

## Documentation Review

- [ ] Read `GENERATE_PAGE_IMPLEMENTATION.md`
- [ ] Review `QUICK_START_GUIDE.md`
- [ ] Understand `IMPLEMENTATION_COMPLETE.md`
- [ ] Bookmark this checklist

## Success Metrics

After setup, verify:

- [ ] Can generate captions in < 6 seconds
- [ ] Captions match voice profile
- [ ] All 5 caption styles are diverse
- [ ] Database saves all captions
- [ ] Dashboard shows recent captions
- [ ] Badges display consistently
- [ ] No errors in console
- [ ] UI is responsive

## Post-Setup Tasks

### Recommended

- [ ] Add caption analytics
- [ ] Set up monitoring/alerting
- [ ] Create user feedback mechanism
- [ ] Document custom prompts
- [ ] Train team on features

### Optional Enhancements

- [ ] Add favorites feature
- [ ] Implement export functionality
- [ ] Add A/B testing
- [ ] Create caption templates
- [ ] Add scheduling feature

## Support Resources

### Documentation

- Technical: `GENERATE_PAGE_IMPLEMENTATION.md`
- User Guide: `QUICK_START_GUIDE.md`
- Summary: `IMPLEMENTATION_COMPLETE.md`

### Code References

- API: `app/api/captions/generate/route.ts`
- Queries: `lib/db/queries/captions.ts`
- Schema: `prisma/schema.prisma`
- UI: `components/ui/Badge.tsx`

### External Resources

- OpenAI API: https://platform.openai.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Supabase: https://supabase.com/docs

## Final Verification

Once all items are checked:

1. **Generate Test Caption**

   ```
   Content: "Sharing my journey as a founder"
   Platform: Instagram (from voice profile)
   Expected: 5 diverse captions generated
   ```

2. **Check Database**

   ```bash
   npx prisma studio
   # Verify Caption records exist with metadata
   ```

3. **View in Dashboard**

   ```
   Navigate to /dashboard
   Expected: Recent captions display with badges
   ```

4. **Test Error Handling**
   ```
   Try with invalid API key
   Expected: Graceful error message
   ```

## Completion

When all items are checked (✓), your caption generation system is:

✅ Fully functional
✅ Production ready
✅ Properly documented
✅ Tested and verified

---

**Status Indicator**

- [ ] Setup in progress
- [ ] Testing phase
- [ ] Production deployment
- [ ] Live and operational

**Date Completed:** ******\_\_\_******

**Deployed By:** ******\_\_\_******

**Notes:** ******\_\_\_******

---

## Quick Reference Commands

```bash
# Database
npx prisma migrate dev
npx prisma generate
npx prisma studio

# Development
npm run dev
npm run build
npm run lint

# Testing
curl http://localhost:3000/api/captions/generate

# Environment
printenv | grep OPENAI
printenv | grep DATABASE

# Git
git status
git log --oneline -10
```

---

**Need help?** Check the troubleshooting section or review the documentation files.

**Ready to go?** Start at `/generate` and create your first AI-powered caption! 🚀
