import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";

export default function ViewAnswers() {
  const quizAnswers = {
    language: ["English", "Spanish"],
    age: "30",
    timezone: "PST",
    culture: ["Western", "Hispanic"],
    orientation: "Heterosexual",
    gender: "Male",
    concerns: ["Anxiety", "Depression", "Stress"],
    practitionerType: "Psychologist",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Your Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(quizAnswers).map(([key, value]) => (
              <div
                key={key}
                className="bg-gray-100 rounded-lg p-3 shadow-sm relative"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold capitalize text-sm">
                    {key}:
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="absolute top-1 right-1 h-6 w-6"
                  >
                    <Link
                      href={`/customer/step${getStepNumber(key)}?editing=true`}
                    >
                      <Pencil className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {Array.isArray(value) ? (
                    value.map((item, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {item}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      {value}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button asChild className="w-full mt-6">
            <Link href="/settings">Back to Settings</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function getStepNumber(key: string): number {
  switch (key) {
    case "language":
    case "culture":
      return 1;
    case "age":
    case "timezone":
      return 2;
    case "orientation":
    case "gender":
      return 4;
    case "concerns":
    case "practitionerType":
      return 5;
    default:
      return 1;
  }
}
