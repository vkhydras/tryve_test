import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Step2Props {
  responses: {
    therapistVibe: string;
  };
  onResponseChange: (response: { therapistVibe: string }) => void;
}

export default function Step2({ responses, onResponseChange }: Step2Props) {
  const vibes = [
    "Warm and nurturing, like a cozy cup of tea.",
    "Straightforward and practical, let's get to the point.",
    "Chill and conversational, like talking to a wise friend.",
    "I'm open—surprise me!",
  ];

  return (
    <div className="space-y-4">
      <label className="text-lg font-medium text-[#2C1D14]">
        What kind of vibe are you looking for in a therapist?
      </label>
      <RadioGroup
        value={responses.therapistVibe}
        onValueChange={(value) => onResponseChange({ therapistVibe: value })}
      >
        {vibes.map((vibe, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={vibe} id={`vibe-${index}`} />
            <Label htmlFor={`vibe-${index}`} className="text-[#2C1D14]">
              {vibe}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
