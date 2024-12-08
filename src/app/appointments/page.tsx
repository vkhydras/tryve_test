"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for sessions (same as before)
const sessions = [
  {
    id: 1,
    practitionerName: "Dr. Jane Smith",
    startTime: new Date("2023-07-10T10:00:00"),
    endTime: new Date("2023-07-10T11:00:00"),
    format: "Video Call",
    status: "upcoming",
  },
  {
    id: 2,
    practitionerName: "Dr. John Doe",
    startTime: new Date("2023-07-09T14:00:00"),
    endTime: new Date("2023-07-09T15:00:00"),
    format: "In-Person",
    status: "past",
  },
  {
    id: 3,
    practitionerName: "Dr. Emily Brown",
    startTime: new Date("2023-07-11T11:00:00"),
    endTime: new Date("2023-07-11T12:00:00"),
    format: "Phone Call",
    status: "upcoming",
  },
  {
    id: 4,
    practitionerName: "Dr. Michael Johnson",
    startTime: new Date("2023-07-08T09:00:00"),
    endTime: new Date("2023-07-08T10:00:00"),
    format: "Video Call",
    status: "canceled",
  },
];

export default function SessionsPage() {
  const [filter, setFilter] = useState("all");

  const filteredSessions = sessions.filter((session) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case "today":
        return (
          session.startTime.toDateString() === today.toDateString() &&
          session.status !== "canceled"
        );
      case "upcoming":
        return session.startTime > today && session.status !== "canceled";
      case "past":
        return session.startTime < today && session.status !== "canceled";
      case "canceled":
        return session.status === "canceled";
      default:
        return true;
    }
  });

  const renderSessions = (sessions: typeof filteredSessions) => (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card key={session.id} className="p-4 bg-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-teal-700">
                {session.practitionerName}
              </h3>
              <p className="text-sm text-gray-500">{session.format}</p>
            </div>
            <Badge
              variant={
                session.status === "upcoming"
                  ? "default"
                  : session.status === "past"
                  ? "secondary"
                  : "destructive"
              }
            >
              {session.status}
            </Badge>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            {format(session.startTime, "MMMM d, yyyy")}
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <Clock className="mr-2 h-4 w-4" />
            {format(session.startTime, "h:mm a")} -{" "}
            {format(session.endTime, "h:mm a")}
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-teal-50 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-teal-800">
            Your Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>
                All
              </TabsTrigger>
              <TabsTrigger value="today" onClick={() => setFilter("today")}>
                Today
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                onClick={() => setFilter("upcoming")}
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="past" onClick={() => setFilter("past")}>
                Past
              </TabsTrigger>
              <TabsTrigger
                value="canceled"
                onClick={() => setFilter("canceled")}
              >
                Canceled
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {renderSessions(filteredSessions)}
            </TabsContent>
            <TabsContent value="today">
              {renderSessions(
                filteredSessions.filter(
                  (session) =>
                    session.startTime.toDateString() ===
                      new Date().toDateString() && session.status !== "canceled"
                )
              )}
            </TabsContent>
            <TabsContent value="upcoming">
              {renderSessions(
                filteredSessions.filter(
                  (session) =>
                    session.startTime > new Date() &&
                    session.status !== "canceled"
                )
              )}
            </TabsContent>
            <TabsContent value="past">
              {renderSessions(
                filteredSessions.filter(
                  (session) =>
                    session.startTime < new Date() &&
                    session.status !== "canceled"
                )
              )}
            </TabsContent>
            <TabsContent value="canceled">
              {renderSessions(
                filteredSessions.filter(
                  (session) => session.status === "canceled"
                )
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
