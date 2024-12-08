import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function TherapistQuizStep4() {
  return (
    <div className="container mx-auto px-4 py-8 bg-teal-50">
      <Card className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-teal-800">
            Step 4
          </CardTitle>
          <CardDescription className="text-teal-600">
            Sexual orientation and gender
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Sexual Orientation Section */}
            <div className="space-y-2">
              <label
                htmlFor="orientation"
                className="text-sm font-medium text-teal-700"
              >
                Sexual Orientation
              </label>
              <Select>
                <SelectTrigger
                  id="orientation"
                  className="border-teal-300 focus:ring-teal-500"
                >
                  <SelectValue placeholder="Select your sexual orientation" />
                </SelectTrigger>
                <SelectContent className="bg-white opacity-100">
                  <SelectItem value="heterosexual">Heterosexual</SelectItem>
                  <SelectItem value="homosexual">Homosexual</SelectItem>
                  <SelectItem value="bisexual">Bisexual</SelectItem>
                  <SelectItem value="pansexual">Pansexual</SelectItem>
                  <SelectItem value="asexual">Asexual</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender Identity Section */}
            <div className="space-y-2">
              <label
                htmlFor="gender"
                className="text-sm font-medium text-teal-700"
              >
                Gender Identity
              </label>
              <Select>
                <SelectTrigger
                  id="gender"
                  className="border-teal-300 focus:ring-teal-500"
                >
                  <SelectValue placeholder="Select your gender identity" />
                </SelectTrigger>
                <SelectContent className="bg-white opacity-100">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="transgender">Transgender</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                className="text-teal-600 border-teal-600 hover:bg-teal-100"
                asChild
              >
                <Link href="step3">Back</Link>
              </Button>
              <Button
                className="bg-teal-600 text-white hover:bg-teal-700"
                asChild
              >
                <Link href="step5">Next</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
