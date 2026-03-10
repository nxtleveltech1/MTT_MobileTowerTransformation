import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CellTower Monitor - Network Operations Center',
  description: 'Cellular tower traffic monitoring and analytics platform for telecom operators',
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

  return (
    <ClerkProvider publishableKey={publishableKey} dynamic unsafe_disableDevelopmentModeConsoleWarning>
      <html lang="en">
        <body className="font-sans antialiased" suppressHydrationWarning>
          {!hasClerkKey && (
            <div className="bg-amber-500/10 text-amber-800 dark:text-amber-200 border-b border-amber-500/20 px-4 py-2 text-center text-xs">
              Clerk key not loaded in this process. Restart the dev server so Next.js picks up .env.local.
            </div>
          )}
          {keyMaybeTruncated && (
            <div className="bg-amber-500/10 text-amber-800 dark:text-amber-200 border-b border-amber-500/20 px-4 py-2 text-center text-xs">
              Publishable key may be truncated (under 50 chars). Copy the full key from Clerk Dashboard into .env.local.
            </div>
          )}
          {children}
          <Analytics debug={false} />
        </body>
      </html>
    </ClerkProvider>
  )
}
