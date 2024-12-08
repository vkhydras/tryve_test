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
    setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form refresh on submit
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto bg-teal-50 border border-teal-200 shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-teal-700 font-semibold text-2xl">
            Therapist Profile - Step 5
          </CardTitle>
          <CardDescription className="text-teal-600">
            Specialties and Practitioner Type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            {/* Specialties Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-teal-700">
                Specialties (Select all that apply)
              </label>
              <div className="relative">
                <Input
                  value={specialtyInput}
                  onChange={(e) => setSpecialtyInput(e.target.value)}
                  placeholder="Search and select specialties"
                  className="border-teal-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
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
                          className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                          onClick={() => handleAddSpecialty(specialty)}
                        >
                          {specialty}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSpecialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="outline"
                    className="bg-teal-100 text-teal-700"
                  >
                    {specialty}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0 text-teal-700 hover:bg-teal-200"
                      onClick={() => handleRemoveSpecialty(specialty)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Practitioner Type Section */}
            <div className="space-y-3">
              <label
                htmlFor="practitioner-type"
                className="text-sm font-medium text-teal-700"
              >
                Practitioner Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {practitionerTypes.map((type) => (
                  <Button
                    key={type}
                    variant={
                      selectedPractitioner === type ? "default" : "outline"
                    }
                    className={`justify-start text-teal-700 hover:bg-teal-100 focus:ring-2 focus:ring-teal-500 ${
                      selectedPractitioner === type ? "bg-teal-200" : ""
                    }`}
                    onClick={() => setSelectedPractitioner(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" asChild>
                <Link href="step4" className="text-teal-700 hover:bg-teal-100">
                  Back
                </Link>
              </Button>
              <Button asChild>
                <Link
                  href="/appointments"
                  className="bg-teal-600 text-white hover:bg-teal-700"
                >
                  Finish
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
