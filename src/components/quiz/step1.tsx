import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Step1Props {
  responses: {
    reason: string;
  };
  onResponseChange: (response: { reason: string }) => void;
}

export default function Step1({ responses, onResponseChange }: Step1Props) {
  const reasons = [
    "I'm feeling overwhelmed and need someone to talk to.",
    "I want to understand myself better.",
    "I'm dealing with something specific, like anxiety, depression, or trauma.",
    "I'm not sure, but I know I want to feel better.",
  ];

  return (
    <div className="space-y-4">
      <label className="text-lg font-medium text-[#2C1D14]">
        What brings you here today?
      </label>
      <RadioGroup
        value={responses.reason}
        onValueChange={(value) => onResponseChange({ reason: value })}
      >
        {reasons.map((reason, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={reason} id={`reason-${index}`} />
            <Label htmlFor={`reason-${index}`} className="text-[#2C1D14]">
              {reason}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
