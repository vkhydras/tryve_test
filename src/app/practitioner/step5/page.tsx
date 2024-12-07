"use client"
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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import Link from "next/link";

const specialties = [
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
  "Psychologist (e.g., CBT, trauma therapy specialist)",
  "Psychiatrist (for medication support)",
  "Counselor (e.g., relationship counseling, grief support)",
  "Coach (e.g., life coach, wellness coach)",
];

export default function TherapistQuizStep5() {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [selectedPractitioner, setSelectedPractitioner] = useState<
    string | null
  >(null);

  const handleAddSpecialty = (specialty: string) => {
    if (!selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
    setSpecialtyInput("");
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setSelectedSpecialties(
      selectedSpecialties.filter((s) => s !== specialty)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Therapist Profile - Step 5</CardTitle>
          <CardDescription>Specialties and practitioner type</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {/* Specialties Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Specialties (Select all that apply)
              </label>
              <div className="relative">
                <Input
                  value={specialtyInput}
                  onChange={(e) => setSpecialtyInput(e.target.value)}
                  placeholder="Search and select specialties"
                />
                {specialtyInput && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {specialties
                      .filter((specialty) =>
                        specialty
                          .toLowerCase()
                          .includes(specialtyInput.toLowerCase())
                      )
                      .map((specialty) => (
                        <div
                          key={specialty}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleAddSpecialty(specialty)}
                        >
                          {specialty}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSpecialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={() => handleRemoveSpecialty(specialty)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Practitioner Type Section */}
            <div className="space-y-2">
              <label
                htmlFor="practitioner-type"
                className="text-sm font-medium"
              >
                Practitioner Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {practitionerTypes.map((type) => (
                  <Button
                    key={type}
                    variant={
                      selectedPractitioner === type ? "default" : "outline"
                    }
                    className="justify-start"
                    onClick={() => setSelectedPractitioner(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="step4">Back</Link>
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
