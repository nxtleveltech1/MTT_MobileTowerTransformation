import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'MTT - Mobile Tower Transformation',
  description: 'Mobile Tower Transformation — monitoring and analytics for telecom operators',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const publishableKey = (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "").trim()
  const hasClerkKey = publishableKey.length > 0
  const keyMaybeTruncated = hasClerkKey && publishableKey.length < 50
  const isProd = process.env.NODE_ENV === "production"
  const clerkKeyMessage = !hasClerkKey
    ? isProd
      ? "Clerk key not configured. Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to Vercel environment variables and redeploy."
      : "Clerk key not loaded. Restart the dev server so Next.js picks up .env.local."
    : keyMaybeTruncated
      ? isProd
        ? "Clerk publishable key may be truncated. Add the full key from Clerk Dashboard to Vercel env vars."
        : "Publishable key may be truncated. Copy the full key from Clerk Dashboard into .env.local."
      : null

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      dynamic
      unsafe_disableDevelopmentModeConsoleWarning
      appearance={{
        variables: {
          colorPrimary: "oklch(0.7 0.15 160)",
          colorBackground: "oklch(0.09 0 0)",
          colorInputBackground: "oklch(0.12 0 0)",
          colorInputText: "oklch(0.95 0 0)",
          borderRadius: "0.5rem",
        },
      }}
    >
      <html lang="en">
        <body className="font-sans antialiased" suppressHydrationWarning>
          {clerkKeyMessage && (
            <div className="bg-amber-500/10 text-amber-800 dark:text-amber-200 border-b border-amber-500/20 px-4 py-2 text-center text-xs">
              {clerkKeyMessage}
            </div>
          )}
          {children}
          <Toaster />
          <Analytics debug={false} />
        </body>
      </html>
    </ClerkProvider>
  )
}
