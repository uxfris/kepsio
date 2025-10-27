# Prisma + Supabase Setup Guide

## The Issue: `prisma migrate dev` Hangs

Supabase uses a **connection pooler** (pgBouncer) for the main database URL, which works great for serverless/edge functions but **doesn't work with Prisma migrations**. Prisma needs a direct connection to properly create the shadow database and run migrations.

## The Solution: Both DATABASE_URL and DIRECT_URL

Your Prisma schema now requires TWO environment variables:

```
DATABASE_URL    → Connection pooler (for app runtime)
DIRECT_URL      → Direct connection (for Prisma migrations)
```

## Setup Instructions

### Step 1: Get Your Connection Strings from Supabase

1. Go to your Supabase project dashboard
2. Click **Settings** → **Database**
3. Under "Connection string", select **PostgreSQL**
4. You'll see two connection strings:
   - **Standard** (pooled connection): Use this for `DATABASE_URL`
   - **Direct** (direct connection): Use this for `DIRECT_URL`

> **Note**: Both should look similar, but the Direct one uses port 5432 while pooled uses port 6543.

### Step 2: Update Your `.env` File

```env
DATABASE_URL="postgresql://postgres.xxxxx:password@aws-1-eu-north-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.xxxxx:password@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"
```

### Step 3: Run Prisma Migrations

Now migrations should work correctly:

```bash
npx prisma migrate dev --name initial_schema
```

Or push schema changes directly:

```bash
npx prisma db push
```

### Step 4: Generate Prisma Client

```bash
npx prisma generate
```

## Why This Works

- **DATABASE_URL** (pooled): Used by your Next.js app at runtime. The connection pooler handles multiple serverless connections efficiently.
- **DIRECT_URL** (direct): Used by Prisma during migrations. It needs a direct connection to manage the shadow database and execute DDL statements.

## Important Notes

⚠️ **Never commit your `.env` file** - it contains sensitive credentials.

✅ **Use `.env.example`** to document which variables are needed (without values).

✅ **Keep both URLs synchronized** - they should point to the same database, just different connection methods.

## Troubleshooting

If migrations still hang:

1. **Verify connectivity**: Test direct connection from terminal:

   ```bash
   psql "postgresql://postgres.xxxxx:password@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"
   ```

2. **Check credentials**: Ensure your password is correct and doesn't contain special characters that need escaping.

3. **Database status**: Log into Supabase and verify your database is running and healthy.

4. **Firewall/IP**: Ensure your IP isn't blocked from accessing Supabase PostgreSQL.

## References

- [Prisma Supabase Guide](https://www.prisma.io/docs/orm/overview/databases/supabase)
- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
