# Deployment Checklist

## Clerk Authentication (Required for sign-in/sign-up)

If you see "Authentication failed to load" or "Clerk didn't load", follow the correct path for your deployment URL.

---

### Path A: `*.vercel.app` URL (e.g. `mtt-mobile-tower-transformation.vercel.app`)

**Clerk does not support production keys with `*.vercel.app` domains.** You must use **development** keys.

1. Add environment variables in Vercel → Project → Settings → Environment Variables:

| Variable | Value | Environments |
|----------|-------|--------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` | Production, Preview, Development |
| `CLERK_SECRET_KEY` | `sk_test_...` | Production, Preview, Development |
| `CLERK_SIGN_IN_URL` | `/sign-in` | Production, Preview, Development |
| `CLERK_AFTER_SIGN_OUT_URL` | `/sign-in` | Production, Preview, Development |

2. Get keys from [Clerk Dashboard](https://dashboard.clerk.com) → **API keys** (stay on **Development** instance).

3. Redeploy. No domain configuration in Clerk Dashboard is needed for vercel.app.

---

### Path B: Custom domain (e.g. `app.yourdomain.com`)

For production with a domain you own:

1. Add **production** keys to Vercel. Get them from Clerk Dashboard → switch to **Production** (top-left) → API keys → `pk_live_...` and `sk_live_...`.

2. Configure your domain in Clerk Dashboard → **Domains** (add DNS records as instructed).

3. Add env vars to Vercel, then redeploy.

4. Production keys only work with your configured production domain. `localhost` and `*.vercel.app` will not work with production keys.

---

### Option: Clerk + Vercel Marketplace Integration

[Vercel Marketplace → Clerk](https://vercel.com/marketplace/clerk) automatically provisions a Clerk app and syncs API keys to your Vercel project. Use this for the simplest setup.

---

## Database (Neon)

Ensure `DATABASE_URL` and `DIRECT_URL` are set in Vercel. See `.env.example` for variable names.
