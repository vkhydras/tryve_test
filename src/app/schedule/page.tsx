"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Availability = {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
};

export default function PractitionerSchedulePage() {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("17:00");
  const [timeZone, setTimeZone] = useState("UTC");

  const addAvailability = () => {
    if (selectedDate) {
      const newAvailability: Availability = {
        id: Date.now().toString(),
        date: selectedDate,
        startTime,
        endTime,
      };
      setAvailabilities([...availabilities, newAvailability]);
    }
  };

  const removeAvailability = (id: string) => {
    setAvailabilities(availabilities.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-teal-50 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-teal-800">
            Set Your Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Start Time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <SelectItem
                      key={hour}
                      value={`${hour.toString().padStart(2, "0")}:00`}
                    >
                      {`${hour.toString().padStart(2, "0")}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="End Time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <SelectItem
                      key={hour}
                      value={`${hour.toString().padStart(2, "0")}:00`}
                    >
                      {`${hour.toString().padStart(2, "0")}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={addAvailability}
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
            <div>
              <Select value={timeZone} onValueChange={setTimeZone}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select Time Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">
                    Pacific Time
                  </SelectItem>
                  {/* Add more time zones as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              {availabilities.map((availability) => (
                <Card key={availability.id} className="p-4 bg-white shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-teal-700">
                        {format(availability.date, "MMMM d, yyyy")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {availability.startTime} - {availability.endTime}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAvailability(availability.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
