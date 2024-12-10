import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const areasOfConcern = [
  "Anxiety",
  "Depression",
  "Stress",
  "Relationships",
  "Self-esteem",
  "Grief",
  "Trauma",
  "Addiction",
  "Eating disorders",
  "Anger management",
  "Career challenges",
  "Life transitions",
];

interface Responses {
  concerns: string[];
}

interface Step5Props {
  responses: Responses;
  onResponseChange: (newResponses: Responses) => void;
}

export default function Step5({ responses, onResponseChange }: Step5Props) {
  const [concernInput, setConcernInput] = useState("");

  const handleAddConcern = (concern: string) => {
    const currentConcerns = responses.concerns || [];
    onResponseChange({ concerns: [...currentConcerns, concern] });
    setConcernInput("");
  };

  const handleRemoveConcern = (concern: string) => {
    const currentConcerns = responses.concerns || [];
    onResponseChange({
      concerns: currentConcerns.filter((c) => c !== concern),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-teal-700">
          Select or type your areas of concern
        </label>
        <div className="relative">
          <Input
            value={concernInput}
            onChange={(e) => setConcernInput(e.target.value)}
            placeholder="Search and select areas of concern"
            className="border-teal-300 focus:ring-teal-500"
          />
          {concernInput && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {areasOfConcern
                .filter((concern) =>
                  concern.toLowerCase().includes(concernInput.toLowerCase())
                )
                .map((concern) => (
                  <div
                    key={concern}
                    className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                    onClick={() => handleAddConcern(concern)}
                  >
                    {concern}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {(responses.concerns || []).map((concern) => (
            <Badge
              key={concern}
              variant="secondary"
              className="bg-teal-100 text-teal-700"
            >
              {concern}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0"
                onClick={() => handleRemoveConcern(concern)}
              >
                <X className="h-3 w-3 text-teal-700" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
