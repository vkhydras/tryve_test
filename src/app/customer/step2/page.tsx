import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function CustomerQuizStep2() {
  return (
    <div className="container mx-auto px-4 py-8 bg-teal-50 ">
      <Card className="max-w-2xl mx-auto border border-teal-500 shadow-lg rounded-xl">
        <CardHeader className="bg-teal-500 text-white p-4 rounded-t-xl">
          <CardTitle>Find Your Therapist - Step 2</CardTitle>
          <CardDescription>Your age and time zone</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-6">
            <div className="space-y-4">
              <label
                htmlFor="age"
                className="text-sm font-semibold text-teal-700"
              >
                Age
              </label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                className="border-2 border-teal-500 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="timezone"
                className="text-sm font-semibold text-teal-700"
              >
                Time Zone
              </label>
              <Select>
                <SelectTrigger
                  id="timezone"
                  className="border-2 border-teal-500"
                >
                  <SelectValue placeholder="Select your time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">
                    Pacific Standard Time (PST)
                  </SelectItem>
                  <SelectItem value="est">
                    Eastern Standard Time (EST)
                  </SelectItem>
                  <SelectItem value="cet">
                    Central European Time (CET)
                  </SelectItem>
                  <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                className="bg-teal-500 text-white hover:bg-teal-600"
                asChild
              >
                <Link href="/customer/step1">Back</Link>
              </Button>
              <Button
                className="bg-teal-500 text-white hover:bg-teal-600"
                asChild
              >
                <Link href="/customer/step3">Next</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
