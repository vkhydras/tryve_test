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

const languages = [
  "English",
  "Spanish",
  "French",
  "Mandarin",
  "Arabic",
  "Hindi",
  "Bengali",
  "Portuguese",
  "Russian",
  "Japanese",
  "German",
  "Korean",
  "Vietnamese",
  "Italian",
  "Turkish",
  "Polish",
  "Ukrainian",
];

const cultures = [
  "Western",
  "Eastern",
  "African",
  "Latin American",
  "Middle Eastern",
  "South Asian",
  "East Asian",
  "Southeast Asian",
  "Nordic",
  "Mediterranean",
  "Slavic",
  "Celtic",
  "Germanic",
  "Anglo-Saxon",
  "Latinx",
  "Afro-Caribbean",
  "Indigenous American",
  "Pacific Islander",
  "Australasian",
  "Scandinavian",
  "Balkan",
  "Baltic",
  "Caucasian",
  "Central Asian",
  "Polynesian",
  "Melanesian",
  "Micronesian",
  "Andean",
  "Amazonian",
  "Saharan",
  "Sub-Saharan",
  "North African",
  "West African",
  "East African",
  "Southern African",
  "Central African",
  "Caribbean",
  "Iberian",
  "Hellenic",
  "Roman",
  "Byzantine",
  "Ottoman",
  "Persian",
  "Arab",
  "Jewish",
  "Sikh",
  "Hindu",
  "Buddhist",
  "Confucian",
  "Taoist",
  "Shinto",
];

const religions = [
  "Christianity",
  "Islam",
  "Hinduism",
  "Buddhism",
  "Judaism",
  "Sikhism",
  "Taoism",
  "Shinto",
  "Confucianism",
  "Baháʼí Faith",
  "Jainism",
  "Zoroastrianism",
  "Traditional African Religions",
  "Native American Religions",
];

export default function CustomerQuizStep3() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState("");
  const [culturalBackground, setCulturalBackground] = useState<string[]>([]);
  const [cultureInput, setCultureInput] = useState("");
  const [selectedReligions, setSelectedReligions] = useState<string[]>([]);
  const [religionInput, setReligionInput] = useState("");

  const handleAddLanguage = (lang: string) => {
    if (!selectedLanguages.includes(lang)) {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
    setLanguageInput("");
  };

  const handleRemoveLanguage = (lang: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
  };

  const handleAddCulture = (culture: string) => {
    if (!culturalBackground.includes(culture)) {
      setCulturalBackground([...culturalBackground, culture]);
    }
    setCultureInput("");
  };

  const handleRemoveCulture = (culture: string) => {
    setCulturalBackground(culturalBackground.filter((c) => c !== culture));
  };

  const handleAddReligion = (religion: string) => {
    if (!selectedReligions.includes(religion)) {
      setSelectedReligions([...selectedReligions, religion]);
    }
    setReligionInput("");
  };

  const handleRemoveReligion = (religion: string) => {
    setSelectedReligions(selectedReligions.filter((r) => r !== religion));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Find Your Therapist - Step 3</CardTitle>
          <CardDescription>Language, culture, and religion</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-medium">
                Preferred Languages
              </label>
              <div className="relative">
                <Input
                  id="language"
                  value={languageInput}
                  onChange={(e) => setLanguageInput(e.target.value)}
                  placeholder="Search and select languages"
                />
                {languageInput && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {languages
                      .filter((lang) =>
                        lang.toLowerCase().includes(languageInput.toLowerCase())
                      )
                      .map((lang) => (
                        <div
                          key={lang}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleAddLanguage(lang)}
                        >
                          {lang}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedLanguages.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={() => handleRemoveLanguage(lang)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="culture" className="text-sm font-medium">
                Cultural Background
              </label>
              <div className="relative">
                <Input
                  id="culture"
                  value={cultureInput}
                  onChange={(e) => setCultureInput(e.target.value)}
                  placeholder="Search and select cultural backgrounds"
                />
                {cultureInput && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {cultures
                      .filter((culture) =>
                        culture
                          .toLowerCase()
                          .includes(cultureInput.toLowerCase())
                      )
                      .map((culture) => (
                        <div
                          key={culture}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleAddCulture(culture)}
                        >
                          {culture}
                        </div>
                      ))}
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleAddCulture(cultureInput)}
                    >
                      Add "{cultureInput}"
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {culturalBackground.map((culture) => (
                  <Badge key={culture} variant="secondary">
                    {culture}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={() => handleRemoveCulture(culture)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="religion" className="text-sm font-medium">
                Religion (Optional)
              </label>
              <div className="relative">
                <Input
                  id="religion"
                  value={religionInput}
                  onChange={(e) => setReligionInput(e.target.value)}
                  placeholder="Search and select religions"
                />
                {religionInput && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {religions
                      .filter((religion) =>
                        religion
                          .toLowerCase()
                          .includes(religionInput.toLowerCase())
                      )
                      .map((religion) => (
                        <div
                          key={religion}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleAddReligion(religion)}
                        >
                          {religion}
                        </div>
                      ))}
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleAddReligion(religionInput)}
                    >
                      Add "{religionInput}"
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedReligions.map((religion) => (
                  <Badge key={religion} variant="secondary">
                    {religion}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={() => handleRemoveReligion(religion)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="step2">Back</Link>
              </Button>
              <Button asChild>
                <Link href="step4">Next</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
