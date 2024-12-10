"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookingDialog } from "./booking-dialog";

interface Practitioner {
  id: string;
  name: string;
  image: string;
  bio: string;
  specialties: string[];
  yearsOfExperience: number;
  sessionRate: number;
  clinic: string;
  country: string;
  availability: {
    [date: string]: { start: string; end: string; price: number }[];
  };
}

const practitioners: Practitioner[] = [
  {
    id: "1",
    name: "Dr. Jane Smith",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Experienced therapist specializing in anxiety and depression. I use a combination of cognitive-behavioral therapy and mindfulness techniques to help my clients overcome their challenges and lead more fulfilling lives.",
    specialties: ["Anxiety", "Depression", "Stress Management"],
    yearsOfExperience: 15,
    sessionRate: 150,
    clinic: "Mindful Wellness Center",
    country: "United States",
    availability: {
      "2023-07-15": [
        { start: "09:00", end: "10:00", price: 100 },
        { start: "10:00", end: "11:00", price: 100 },
        { start: "14:00", end: "15:00", price: 100 },
      ],
      "2023-07-16": [
        { start: "11:00", end: "12:00", price: 100 },
        { start: "13:00", end: "14:00", price: 100 },
        { start: "15:00", end: "16:00", price: 100 },
      ],
    },
  },
  {
    id: "2",
    name: "Dr. John Doe",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Cognitive Behavioral Therapy expert with 10 years of experience. I specialize in helping clients overcome trauma and improve their relationships through evidence-based practices and a compassionate approach.",
    specialties: ["CBT", "Trauma", "Relationship Issues"],
    yearsOfExperience: 10,
    sessionRate: 130,
    clinic: "Harmony Therapy Institute",
    country: "Canada",
    availability: {
      "2023-07-15": [
        { start: "10:00", end: "11:00", price: 100 },
        { start: "11:00", end: "12:00", price: 100 },
        { start: "16:00", end: "17:00", price: 100 },
      ],
      "2023-07-16": [
        { start: "09:00", end: "10:00", price: 100 },
        { start: "14:00", end: "15:00", price: 100 },
        { start: "17:00", end: "18:00", price: 100 },
      ],
    },
  },
];

export default function MatchedTherapistsPage() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (token && storedUser && !hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);
  const [selectedPractitioner, setSelectedPractitioner] =
    useState<Practitioner | null>(null);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-teal-800 text-center">
        Matched Therapists
      </h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {practitioners.map((practitioner) => (
          <Card key={practitioner.id} className="bg-white shadow-lg">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={practitioner.image} alt={practitioner.name} />
                <AvatarFallback>{practitioner.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-2xl mb-2">
                  {practitioner.name}
                </CardTitle>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-2">
                  {practitioner.specialties.map((specialty) => (
                    <Badge
                      key={specialty}
                      variant="secondary"
                      className="bg-teal-100 text-teal-800"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {practitioner.yearsOfExperience} years of experience
                </p>
                <p className="text-sm text-gray-600">
                  ${practitioner.sessionRate} per session
                </p>
                <p className="text-sm text-gray-600">
                  {practitioner.clinic}, {practitioner.country}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6 leading-relaxed line-clamp-3">
                {practitioner.bio}
              </p>
              <div className="flex justify-between items-center">
                <Button
                  onClick={() => setSelectedPractitioner(practitioner)}
                  className="bg-teal-600 hover:bg-teal-700 text-white py-2 text-lg"
                >
                  Book Session
                </Button>
                <Link href={`/practitioner/${practitioner.id}`} passHref>
                  <Button
                    variant="outline"
                    className="text-teal-600 border-teal-600 hover:bg-teal-50"
                  >
                    Read More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedPractitioner && (
        <BookingDialog
          practitioner={selectedPractitioner}
          onClose={() => setSelectedPractitioner(null)}
        />
      )}
    </div>
  );
}
