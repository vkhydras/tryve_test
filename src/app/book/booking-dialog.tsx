"use client";

import { useState } from "react";
import { format } from "date-fns";
import { X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Practitioner {
  id: string;
  name: string;
  availability: {
    [date: string]: { start: string; end: string; price: number }[];
  };
}

interface BookingDialogProps {
  practitioner: Practitioner;
  onClose: () => void;
}

type SessionFormat = "in-person" | "online" | "group" | "workshop";

export function BookingDialog({ practitioner, onClose }: BookingDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const router = useRouter();
  const [sessionFormat, setSessionFormat] =
    useState<SessionFormat>("in-person");

  // Add demo sessions for December 1st and 20th
  const demoAvailability = {
    "2024-12-01": [
      { start: "10:00 AM", end: "11:00 AM", price: 50 },
      { start: "2:00 PM", end: "3:00 PM", price: 60 },
    ],
    "2024-12-20": [
      { start: "9:00 AM", end: "10:00 AM", price: 55 },
      { start: "11:00 AM", end: "12:00 PM", price: 65 },
      { start: "1:00 PM", end: "2:00 PM", price: 70 },
    ],
  };

  const combinedAvailability = {
    ...practitioner.availability,
    ...demoAvailability,
  };

  // Helper function to check if a date has available sessions
  const hasAvailableSessions = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return Boolean(
      (
        combinedAvailability as Record<
          string,
          { start: string; end: string; price: number }[]
        >
      )[dateStr]?.length
    );
  };

  const availableSessions = selectedDate
    ? (
        combinedAvailability as Record<
          string,
          { start: string; end: string; price: number }[]
        >
      )[format(selectedDate, "yyyy-MM-dd")]
    : undefined;

  const handleBooking = async () => {
    return router.push("/book/success");
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl p-0 w-full max-w-[95vw] max-h-[95vh] overflow-y-auto bg-[#FFF5E6]">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <X className="h-4 w-4 text-[#2C1D14]" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-[#2C1D14]">
            Book a Session with {practitioner.name}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
          <div className="sm:col-span-2 w-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-[#DCAB90] w-full"
              disabled={(date) => !hasAvailableSessions(date)}
              modifiers={{
                available: (date) => hasAvailableSessions(date),
              }}
              modifiersStyles={{
                available: { fontWeight: "bold", color: "#B78160" },
              }}
            />
          </div>
          <div className="w-full">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium text-[#2C1D14]">
                  Session Format
                </h3>
                <select
                  value={sessionFormat}
                  onChange={(e) =>
                    setSessionFormat(e.target.value as SessionFormat)
                  }
                  className="w-full p-2 border rounded-md border-[#DCAB90] text-[#2C1D14] bg-white"
                >
                  <option value="in-person">In-person therapy</option>
                  <option value="online">Online therapy</option>
                  <option value="group">Group sessions</option>
                  <option value="workshop">Workshops or events</option>
                </select>
              </div>
            </div>
            {availableSessions ? (
              <div className="mt-4">
                <h3 className="mb-2 font-medium text-[#2C1D14]">
                  Available Sessions
                </h3>
                <div className="grid gap-2">
                  {availableSessions.map((session) => (
                    <div
                      key={`${session.start}-${session.end}`}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 border rounded-md border-[#DCAB90] text-[#2C1D14] space-y-2 sm:space-y-0 bg-white"
                    >
                      <span className="text-sm">{`${session.start} - ${session.end}`}</span>
                      <span className="text-sm">${session.price}</span>
                      <Button
                        onClick={() => handleBooking()}
                        className="bg-[#B78160] hover:bg-[#BE8B69] text-white w-full sm:w-auto"
                      >
                        Book
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[#2C1D14] mt-4 text-sm">
                {selectedDate
                  ? "No sessions available for selected date."
                  : "Please select a date."}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
