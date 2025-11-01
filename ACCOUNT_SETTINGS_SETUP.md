# Account Settings Setup Guide

This guide explains how to set up and use the fully functional account settings page.

## Features Implemented

### 1. Profile Picture Management

- **Upload Profile Picture**: Users can upload JPG, PNG, GIF, or WebP images (max 5MB)
- **Remove Profile Picture**: Users can remove their current profile picture
- **Automatic Initials**: When no profile picture is set, displays user initials
- **Image Storage**: Profile pictures are stored in Supabase Storage

### 2. Profile Information

- **Edit Name**: Users can update their full name
- **Edit Email**: Users can update their email (requires verification)
- **Real-time Updates**: Changes are saved to the database immediately
- **Validation**: Email format and uniqueness validation

### 3. Session Management

- **Logout**: Users can securely sign out from their account
- **Redirect**: After logout, users are redirected to the home page

### 4. Account Deletion

- **Delete Account**: Users can permanently delete their account
- **Confirmation Dialog**: Requires explicit confirmation before deletion
- **Cascade Deletion**: Automatically deletes all related data (captions, voice profiles, subscriptions)
- **Storage Cleanup**: Removes profile picture from Supabase Storage

## Supabase Storage Setup

### Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the sidebar
3. Click **Create bucket**
4. Configure the bucket:
   - **Name**: `avatars`
   - **Public bucket**: ✅ (checked)
   - Click **Create bucket**

### Set Storage Policies

After creating the bucket, set up the following RLS policies:

#### Policy 1: Allow authenticated users to upload their own avatar

```sql
-- Allow users to upload to their own folder
CREATE POLICY "Users can upload their own avatar"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Policy 2: Allow authenticated users to update their own avatar

```sql
-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Policy 3: Allow authenticated users to delete their own avatar

```sql
-- Allow users to delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Policy 4: Allow public read access to avatars

```sql
-- Allow anyone to view avatars (public bucket)
CREATE POLICY "Public avatar access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'avatars');
```

### Quick Setup (Run in Supabase SQL Editor)

Copy and paste this SQL to set up everything at once:

```sql
-- Create the avatars bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Allow users to upload their own avatar
CREATE POLICY IF NOT EXISTS "Users can upload their own avatar"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own avatar
CREATE POLICY IF NOT EXISTS "Users can update their own avatar"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own avatar
CREATE POLICY IF NOT EXISTS "Users can delete their own avatar"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read access
CREATE POLICY IF NOT EXISTS "Public avatar access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'avatars');
```

## API Endpoints

### GET `/api/user/profile`

Fetches the current user's profile data including name, email, and image URL.

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "image": "https://...",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### PATCH `/api/user/profile`

Updates the user's profile information.

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "user": {
    /* updated user data */
  },
  "message": "Profile updated successfully"
}
```

### POST `/api/user/profile/image`

Uploads a new profile picture.

**Request:** FormData with `file` field

**Response:**

```json
{
  "success": true,
  "user": {
    /* updated user data with new image URL */
  },
  "message": "Profile picture updated successfully"
}
```

### DELETE `/api/user/profile/image`

Removes the user's profile picture.

**Response:**

```json
{
  "success": true,
  "user": {
    /* updated user data with null image */
  },
  "message": "Profile picture removed successfully"
}
```

### DELETE `/api/user/delete`

Permanently deletes the user's account and all associated data.

**Response:**

```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

## User Experience Features

### Loading States

- **Initial Load**: Shows spinner while fetching user data
- **Uploading Image**: Shows spinner overlay on avatar
- **Saving Changes**: Disables inputs and shows "Saving..." text
- **Deleting Account**: Shows "Processing..." in confirmation dialog

### Validation

- **Email Format**: Validates email format before saving
- **Email Uniqueness**: Checks if email is already taken by another user
- **Name Length**: Requires at least 2 characters
- **Image Size**: Max 5MB file size
- **Image Type**: Only JPG, PNG, GIF, and WebP allowed

### User Feedback

- **Toast Notifications**: Success and error messages for all actions
- **Disabled States**: Buttons disabled during operations
- **Unsaved Changes**: Save button appears when changes are made
- **Cancel Changes**: Reset to original values

### Security

- **Authentication Required**: All endpoints require authenticated user
- **User Ownership**: Users can only modify their own data
- **Confirmation Required**: Delete account requires explicit confirmation
- **Cascade Deletion**: All user data is properly cleaned up

## Testing the Features

### Test Profile Picture Upload

1. Navigate to Settings > Account
2. Click "Upload New" button
3. Select an image file (JPG, PNG, GIF, or WebP)
4. Verify image appears in the profile picture area
5. Verify toast notification appears

### Test Profile Information Update

1. Change your name or email
2. Verify "Save Changes" button appears
3. Click "Save Changes"
4. Verify toast notification appears
5. Refresh page to confirm changes persisted

### Test Email Change

1. Change your email address
2. Save changes
3. Check your new email for verification link
4. Click verification link to confirm

### Test Profile Picture Removal

1. If you have a profile picture, click "Remove"
2. Verify initials appear instead
3. Verify toast notification appears

### Test Account Deletion

1. Click "Delete Account" in Danger Zone
2. Verify confirmation dialog appears
3. Click "Delete Account" in dialog
4. Verify redirect to home page
5. Try to log in - account should be deleted

## Troubleshooting

### Profile Picture Upload Fails

- Ensure Supabase Storage bucket "avatars" exists and is public
- Verify RLS policies are set correctly
- Check file size (max 5MB) and format (JPG, PNG, GIF, WebP)

### Email Update Doesn't Work

- Check if email is already taken by another user
- Verify email format is valid
- Check Supabase Auth email settings

### Delete Account Fails

- Verify user is authenticated
- Check browser console for errors
- Ensure cascade delete is working in database

## Additional Notes

- Profile pictures are stored at: `avatars/{userId}/{timestamp}.{ext}`
- Old profile pictures are automatically deleted when uploading new ones
- Email changes require verification before taking effect
- Account deletion is permanent and cannot be undone
- All related data (captions, voice profiles, subscriptions) is deleted with the account

