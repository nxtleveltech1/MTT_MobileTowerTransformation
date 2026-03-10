"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const LOAD_TIMEOUT_MS = 4000

export function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect_url")
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showFormAnyway, setShowFormAnyway] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowFormAnyway(true), LOAD_TIMEOUT_MS)
    return () => clearTimeout(t)
  }, [])

  const showForm = isLoaded || showFormAnyway

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded || !signIn) {
      setError("Auth is still loading. Refresh the page (button above) and try again.")
      return
    }
    setError(null)
    setLoading(true)
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        const target = redirectUrl && redirectUrl.startsWith("/") ? redirectUrl : "/"
        router.push(target)
        router.refresh()
        return
      }
      if (result.status === "needs_first_factor") {
        setError("Check your email for a verification code, or sign in with password.")
        return
      }
      setError("Sign-in could not be completed. Check your email and password.")
    } catch (err) {
      const msg =
        err && typeof err === "object" && "errors" in err
          ? (err as { errors: Array<{ message?: string }> }).errors?.[0]?.message
          : "Invalid email or password."
      setError(msg ?? "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  if (!showForm) {
    return (
      <Card className="w-full max-w-md border-border bg-card">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Sign in</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your credentials.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          {!isLoaded && showFormAnyway && (
            <div className="text-sm text-muted-foreground">
              <p>Clerk didn't load. <strong>Stop the dev server</strong> (Ctrl+C), run <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bun run dev</code> again, then refresh this page.</p>
            </div>
          )}
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="border-border bg-input text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="border-border bg-input text-foreground"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
