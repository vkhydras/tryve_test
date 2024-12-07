import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function CustomerQuizStep5() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Find Your Therapist - Step 5</CardTitle>
          <CardDescription>What do you need help with?</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Areas of Concern (Select all that apply)</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="anxiety" />
                  <label htmlFor="anxiety">Anxiety</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="depression" />
                  <label htmlFor="depression">Depression</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="trauma" />
                  <label htmlFor="trauma">Trauma and PTSD</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="relationships" />
                  <label htmlFor="relationships">Relationship Issues</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="stress" />
                  <label htmlFor="stress">Stress Management</label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="practitioner-type" className="text-sm font-medium">Preferred Practitioner Type</label>
              <Select>
                <SelectTrigger id="practitioner-type">
                  <SelectValue placeholder="Select preferred practitioner type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="psychologist">Psychologist</SelectItem>
                  <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                  <SelectItem value="counselor">Counselor</SelectItem>
                  <SelectItem value="coach">Coach</SelectItem>
                  <SelectItem value="any">No Preference</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/quiz/customer/step4">Back</Link>
              </Button>
              <Button asChild>
                <Link href="/">Finish</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

