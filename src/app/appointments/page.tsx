"use client";

import { useState } from "react";
import { format, isToday, isFuture, isPast } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for sessions
const sessions = [
  {
    id: 1,
    practitionerName: "Dr. Jane Smith",
    startTime: new Date("2023-07-10T10:00:00"),
    endTime: new Date("2023-07-10T11:00:00"),
    format: "Online therapy",
    status: "upcoming",
  },
  {
    id: 2,
    practitionerName: "Dr. John Doe",
    startTime: new Date("2023-07-09T14:00:00"),
    endTime: new Date("2023-07-09T15:00:00"),
    format: "In-person therapy",
    status: "past",
  },
  {
    id: 3,
    practitionerName: "Dr. Emily Brown",
    startTime: new Date("2023-07-11T11:00:00"),
    endTime: new Date("2023-07-11T12:00:00"),
    format: "Online therapy",
    status: "upcoming",
  },
  {
    id: 4,
    practitionerName: "Dr. Michael Johnson",
    startTime: new Date("2023-07-08T09:00:00"),
    endTime: new Date("2023-07-08T10:00:00"),
    format: "Online therapy",
    status: "canceled",
  },
  // Demo session for today
  {
    id: 5,
    practitionerName: "Dr. Sarah Thompson",
    startTime: new Date(new Date().setHours(14, 0, 0, 0)),
    endTime: new Date(new Date().setHours(15, 0, 0, 0)),
    format: "Online therapy",
    status: "upcoming",
  },
  // Demo session for upcoming (tomorrow)
  {
    id: 6,
    practitionerName: "Dr. Robert Wilson",
    startTime: new Date(new Date().setDate(new Date().getDate() + 1)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 1)),
    format: "In-person therapy",
    status: "upcoming",
  },
];

export default function SessionsPage() {
  const [filter, setFilter] = useState("all");

  const filteredSessions = sessions.filter((session) => {
    switch (filter) {
      case "today":
        return isToday(session.startTime) && session.status !== "canceled";
      case "upcoming":
        return isFuture(session.startTime) && session.status !== "canceled";
      case "past":
        return isPast(session.startTime) && session.status !== "canceled";
      case "canceled":
        return session.status === "canceled";
      default:
        return true;
    }
  });

  const renderSessions = (sessions: typeof filteredSessions) => (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card
          key={session.id}
          className="p-4 bg-white shadow-sm border-[#DCAB90]"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-[#2C1D14]">
                {session.practitionerName}
              </h3>
              <p className="text-sm text-[#B78160]">{session.format}</p>
            </div>
            <Badge
              variant={
                session.status === "upcoming"
                  ? "default"
                  : session.status === "past"
                  ? "secondary"
                  : "destructive"
              }
              className={
                session.status === "upcoming"
                  ? "bg-[#B78160] text-white"
                  : session.status === "past"
                  ? "bg-[#FFF5E6] text-[#2C1D14]"
                  : "bg-red-500 text-white"
              }
            >
              {session.status}
            </Badge>
          </div>
          <div className="mt-2 flex items-center text-sm text-[#2C1D14]">
            <Calendar className="mr-2 h-4 w-4" />
            {format(session.startTime, "MMMM d, yyyy")}
          </div>
          <div className="mt-1 flex items-center text-sm text-[#2C1D14]">
            <Clock className="mr-2 h-4 w-4" />
            {format(session.startTime, "h:mm a")} -{" "}
            {format(session.endTime, "h:mm a")}
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF5E6] p-8">
      <Card className="max-w-4xl mx-auto border-[#DCAB90]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2C1D14]">
            Your Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6 bg-[#FFF5E6]">
              <TabsTrigger
                value="all"
                onClick={() => setFilter("all")}
                className="data-[state=active]:bg-[#B78160] data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="today"
                onClick={() => setFilter("today")}
                className="data-[state=active]:bg-[#B78160] data-[state=active]:text-white"
              >
                Today
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                onClick={() => setFilter("upcoming")}
                className="data-[state=active]:bg-[#B78160] data-[state=active]:text-white"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="past"
                onClick={() => setFilter("past")}
                className="data-[state=active]:bg-[#B78160] data-[state=active]:text-white"
              >
                Past
              </TabsTrigger>
              <TabsTrigger
                value="canceled"
                onClick={() => setFilter("canceled")}
                className="data-[state=active]:bg-[#B78160] data-[state=active]:text-white"
              >
                Canceled
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {renderSessions(filteredSessions)}
            </TabsContent>
            <TabsContent value="today">
              {renderSessions(
                filteredSessions.filter((session) => isToday(session.startTime))
              )}
            </TabsContent>
            <TabsContent value="upcoming">
              {renderSessions(
                filteredSessions.filter((session) =>
                  isFuture(session.startTime)
                )
              )}
            </TabsContent>
            <TabsContent value="past">
              {renderSessions(
                filteredSessions.filter((session) => isPast(session.startTime))
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
