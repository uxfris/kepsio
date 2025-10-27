# OAuth Setup Guide

This guide will help you configure Google and Twitter OAuth authentication for Kepsio.

## Prerequisites

- A Supabase project
- Google Cloud Console account (for Google OAuth)
- Twitter Developer account (for Twitter OAuth)

## Google OAuth Setup

### Step 1: Google Cloud Console Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **+ CREATE CREDENTIALS** > **OAuth client ID**
5. If prompted, configure the OAuth consent screen:

   - User Type: **External**
   - App name: **Kepsio**
   - User support email: your email
   - Developer contact: your email
   - Click **Save and Continue**
   - Add scopes: `email`, `profile`, `openid`
   - Add test users if needed
   - Click **Save and Continue**

6. Create OAuth client ID:

   - Application type: **Web application**
   - Name: **Kepsio Web Client**
   - **Authorized redirect URIs** (IMPORTANT - use your Supabase project URL):
     ```
     https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
     ```
     Replace `[YOUR-PROJECT-REF]` with your Supabase project reference ID.

7. Click **Create**
8. Copy the **Client ID** and **Client Secret**

### Step 2: Supabase Dashboard Configuration

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication** > **Providers**
4. Find **Google** and click to configure
5. Toggle **Enable Google provider**
6. Enter your Google Client ID and Client Secret
7. Click **Save**

### Step 3: Configure Redirect URLs in Supabase

1. Still in Supabase Dashboard, go to **Authentication** > **URL Configuration**
2. Add the following URL to **Redirect URLs**:

   ```
   http://localhost:3000/auth/callback
   ```

   (Add this for local development)

3. For production, add your production URL:

   ```
   https://yourdomain.com/auth/callback
   ```

4. Make sure **Site URL** is set correctly:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`

## Twitter OAuth Setup

### Step 1: Twitter Developer Portal

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app
3. Configure app settings:
   - App name: **Kepsio**
   - Website URL: your production URL
   - Callback URL: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
4. Generate API Keys and Secrets:
   - Copy **API Key** and **API Secret**
   - Generate **Bearer Token**

### Step 2: Supabase Dashboard Configuration

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** > **Providers**
3. Find **Twitter** and click to configure
4. Toggle **Enable Twitter provider**
5. Enter your Twitter API Key and API Secret
6. Click **Save**

## Testing OAuth

### Local Development

1. Make sure your `.env.local` file has:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Navigate to your app and click "Sign up with Google" or "Sign up with X"
4. You should be redirected to the OAuth provider
5. After authentication, you'll be redirected back to `/auth/callback`
6. Then you'll be redirected to `/dashboard`

### Common Issues

#### Error: `redirect_uri_mismatch`

**Cause**: The redirect URI in Google Cloud Console doesn't match Supabase's callback URL.

**Solution**:

1. Go to Google Cloud Console > Credentials
2. Edit your OAuth 2.0 Client ID
3. Make sure the redirect URI is exactly:
   ```
   https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
   ```
4. Copy this exact URL from your Supabase Dashboard > Authentication > URL Configuration

#### Error: `invalid_client`

**Cause**: Client ID or Client Secret is incorrect or not configured in Supabase.

**Solution**:

1. Go to Supabase Dashboard > Authentication > Providers
2. Check that Google/Twitter provider is enabled
3. Verify the credentials match what you have in Google Cloud Console
4. Make sure there are no extra spaces or characters

#### Authentication succeeds but user not created

**Cause**: The callback route might not be processing the OAuth response correctly.

**Solution**:

1. Check that `/auth/callback/route.ts` is processing the `code` parameter
2. Verify that Supabase is exchanging the code for a session
3. Check the browser console for any errors

## Environment Variables

Make sure your `.env.local` file includes:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database (if using Supabase PostgreSQL)
DATABASE_URL=postgresql://postgres:password@db.your-project-ref.supabase.co:5432/postgres

# OpenAI (for caption generation)
OPENAI_API_KEY=your-openai-api-key

# Stripe (for billing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase OAuth Documentation](https://supabase.com/docs/guides/auth/social-login)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Twitter OAuth Documentation](https://developer.twitter.com/en/docs/authentication/overview)
