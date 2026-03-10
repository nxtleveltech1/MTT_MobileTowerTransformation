import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { SignInContent } from "./sign-in-content"

function SignInFallback() {
  return (
    <Card className="w-full max-w-md border-border bg-card">
      <CardContent className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </CardContent>
    </Card>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignInContent />
    </Suspense>
  )
}
