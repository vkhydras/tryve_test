"use client";

import { useState } from "react";
import { format, isToday, isFuture, isPast } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  {
    id: 5,
    practitionerName: "Dr. Sarah Thompson",
    startTime: new Date(new Date().setHours(14, 0, 0, 0)),
    endTime: new Date(new Date().setHours(15, 0, 0, 0)),
    format: "Online therapy",
    status: "upcoming",
  },
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-[#B78160] text-white hover:bg-[#B78160]/90";
      case "past":
        return "bg-[#FFF5E6] text-[#2C1D14] hover:bg-[#FFF5E6]/90";
      case "canceled":
        return "bg-red-500 text-white hover:bg-red-600";
      default:
        return "bg-[#B78160] text-white";
    }
  };

  const renderSessions = (sessions: typeof filteredSessions) => (
    <div className="space-y-4">
      {sessions.length === 0 ? (
        <div className="text-center p-8 text-[#2C1D14]">
          No sessions found for this filter.
        </div>
      ) : (
        sessions.map((session) => (
          <Card
            key={session.id}
            className="p-4 bg-white shadow-sm border-[#DCAB90] hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-[#2C1D14] break-words">
                  {session.practitionerName}
                </h3>
                <p className="text-sm text-[#B78160]">{session.format}</p>
                <div className="flex items-center text-sm text-[#2C1D14]">
                  <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="break-words">
                    {format(session.startTime, "MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center text-sm text-[#2C1D14]">
                  <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span>
                    {format(session.startTime, "h:mm a")} -{" "}
                    {format(session.endTime, "h:mm a")}
                  </span>
                </div>
              </div>
              <Badge
                className={`${getStatusColor(
                  session.status
                )} self-start sm:self-center`}
              >
                {session.status}
              </Badge>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF5E6] p-4 sm:p-8 mt-20">
      <Card className="max-w-4xl mx-auto border-[#DCAB90]">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-[#2C1D14]">
            Your Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <ScrollArea className="w-full">
              <TabsList className="inline-flex min-w-full sm:grid sm:grid-cols-5 mb-6 bg-[#FFF5E6] p-1">
                {["all", "today", "upcoming", "past", "canceled"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    onClick={() => setFilter(tab)}
                    className="flex-1 capitalize data-[state=active]:bg-[#B78160] data-[state=active]:text-white px-3 py-1.5"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>

            {["all", "today", "upcoming", "past", "canceled"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                {renderSessions(
                  tab === "all"
                    ? filteredSessions
                    : filteredSessions.filter((session) => {
                        switch (tab) {
                          case "today":
                            return isToday(session.startTime);
                          case "upcoming":
                            return isFuture(session.startTime);
                          case "past":
                            return isPast(session.startTime);
                          case "canceled":
                            return session.status === "canceled";
                          default:
                            return true;
                        }
                      })
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
