# Quick Start Guide - Caption Generation Feature

## Prerequisites

Before starting, ensure you have:

1. OpenAI API key
2. Database access configured
3. Supabase authentication setup

## Installation Steps

### 1. Environment Variables

Add to your `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url
```

### 2. Database Migration

Run the migration to add new caption fields:

```bash
# Option 1: Using Prisma (recommended)
npx prisma migrate dev --name add_caption_metadata

# Option 2: Manual SQL (if Prisma fails)
# Run the SQL in prisma/migrations/add_caption_metadata.sql
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Install Dependencies (if needed)

```bash
npm install openai
# or
pnpm install openai
```

## Testing the Feature

### 1. Set Up Voice Profile (Optional but Recommended)

1. Navigate to `/brand-voice`
2. Complete the onboarding:
   - Select your platform (Instagram, LinkedIn, etc.)
   - Choose your brand tone
   - Add training samples
3. This helps AI generate captions in your unique voice

### 2. Generate Your First Caption

1. Go to `/generate`
2. Enter what your content is about:
   ```
   Example: "Launching our new AI-powered caption tool that helps
   creators save time and increase engagement"
   ```
3. (Optional) Add context:
   - Product link
   - Image upload
   - Related previous post
4. (Optional) Configure advanced options:
   - CTA style
   - Number of hashtags (0-10)
   - Caption length (short/medium/long)
   - Emoji style (none/minimal/moderate/expressive)
5. Click "Generate Captions"
6. Wait 3-5 seconds for AI to generate 5 unique captions
7. Copy, edit, or save your favorites

### 3. View Recent Captions

1. Go to `/dashboard`
2. See all your generated captions
3. Each caption shows:
   - Platform badge (Instagram, LinkedIn, X)
   - Style tag (Educational, Teaser, etc.)
   - Time created
   - Full caption text
4. Actions available:
   - Copy to clipboard
   - Regenerate
   - Save to library

## Features Overview

### Caption Generation Options

#### Context Items

- **Product Link**: Include a product URL for context
- **Image Upload**: Describe what's in your image
- **Previous Post**: Reference a related post

#### Advanced Options

- **Call-to-Action**: Choose from presets or create custom
- **Hashtags**: Control number (0-10)
- **Length**: Short (50-100), Medium (100-200), Long (200-400)
- **Emojis**: None, Minimal (1-2), Moderate (3-5), Expressive (5+)

### Caption Styles Generated

The AI generates 5 diverse styles:

1. **Hook-first**: Attention-grabbing opening
2. **Story-driven**: Narrative-based
3. **Direct**: Clear and actionable
4. **Question-based**: Engaging questions
5. **Inspirational**: Motivational

### Voice Profile Integration

When you set up your voice profile, the AI will:

- Match your brand tone
- Consider your target platform
- Learn from your training samples
- Apply your style preferences (questions, emojis, CTAs)

## API Endpoints

### Generate Captions

```
POST /api/captions/generate
Body: {
  contentInput: string,
  contextData: object,
  selectedContextItems: string[],
  options: object
}
```

### Get Recent Captions

```
GET /api/captions/recent?limit=10
```

## Troubleshooting

### Issue: "Failed to generate caption"

**Solutions:**

- Check OpenAI API key is set correctly
- Verify you have credits in OpenAI account
- Check console for detailed error

### Issue: Captions not saving

**Solutions:**

- Ensure database migration ran successfully
- Check Prisma schema matches database
- Verify user authentication is working

### Issue: Voice profile not loading

**Solutions:**

- Complete onboarding first at `/brand-voice`
- Check database for voice_profiles table
- Verify user ID is correctly linked

### Issue: Database connection error

**Solutions:**

- Check DATABASE_URL and DIRECT_URL in .env
- Ensure database server is running
- Verify network connectivity

## File Structure

```
/app/api/captions/
  ├── generate/route.ts      # Caption generation API
  └── recent/route.ts        # Fetch recent captions API

/lib/db/queries/
  ├── captions.ts            # Caption database queries
  └── voice-profiles.ts      # Voice profile queries

/hooks/
  └── useCaptionGeneration.ts # Caption generation hook

/components/ui/
  └── Badge.tsx              # Consistent badge component

/app/(dashboard)/
  ├── generate/page.tsx      # Main generation page
  └── dashboard/page.tsx     # Dashboard with recent captions
```

## Best Practices

1. **Voice Profile**: Set up before generating captions for best results
2. **Training Samples**: Add 3-5 examples of your best captions
3. **Context**: Provide as much context as possible for better results
4. **Iteration**: Generate multiple times to get variety
5. **Customization**: Use advanced options to fine-tune output

## Performance Tips

- Generation takes 3-5 seconds on average
- Batch operations save all 5 captions at once
- Dashboard fetches last 10 captions by default
- Consider caching voice profiles for faster access

## Next Steps

1. ✅ Generate your first caption
2. ✅ Set up your voice profile
3. ✅ Customize advanced options
4. ✅ Save your favorites
5. ⏭️ Integrate with your posting workflow
6. ⏭️ Track which styles perform best
7. ⏭️ Refine your voice profile over time

## Support

For detailed implementation information, see:

- `GENERATE_PAGE_IMPLEMENTATION.md` - Technical documentation
- `prisma/schema.prisma` - Database schema
- OpenAI API documentation

## Success Metrics

Track these to measure success:

- Captions generated per day
- Time saved vs manual writing
- Engagement on AI-generated captions
- Voice profile match accuracy
- User satisfaction with results

---

**Ready to create amazing captions? Start at `/generate`! 🚀**
