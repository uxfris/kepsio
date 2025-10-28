-- Add new fields to captions table for better metadata tracking
-- Run this migration using: npx prisma migrate dev --name add_caption_metadata

-- Add platform field (stores target social media platform)
ALTER TABLE "captions" ADD COLUMN IF NOT EXISTS "platform" TEXT DEFAULT 'instagram';

-- Add style field (stores caption style/type)
ALTER TABLE "captions" ADD COLUMN IF NOT EXISTS "style" TEXT;

-- Add metadata field (stores additional caption metadata as JSON)
ALTER TABLE "captions" ADD COLUMN IF NOT EXISTS "metadata" JSONB;

-- Add comments for documentation
COMMENT ON COLUMN "captions"."platform" IS 'Target social media platform (instagram, linkedin, x, facebook, tiktok)';
COMMENT ON COLUMN "captions"."style" IS 'Caption style/type (Hook-first, Story-driven, Educational, etc.)';
COMMENT ON COLUMN "captions"."metadata" IS 'Additional metadata including length, engagement score, style flags';

