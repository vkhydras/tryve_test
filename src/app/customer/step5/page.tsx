"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const areasOfConcern = [
  "Anxiety",
  "Depression",
  "Trauma and PTSD",
  "Relationship Issues",
  "Stress Management",
  "Addiction",
  "Eating Disorders",
  "Grief",
  "Self-Esteem",
  "Anger Management",
  "Bipolar Disorder",
  "Career Counseling",
  "Child or Adolescent Issues",
  "Chronic Pain",
  "Codependency",
  "Coping Skills",
  "Divorce",
  "Domestic Abuse",
  "Family Conflicts",
  "Gambling",
  "Identity Issues",
  "Infertility",
  "Life Transitions",
  "Marital and Premarital",
  "Obsessive-Compulsive (OCD)",
  "Parenting",
  "Personality Disorders",
  "Phobias",
  "Pregnancy, Prenatal, Postpartum",
  "School Issues",
  "Self-Harming",
  "Sexual Abuse",
  "Sleep or Insomnia",
  "Spirituality",
  "Substance Abuse",
  "Suicidal Ideation",
  "Weight Loss",
  "Women's Issues",
  "Men's Issues",
  "LGBTQ+ Issues",
];

const practitionerTypes = [
  { type: "Psychologist", price: "$150" },
  { type: "Psychiatrist", price: "$200" },
  { type: "Counselor", price: "$100" },
  { type: "Coach", price: "$80" },
];

export default function CustomerQuizStep5() {
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [concernInput, setConcernInput] = useState("");
  const [selectedPractitioner, setSelectedPractitioner] = useState<
    string | null
  >(null);

  const handleAddConcern = (concern: string) => {
    if (!selectedConcerns.includes(concern)) {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
    setConcernInput("");
  };

  const handleRemoveConcern = (concern: string) => {
    setSelectedConcerns(selectedConcerns.filter((c) => c !== concern));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-teal-50">
      <Card className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-teal-800">
            Find Your Therapist - Step 5
          </CardTitle>
          <CardDescription className="text-teal-600">
            What do you need help with?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Areas of Concern Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-teal-700">
                Areas of Concern (Select all that apply)
              </label>
              <div className="relative">
                <Input
                  value={concernInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setConcernInput(e.target.value)
                  }
                  placeholder="Search and select areas of concern"
                  className="border-teal-300 focus:ring-teal-500"
                />
                {concernInput && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {areasOfConcern
                      .filter((concern) =>
                        concern
                          .toLowerCase()
                          .includes(concernInput.toLowerCase())
                      )
                      .map((concern) => (
                        <div
                          key={concern}
                          className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                          onClick={() => handleAddConcern(concern)}
                        >
                          {concern}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedConcerns.map((concern) => (
                  <Badge
                    key={concern}
                    variant="secondary"
                    className="bg-teal-100 text-teal-700"
                  >
                    {concern}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={() => handleRemoveConcern(concern)}
                    >
                      <X className="h-3 w-3 text-teal-700" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Preferred Practitioner Type Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-teal-700">
                Preferred Practitioner Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {practitionerTypes.map((practitioner) => (
                  <Button
                    key={practitioner.type}
                    type="button"
                    variant={
                      selectedPractitioner === practitioner.type
                        ? "default"
                        : "outline"
                    }
                    className={`justify-start ${
                      selectedPractitioner === practitioner.type
                        ? "bg-teal-600 text-white border-teal-600"
                        : "text-teal-600 border-teal-300"
                    } hover:bg-teal-100`}
                    onClick={() => setSelectedPractitioner(practitioner.type)}
                  >
                    {practitioner.type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                className="text-teal-600 border-teal-600 hover:bg-teal-100"
                asChild
              >
                <Link href="/customer/step4">Back</Link>
              </Button>
              <Button
                type="button"
                className="bg-teal-600 text-white hover:bg-teal-700"
                asChild
              >
                <Link href="/">Finish</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practitioner Type Boxes - at the bottom of the page and larger */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {practitionerTypes.map((practitioner) => (
          <div
            key={practitioner.type}
            className={`p-6 rounded-lg border-2 ${
              selectedPractitioner === practitioner.type
                ? "border-teal-600 bg-teal-100"
                : "border-gray-200"
            } transition duration-300 cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();
              setSelectedPractitioner(practitioner.type);
            }}
          >
            <h3 className="text-xl font-semibold text-teal-800">
              {practitioner.type}
            </h3>
            <p
              className={`text-sm mt-2 ${
                selectedPractitioner === practitioner.type
                  ? "text-teal-600 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {practitioner.price}/session
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
