import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function TherapistQuizStep1() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Therapist Profile - Step 1</CardTitle>
          <CardDescription>Tell us about yourself</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="about" className="text-sm font-medium">About You</label>
              <Textarea id="about" placeholder="Share a brief introduction about yourself and your practice" />
            </div>
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/">Back</Link>
              </Button>
              <Button asChild>
                <Link href="/quiz/therapist/step2">Next</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

