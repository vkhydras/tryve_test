import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function TherapistQuizStep4() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Therapist Profile - Step 4</CardTitle>
          <CardDescription>Sexual orientation and gender</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="orientation" className="text-sm font-medium">Sexual Orientation</label>
              <Select>
                <SelectTrigger id="orientation">
                  <SelectValue placeholder="Select your sexual orientation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heterosexual">Heterosexual</SelectItem>
                  <SelectItem value="homosexual">Homosexual</SelectItem>
                  <SelectItem value="bisexual">Bisexual</SelectItem>
                  <SelectItem value="pansexual">Pansexual</SelectItem>
                  <SelectItem value="asexual">Asexual</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="gender" className="text-sm font-medium">Gender Identity</label>
              <Select>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select your gender identity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="transgender">Transgender</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/quiz/therapist/step3">Back</Link>
              </Button>
              <Button asChild>
                <Link href="/quiz/therapist/step5">Next</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

