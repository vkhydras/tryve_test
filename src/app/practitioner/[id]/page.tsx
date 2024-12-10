"use client";

import { useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookingDialog } from '@/app/book/booking-dialog';
import { useState } from 'react';

const practitioners = [
  {
    id: '1',
    name: 'Dr. John Doe',
    image: '/images/john-doe.jpg',
    specialties: ['Cardiology', 'Internal Medicine'],
    yearsOfExperience: 15,
    sessionRate: 200,
    clinic: 'Health Clinic',
    country: 'USA',
    bio: 'Dr. John Doe is a highly experienced cardiologist...',
    availability: {
      '2023-10-01': [
        { start: '09:00', end: '10:00', price: 200 },
        { start: '10:00', end: '11:00', price: 200 },
      ],
      '2023-10-02': [
        { start: '11:00', end: '12:00', price: 200 },
        { start: '12:00', end: '13:00', price: 200 },
      ],
    },
  },
];

export default function PractitionerPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const practitioner = practitioners.find((p) => p.id === id);

  if (!practitioner) {
    return <div>Practitioner not found</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="bg-white shadow-lg max-w-4xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={practitioner.image} alt={practitioner.name} />
            <AvatarFallback>{practitioner.name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl mb-2">
              {practitioner.name}
            </CardTitle>
            <div>
              {practitioner.specialties.map((specialty: string) => (
                <Badge key={specialty} variant="secondary" className="bg-teal-100 text-teal-800">
                  {specialty}
                </Badge>
              ))}
            </div>
            <p className="text-gray-600">
              {practitioner.yearsOfExperience} years of experience
            </p>
            <p className="text-gray-600">
              ${practitioner.sessionRate} per session
            </p>
            <p className="text-gray-600">
              {practitioner.clinic}, {practitioner.country}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-teal-800">About Me</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {practitioner.bio}
          </p>
          <h2 className="text-2xl font-bold mb-4 text-teal-800">Specialties</h2>
          <ul className="list-disc list-inside mb-6">
            {practitioner.specialties.map((specialty: string) => (
              <li key={specialty} className="text-gray-700">{specialty}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold mb-4 text-teal-800">Availability</h2>
          {Object.entries(practitioner.availability).map(([date, slots]) => (
            <div key={date} className="mb-4">
              <h3 className="font-bold text-lg mb-2">{date}</h3>
              <ul>
                {slots.map((slot, index) => (
                  <li key={index} className="text-gray-700">
                    {slot.start} - {slot.end} (${slot.price})
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Button
            onClick={() => setIsBookingOpen(true)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 text-lg"
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

