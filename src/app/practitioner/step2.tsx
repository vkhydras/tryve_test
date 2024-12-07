import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function TherapistQuizStep2() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Therapist Profile - Step 2</CardTitle>
          <CardDescription>Your age and time zone</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-medium">Age</label>
              <Input id="age" type="number" placeholder="Enter your age" />
            </div>
            <div className="space-y-2">
              <label htmlFor="timezone" className="text-sm font-medium">Time Zone</label>
              <Select>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select your time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                  <SelectItem value="cet">Central European Time (CET)</SelectItem>
                  <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/quiz/therapist/step1">Back</Link>
              </Button>
              <Button asChild>
                <Link href="/quiz/therapist/step3">Next</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

