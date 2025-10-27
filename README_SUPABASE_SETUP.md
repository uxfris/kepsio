# Supabase Setup Instructions

This application uses Supabase for authentication. Follow these steps to set up Supabase for your project.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Note down your project URL and anon key from the project settings

## 2. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database (if using Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:bixsif-rombeJ-vutba7@db.ajtsbweljixyrmrlumxl.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"

# OpenAI (for caption generation)
OPENAI_API_KEY="your-openai-api-key"

# Stripe (for billing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

## 3. Enable Authentication Providers

In your Supabase dashboard:

1. Go to Authentication > Providers
2. Enable Email provider (for magic link authentication)
3. Enable Google OAuth (optional)
4. Enable Twitter/X OAuth (optional)

### For OAuth Providers (Google, Twitter):

#### Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
6. Add the Client ID and Client Secret to Supabase Authentication > Providers > Google

#### Twitter OAuth:

1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create an app
3. Add callback URL: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
4. Add the API Key and API Secret to Supabase Authentication > Providers > Twitter

## 4. Configure Auth Callback URL

In your Supabase dashboard:

1. Go to Authentication > URL Configuration
2. Add `http://localhost:3000/auth/callback` to the Redirect URLs (for local development)
3. Add your production URL to Redirect URLs (for production)

## 5. How It Works

### Email Authentication (Magic Links)

- Users enter their email address
- Supabase sends a magic link to their email
- User clicks the link and is redirected to `/auth/callback`
- The callback route exchanges the code for a session
- User is redirected to the dashboard

### OAuth Authentication (Google, Twitter)

- Users click the OAuth provider button
- They are redirected to the provider's login page
- After authentication, they are redirected to `/auth/callback`
- The callback route exchanges the code for a session
- User is redirected to the dashboard

## 6. Database Schema

The application uses the following Prisma schema for user management. Make sure to run migrations:

```bash
npx prisma migrate dev
```

This will create the necessary tables in your Supabase database.

## 7. Testing

1. Start your development server: `npm run dev`
2. Click "Sign In" or "Sign Up" in the navigation
3. Try email authentication with a test email
4. Check your email for the magic link
5. Or test OAuth authentication with Google/Twitter

## Troubleshooting

### "Invalid redirect URL"

- Make sure you've added the callback URL in Supabase dashboard
- Check that the URL in `.env` matches your project URL

### "Provider not enabled"

- Enable the provider in Supabase Authentication > Providers
- Configure the OAuth credentials correctly

### Magic link not received

- Check spam folder
- Verify email in Supabase dashboard > Authentication > Settings
- Make sure email provider is enabled
