"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { Clock, CalendarIcon, ArrowRight } from "lucide-react";

interface Appointment {
  id: number;
  practitionerName: string;
  date: Date;
  time: string;
  format: string;
}

export default function CustomerHomePage() {
  const [nextAppointment, setNextAppointment] = useState<Appointment | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    // Demo appointment
    setNextAppointment({
      id: 1,
      practitionerName: "Dr. Jane Smith",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: "10:00 AM",
      format: "Video Call",
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 bg-[#FFF5E6] h-screen">
      <h1 className="text-3xl font-bold text-[#2C1D14] mb-8">Welcome Back!</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {nextAppointment && (
            <Card className="border-[#DCAB90]">
              <CardHeader>
                <CardTitle className="text-xl text-[#2C1D14]">
                  Next Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[#2C1D14]">
                        {nextAppointment.practitionerName}
                      </h3>
                      <div className="flex items-center mt-2 text-[#B78160]">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>{nextAppointment.date.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center mt-1 text-[#B78160]">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{nextAppointment.time}</span>
                      </div>
                    </div>
                    <Button className="bg-[#B78160] text-white hover:bg-[#BE8B69]">
                      Join Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-[#DCAB90]">
            <CardHeader>
              <CardTitle className="text-xl text-[#2C1D14]">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="justify-between border-[#DCAB90]"
                >
                  <Link href="/book">
                    Book New Session <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="justify-between border-[#DCAB90]"
                >
                  <Link href="/appointments">
                    View All Appointments{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="justify-between border-[#DCAB90]"
                >
                  <Link href="/resources">
                    Browse Resources <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#DCAB90]">
          <CardHeader>
            <CardTitle className="text-xl text-[#2C1D14]">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              required={true}
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-[#DCAB90]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
