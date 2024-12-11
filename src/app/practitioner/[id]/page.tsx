"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookingDialog } from "@/app/book/booking-dialog";
import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Award,
  Briefcase,
} from "lucide-react";

const practitioners = [
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
    education: [
      {
        degree: "Ph.D. in Clinical Psychology",
        institution: "Stanford University",
        year: 2005,
      },
      {
        degree: "M.A. in Psychology",
        institution: "University of California, Berkeley",
        year: 2001,
      },
    ],
    languages: ["English", "Spanish"],
    approach:
      "I believe in a holistic approach to mental health, combining evidence-based practices with mindfulness and compassion-focused techniques. My goal is to create a safe, non-judgmental space where clients can explore their thoughts and feelings, develop coping strategies, and work towards personal growth and healing.",
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
    education: [
      {
        degree: "Psy.D. in Clinical Psychology",
        institution: "University of Toronto",
        year: 2010,
      },
      {
        degree: "B.Sc. in Psychology",
        institution: "McGill University",
        year: 2005,
      },
    ],
    languages: ["English", "French"],
    approach:
      "As a CBT specialist, I focus on helping clients identify and change negative thought patterns and behaviors. I believe in creating a collaborative therapeutic relationship where we work together to develop practical strategies for managing symptoms and improving overall well-being.",
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

export default function PractitionerPage() {
  const { id } = useParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const practitioner = practitioners.find((p) => p.id === id);

  if (!practitioner) {
    return (
      <div className="container mx-auto py-12 px-4 text-center text-[#2C1D14]">
        Practitioner not found
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 bg-[#FFF5E6] mt-20">
      <Card className="bg-white shadow-lg max-w-4xl mx-auto border-[#DCAB90]">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={practitioner.image} alt={practitioner.name} />
            <AvatarFallback>{practitioner.name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl mb-2 text-[#2C1D14]">
              {practitioner.name}
            </CardTitle>
            <div className="flex flex-wrap gap-2 mb-2">
              {practitioner.specialties.map((specialty: string) => (
                <Badge
                  key={specialty}
                  variant="secondary"
                  className="bg-[#EBBBA5] text-[#2C1D14]"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-[#B78160] mb-1">
              <Briefcase className="w-4 h-4 mr-2" />
              <span>{practitioner.yearsOfExperience} years of experience</span>
            </div>
            <div className="flex items-center text-[#B78160] mb-1">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>${practitioner.sessionRate} per session</span>
            </div>
            <div className="flex items-center text-[#B78160]">
              <MapPin className="w-4 h-4 mr-2" />
              <span>
                {practitioner.clinic}, {practitioner.country}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#2C1D14]">About Me</h2>
            <p className="text-[#2C1D14] leading-relaxed">{practitioner.bio}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#2C1D14]">
              My Approach
            </h2>
            <p className="text-[#2C1D14] leading-relaxed">
              {practitioner.approach}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#2C1D14]">
              Education
            </h2>
            <ul className="space-y-2">
              {practitioner.education.map((edu, index) => (
                <li key={index} className="flex items-start">
                  <Award className="w-5 h-5 mr-2 text-[#B78160] mt-1" />
                  <div>
                    <p className="font-semibold text-[#2C1D14]">{edu.degree}</p>
                    <p className="text-[#B78160]">
                      {edu.institution}, {edu.year}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#2C1D14]">
              Languages
            </h2>
            <p className="text-[#2C1D14]">
              {practitioner.languages.join(", ")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#2C1D14]">
              Specialties
            </h2>
            <ul className="list-disc list-inside">
              {practitioner.specialties.map((specialty: string) => (
                <li key={specialty} className="text-[#2C1D14]">
                  {specialty}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#2C1D14]">
              Availability
            </h2>
            {Object.entries(practitioner.availability).map(([date, slots]) => (
              <div key={date} className="mb-4">
                <h3 className="font-bold text-lg mb-2 text-[#2C1D14]">
                  <Calendar className="w-5 h-5 inline-block mr-2 text-[#B78160]" />
                  {date}
                </h3>
                <ul className="space-y-1">
                  {slots.map((slot, index) => (
                    <li
                      key={index}
                      className="text-[#2C1D14] flex items-center"
                    >
                      <Clock className="w-4 h-4 mr-2 text-[#B78160]" />
                      {slot.start} - {slot.end}
                      <span className="ml-2 text-[#B78160]">
                        (${slot.price})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <Button
            onClick={() => setIsBookingOpen(true)}
            className="w-full bg-[#B78160] hover:bg-[#BE8B69] text-white py-2 text-lg"
          >
            Book Session
          </Button>
        </CardContent>
      </Card>
      {isBookingOpen && (
        <BookingDialog
          practitioner={practitioner}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}
