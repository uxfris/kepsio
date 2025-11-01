# Database Keep-Alive Cron Job Setup

This guide explains how to set up and configure the database keep-alive cron job to prevent your free Supabase project from pausing after 7 days of inactivity.

## 📋 Overview

The cron job pings the database every 6 hours with a simple `SELECT 1` query to maintain activity and prevent automatic pausing.

## 🏗️ Implementation Details

### Files Created

1. **`app/api/cron/keep-alive/route.ts`** - API endpoint that executes the database ping
2. **`vercel.json`** - Vercel Cron configuration (runs every 6 hours)

### How It Works

- Executes a lightweight `SELECT 1` query via Prisma
- Runs every 6 hours (schedule: `0 */6 * * *`)
- Includes optional authentication via `CRON_SECRET` environment variable
- Logs successful pings with timestamps
- Returns JSON response with status and timestamp

## 🚀 Setup Instructions

### Option 1: Vercel Cron (Recommended for Vercel deployments)

1. **Add Environment Variable (Optional but Recommended)**

   In your Vercel project settings, add:

   ```
   CRON_SECRET=your-random-secret-string-here
   ```

   Generate a secure secret:

   ```bash
   openssl rand -base64 32
   ```

2. **Deploy to Vercel**

   The `vercel.json` file is automatically detected and the cron job will be configured.

3. **Verify Setup**

   - Go to your Vercel project dashboard
   - Navigate to "Settings" → "Cron Jobs"
   - You should see `/api/cron/keep-alive` scheduled to run every 6 hours

4. **Monitor Execution**

   - Go to "Deployments" → "Functions" → "Logs"
   - Look for `[Keep-Alive Cron]` log entries

### Option 2: External Cron Service (Alternative)

If you're not using Vercel, you can use external services like:

#### cron-job.org (Free)

1. Sign up at [cron-job.org](https://cron-job.org)
2. Create a new cron job:
   - **URL**: `https://your-domain.com/api/cron/keep-alive`
   - **Schedule**: Every 6 hours
   - **Request Method**: GET
   - **Authentication**: Add header `Authorization: Bearer YOUR_CRON_SECRET`

#### EasyCron (Free Tier Available)

1. Sign up at [easycron.com](https://www.easycron.com)
2. Create a new cron job with similar settings

#### GitHub Actions

Create `.github/workflows/keep-alive.yml`:

```yaml
name: Database Keep-Alive

on:
  schedule:
    # Runs every 6 hours
    - cron: "0 */6 * * *"
  workflow_dispatch: # Allows manual triggering

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Database
        run: |
          curl -X GET \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            https://your-domain.com/api/cron/keep-alive
```

## 🔒 Security

### Authentication

The endpoint supports optional authentication via the `CRON_SECRET` environment variable:

```typescript
// In your cron service, add this header:
Authorization: Bearer YOUR_CRON_SECRET
```

### Best Practices

1. **Always use CRON_SECRET** in production to prevent unauthorized access
2. **Use HTTPS** to ensure secure communication
3. **Monitor logs** regularly to ensure the cron job is running successfully
4. **Set up alerts** if the endpoint fails (via Vercel monitoring or external services)

## 🧪 Testing

### Test Locally

```bash
# Without authentication
curl http://localhost:3000/api/cron/keep-alive

# With authentication (if CRON_SECRET is set)
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
     http://localhost:3000/api/cron/keep-alive
```

### Test in Production

```bash
curl https://your-domain.com/api/cron/keep-alive
```

Expected response:

```json
{
  "success": true,
  "message": "Database pinged successfully",
  "timestamp": "2025-11-01T12:00:00.000Z",
  "result": [{ "ping": 1 }]
}
```

## 📊 Monitoring

### Check Logs

**Vercel:**

- Dashboard → Functions → Logs
- Look for: `[Keep-Alive Cron] Database pinged successfully at ...`

**Local Development:**

- Check your console for log messages

### Set Up Alerts

Consider setting up monitoring with:

- **Vercel Monitoring**: Built-in function monitoring
- **Sentry**: For error tracking
- **Better Uptime**: For endpoint health checks
- **UptimeRobot**: Free uptime monitoring

## ⚙️ Configuration

### Adjust Frequency

Edit the schedule in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/keep-alive",
      "schedule": "0 */6 * * *" // Every 6 hours
    }
  ]
}
```

**Schedule Format** (cron syntax):

- `0 */6 * * *` - Every 6 hours
- `0 */4 * * *` - Every 4 hours
- `0 0 */1 * *` - Every day at midnight
- `*/30 * * * *` - Every 30 minutes (not recommended, too frequent)

**Recommended**: Keep it at 6 hours to balance between keeping the database active and not overusing resources.

## 🐛 Troubleshooting

### Cron Job Not Running

1. **Verify vercel.json** is in the root directory
2. **Check Vercel Dashboard** → Settings → Cron Jobs
3. **Redeploy** your application after adding vercel.json
4. **Check logs** for any error messages

### Unauthorized Errors

1. Ensure `CRON_SECRET` matches in:
   - Environment variables
   - Your cron service configuration
2. Check for typos in the secret
3. Verify the `Authorization` header format

### Database Connection Errors

1. Check `DATABASE_URL` environment variable
2. Verify Supabase project is not paused
3. Check Prisma connection in other parts of your app
4. Review Supabase logs for connection issues

### Vercel Cron Limitations

- **Hobby Plan**: Cron jobs included for free
- **Pro Plan**: Advanced monitoring and more frequent schedules
- Check [Vercel Cron Docs](https://vercel.com/docs/cron-jobs) for latest limits

## 📚 Additional Resources

- [Vercel Cron Jobs Documentation](https://vercel.com/docs/cron-jobs)
- [Supabase Free Tier Limits](https://supabase.com/docs/guides/platform/org-based-billing)
- [Cron Expression Generator](https://crontab.guru/)

## ✅ Next Steps

1. Deploy your application with the new cron configuration
2. Add `CRON_SECRET` to your environment variables
3. Verify the cron job appears in Vercel dashboard
4. Monitor the first few executions
5. Set up error alerting for production

---

**Note**: Free Supabase projects pause after 7 days of inactivity. This cron job pings every 6 hours, ensuring your database stays active. However, remember that free tier has other limits like storage and bandwidth.
