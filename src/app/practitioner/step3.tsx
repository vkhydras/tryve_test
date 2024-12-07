import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function TherapistQuizStep3() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Therapist Profile - Step 3</CardTitle>
          <CardDescription>Language, culture, and religion</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-medium">Primary Language</label>
              <Select>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select your primary language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="mandarin">Mandarin</SelectItem>
                  <SelectItem value="arabic">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="culture" className="text-sm font-medium">Cultural Background</label>
              <Input id="culture" placeholder="Describe your cultural background" />
            </div>
            <div className="space-y-2">
              <label htmlFor="religion" className="text-sm font-medium">Religion (Optional)</label>
              <Select>
                <SelectTrigger id="religion">
                  <SelectValue placeholder="Select your religion (if applicable)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="christianity">Christianity</SelectItem>
                  <SelectItem value="islam">Islam</SelectItem>
                  <SelectItem value="hinduism">Hinduism</SelectItem>
                  <SelectItem value="buddhism">Buddhism</SelectItem>
                  <SelectItem value="judaism">Judaism</SelectItem>
                  <SelectItem value="sikhism">Sikhism</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="none">None/Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/quiz/therapist/step2">Back</Link>
              </Button>
              <Button asChild>
                <Link href="/quiz/therapist/step4">Next</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

