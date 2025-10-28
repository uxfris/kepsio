# Save Button Implementation

## Overview

The save button is now fully functional across all caption pages (Dashboard, Generate, and Library). Users can save and unsave captions, with all changes persisted to the database.

## Changes Made

### 1. Database Schema Update

- **File**: `prisma/schema.prisma`
- **Change**: Added `isSaved` boolean field (default: false) to the Caption model
- **Migration**: Created migration file at `prisma/migrations/20241028_add_is_saved_to_caption/migration.sql`

### 2. Database Queries

- **File**: `lib/db/queries/captions.ts`
- **New Functions**:
  - `toggleCaptionSaved()`: Toggles the saved state of a caption
  - `getSavedCaptions()`: Retrieves all saved captions for a user

### 3. API Endpoint

- **File**: `app/api/captions/save/route.ts`
- **Method**: POST
- **Endpoint**: `/api/captions/save`
- **Body**: `{ captionId: string }`
- **Response**: `{ success: boolean, caption: Caption, isSaved: boolean }`

### 4. Updated API Endpoint

- **File**: `app/api/captions/recent/route.ts`
- **Change**: Now includes `isSaved` field in the response

### 5. Component Updates

#### CaptionResults Component

- **File**: `components/captions/CaptionResults.tsx`
- **New Props**:
  - `captionIds?: string[]` - Array of caption IDs
  - `savedStates?: boolean[]` - Array of saved states
  - `onSaveCaption?: (captionId: string, index: number) => void` - Save handler
- **Visual Update**: Save button now shows `BookmarkCheck` icon when saved, `Bookmark` when not saved

#### Dashboard Page

- **File**: `app/(dashboard)/dashboard/page.tsx`
- **Changes**:
  - Fetches `isSaved` state from API
  - Implements `handleSaveCaption()` to save/unsave captions
  - Shows visual feedback during save operation
  - Updates local state after successful save

#### Generate Page

- **File**: `app/(dashboard)/generate/page.tsx`
- **Changes**:
  - Tracks caption IDs and saved states
  - Implements `handleSaveCaption()` to save/unsave captions
  - Passes required props to CaptionResults component
  - Updates saved state after successful save

#### Library Page

- **File**: `app/(dashboard)/library/page.tsx`
- **Changes**:
  - Fetches only saved captions from API on mount
  - Implements `handleSaveCaption()` to unsave captions
  - Removes unsaved captions from the list
  - Shows loading state while fetching
  - Shows toast notification when caption is removed

## How It Works

### Saving a Caption

1. User clicks the save button on a caption
2. Frontend calls POST `/api/captions/save` with the caption ID
3. Backend toggles the `isSaved` field in the database
4. Backend returns the updated caption with new `isSaved` state
5. Frontend updates the UI to reflect the new state

### Dashboard & Generate Pages

- Save button toggles between saved and unsaved states
- Visual feedback shows a filled bookmark icon when saved
- State persists across page refreshes

### Library Page

- Displays only saved captions on load
- "Unsave" button removes caption from the library view
- Shows toast notification when caption is removed

## Important Notes

### Database Migration

**IMPORTANT**: Before this feature will work, you need to run the database migration:

```bash
# Option 1: Run the migration (if you have database access)
npx prisma migrate dev

# Option 2: Apply the migration directly to your Supabase database
# Run the SQL in prisma/migrations/20241028_add_is_saved_to_caption/migration.sql
# in your Supabase SQL editor
```

The migration SQL:

```sql
ALTER TABLE "captions" ADD COLUMN "isSaved" BOOLEAN NOT NULL DEFAULT false;
```

### Generate Page Limitation

Currently, the Generate page doesn't have caption IDs immediately after generation since captions need to be saved to the database first. To make the save button fully functional on the Generate page, you'll need to:

1. Save generated captions to the database after generation
2. Store their IDs and pass them to the CaptionResults component
3. Initialize the `savedStates` array based on the saved captions

This can be implemented in the `generateCaptions` function in the `useCaptionGeneration` hook.

## Testing

### Dashboard Page

1. Navigate to the dashboard
2. Click save on any recent caption
3. Icon should change from Bookmark to BookmarkCheck
4. Click again to unsave
5. Refresh the page - state should persist

### Generate Page

1. Generate new captions
2. Click save on any caption
3. Icon should change to indicate saved state
4. Refresh and go to library - caption should appear there

### Library Page

1. Navigate to library
2. All saved captions should be displayed
3. Click "Unsave" on any caption
4. Caption should be removed from the list
5. Toast notification should confirm removal

## Future Enhancements

1. Save captions immediately after generation in the Generate page
2. Add a "Save All" button to save all generated captions at once
3. Add bulk actions in the Library page (select multiple captions to unsave)
4. Add filters in Library to show/hide saved captions by criteria
5. Add a counter showing total saved captions in the navbar or sidebar
