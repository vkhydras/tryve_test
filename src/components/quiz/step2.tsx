"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Step2Props {
  responses: {
    dob?: Date;
    timezone?: string;
  };
  onResponseChange: (response: { dob?: Date; timezone?: string }) => void;
}

export default function Step2({ responses, onResponseChange }: Step2Props) {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    if (responses.dob) {
      const today = new Date();
      const birthDate = new Date(responses.dob);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge);
    } else {
      setAge(null);
    }
  }, [responses.dob]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="dob" className="text-sm font-medium text-teal-700">
          Date of Birth
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal border-teal-300 ${
                !responses.dob && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {responses.dob
                ? format(responses.dob, "PPP")
                : "Select your date of birth"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={responses.dob}
              onSelect={(date) => onResponseChange({ dob: date || undefined })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {age !== null && (
          <p className="mt-1 text-xs text-teal-600">Age: {age} years old</p>
        )}
      </div>
      <div>
        <Label htmlFor="timezone" className="text-sm font-medium text-teal-700">
          Time Zone
        </Label>
        <Select
          value={responses.timezone || ""}
          onValueChange={(value) => onResponseChange({ timezone: value })}
        >
          <SelectTrigger id="timezone" className="border-teal-300">
            <SelectValue placeholder="Select your time zone" />
          </SelectTrigger>
          <SelectContent className="bg-teal-50">
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
            <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
