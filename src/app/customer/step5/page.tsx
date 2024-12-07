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
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Find Your Therapist - Step 5</CardTitle>
          <CardDescription>What do you need help with?</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Areas of Concern (Select all that apply)
              </label>
              <div className="relative">
                <Input
                  value={concernInput}
                  onChange={(e) => setConcernInput(e.target.value)}
                  placeholder="Search and select areas of concern"
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
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
                  <Badge key={concern} variant="secondary">
                    {concern}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={() => handleRemoveConcern(concern)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Preferred Practitioner Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {practitionerTypes.map((practitioner) => (
                  <Button
                    key={practitioner.type}
                    variant={
                      selectedPractitioner === practitioner.type
                        ? "default"
                        : "outline"
                    }
                    className="justify-start"
                    onClick={() => setSelectedPractitioner(practitioner.type)}
                  >
                    {practitioner.type}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {practitionerTypes.map((practitioner) => (
                <div
                  key={practitioner.type}
                  className={`p-4 rounded-lg border ${
                    selectedPractitioner === practitioner.type
                      ? "border-primary bg-primary/10"
                      : "border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold">{practitioner.type}</h3>
                  <p className="text-sm text-gray-600">
                    {practitioner.price}/session
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/customer/step4">Back</Link>
              </Button>
              <Button asChild>
                <Link href="/">Finish</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
