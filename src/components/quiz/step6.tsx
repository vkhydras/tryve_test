import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Step6Props {
  responses: {
    sessionType: string;
  };
  onResponseChange: (response: { sessionType: string }) => void;
}

export default function Step6({ responses, onResponseChange }: Step6Props) {
  const sessionTypes = [
    "Face-to-face, I connect better in person.",
    "Virtual, I love the comfort of my own space.",
    "I'm flexible—whatever gets me started.",
  ];

  return (
    <div className="space-y-4">
      <label className="text-lg font-medium text-[#2C1D14]">
        What type of session works best for you?
      </label>
      <RadioGroup
        value={responses.sessionType}
        onValueChange={(value) => onResponseChange({ sessionType: value })}
      >
        {sessionTypes.map((type, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={type} id={`session-${index}`} />
            <Label htmlFor={`session-${index}`} className="text-[#2C1D14]">{type}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
