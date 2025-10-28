-- ============================================
-- SAVE BUTTON FEATURE - DATABASE MIGRATION
-- ============================================
-- 
-- This migration adds the isSaved field to the captions table
-- Run this in your Supabase SQL Editor
--
-- IMPORTANT: Run this BEFORE testing the save button feature!
-- ============================================

-- Add the isSaved column if it doesn't exist
ALTER TABLE "captions" 
ADD COLUMN IF NOT EXISTS "isSaved" BOOLEAN NOT NULL DEFAULT false;

-- Create an index for faster queries on saved captions
CREATE INDEX IF NOT EXISTS "idx_captions_is_saved" 
ON "captions" ("isSaved", "userId", "updatedAt" DESC);

-- Verify the column was added successfully
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'captions' 
AND column_name = 'isSaved';

-- Check if any existing captions exist
SELECT 
  COUNT(*) as total_captions,
  SUM(CASE WHEN "isSaved" = true THEN 1 ELSE 0 END) as saved_captions,
  SUM(CASE WHEN "isSaved" = false THEN 1 ELSE 0 END) as unsaved_captions
FROM "captions";

