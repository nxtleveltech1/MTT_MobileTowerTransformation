"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
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

function SignUpForm() {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
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
    if (!isLoaded || !signUp) {
      setError("Auth is still loading. Refresh the page (button above) and try again.")
      return
    }
    setError(null)
    setLoading(true)
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: firstName.trim() || undefined,
      })
      if (signUp.status === "complete") {
        await setActive({ session: signUp.createdSessionId })
        router.push("/")
        router.refresh()
        return
      }
      if (signUp.unverifiedFields?.includes("email_address")) {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        })
        router.push("/sign-up/verify-email?email=" + encodeURIComponent(email))
        router.refresh()
        return
      }
      setError("Could not complete sign-up. Try again.")
    } catch (err) {
      const msg =
        err && typeof err === "object" && "errors" in err
          ? (err as { errors: Array<{ message?: string }> }).errors?.[0]?.message
          : "Could not create account."
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
        <CardTitle className="text-foreground">Create account</CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign up to access CellTower Monitor
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          {!isLoaded && showFormAnyway && (
            <div className="text-sm text-muted-foreground">
              <p>Clerk didn’t load. <strong>Stop the dev server</strong> (Ctrl+C), run <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bun run dev</code> again, then refresh this page.</p>
            </div>
          )}
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-foreground">
              Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Your name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              className="border-border bg-input text-foreground"
            />
          </div>
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
              minLength={8}
              autoComplete="new-password"
              className="border-border bg-input text-foreground"
            />
            <p className="text-xs text-muted-foreground">At least 8 characters</p>
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
                Creating account…
              </>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default function SignUpPage() {
  return <SignUpForm />
}
