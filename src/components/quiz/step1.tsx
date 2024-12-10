import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const reasons = [
  "I've been feeling depressed",
  "I feel anxious or overwhelmed",
  "My mood is interfering with my job/school performance",
  "I struggle with building or maintaining relationships",
  "I can't find purpose and meaning in my life",
  "I am grieving",
  "I have experienced trauma",
  "I need to talk through a specific challenge",
  "I want to gain self confidence",
  "I want to improve myself but I don't know where to start",
  "Recommended to me (friend, family, doctor)",
  "Just exploring",
  "Other",
];

interface Step1Props {
  responses: { reasons: string[] };
  onResponseChange: (responses: { reasons: string[] }) => void;
}

export default function Step1({ responses, onResponseChange }: Step1Props) {
  const selectedReasons = responses.reasons || [];

  const handleReasonChange = (reason: string) => {
    const updatedReasons = selectedReasons.includes(reason)
      ? selectedReasons.filter((r) => r !== reason)
      : [...selectedReasons, reason];

    onResponseChange({ reasons: updatedReasons });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-900">
          What led you to consider therapy today?
        </label>
        <div className="space-y-3">
          {reasons.map((reason) => (
            <div key={reason} className="flex items-center space-x-3">
              <Checkbox
                id={reason}
                checked={selectedReasons.includes(reason)}
                onCheckedChange={() => handleReasonChange(reason)}
                className="border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <Label htmlFor={reason} className="text-sm text-gray-700">
                {reason}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
