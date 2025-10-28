-- =====================================================
-- RUN THIS SQL IN SUPABASE SQL EDITOR
-- =====================================================
-- This adds the required fields to the captions table
-- for the caption generation feature to work
-- =====================================================

-- Step 1: Add platform field (default: instagram)
ALTER TABLE "captions" 
ADD COLUMN IF NOT EXISTS "platform" TEXT DEFAULT 'instagram';

-- Step 2: Add style field (caption type)
ALTER TABLE "captions" 
ADD COLUMN IF NOT EXISTS "style" TEXT;

-- Step 3: Add metadata field (JSON for additional data)
ALTER TABLE "captions" 
ADD COLUMN IF NOT EXISTS "metadata" JSONB;

-- Step 4: Add comments for documentation
COMMENT ON COLUMN "captions"."platform" IS 'Target social media platform (instagram, linkedin, x, facebook, tiktok)';
COMMENT ON COLUMN "captions"."style" IS 'Caption style/type (Hook-first, Story-driven, Educational, Question-based, etc.)';
COMMENT ON COLUMN "captions"."metadata" IS 'Additional metadata: {length, style, engagementScore, isQuestion, isStory, isDirect}';

-- Step 5: Verify the changes
SELECT 
  column_name, 
  data_type, 
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'captions'
  AND column_name IN ('platform', 'style', 'metadata')
ORDER BY ordinal_position;

-- If you see 3 rows returned, the migration was successful!

