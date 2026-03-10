"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
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

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoaded, signUp, setActive } = useSignUp()
  const email = searchParams.get("email") ?? ""
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!email && isLoaded) {
      router.replace("/sign-up")
    }
  }, [email, isLoaded, router])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded || !signUp) return
    setError(null)
    setLoading(true)
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      })
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        router.push("/")
        router.refresh()
        return
      }
      setError("Verification could not be completed.")
    } catch (err) {
      const msg =
        err && typeof err === "object" && "errors" in err
          ? (err as { errors: Array<{ message?: string }> }).errors?.[0]?.message
          : "Invalid or expired code."
      setError(msg ?? "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <Card className="w-full max-w-md border-border bg-card">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (!email) {
    return null
  }

  return (
    <Card className="w-full max-w-md border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Verify your email</CardTitle>
        <CardDescription className="text-muted-foreground">
          We sent a code to <span className="font-medium text-foreground">{email}</span>. Enter it below.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="code" className="text-foreground">
              Verification code
            </Label>
            <Input
              id="code"
              type="text"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
              autoComplete="one-time-code"
              className="border-border bg-input text-foreground font-mono text-center tracking-widest"
              maxLength={6}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={loading || code.length < 6}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying…
              </>
            ) : (
              "Verify"
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/sign-up" className="text-primary hover:underline">
              Use a different email
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
