/**
 * Production-safe auth error messages.
 * Never show dev-only instructions (e.g. "run bun run dev") to end users.
 */

const isDev = process.env.NODE_ENV === "development"

export const CLERK_LOAD_FAILED_MESSAGE = isDev
  ? "Clerk didn't load. Restart the dev server (Ctrl+C), run bun run dev, then refresh."
  : "Authentication failed to load. Refresh the page. If it persists, ensure NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY are set in Vercel, and add your domain in Clerk Dashboard → Domains."

export const AUTH_STILL_LOADING_MESSAGE =
  "Authentication is still loading. Please refresh the page and try again."
