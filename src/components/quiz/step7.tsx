import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Step7Props {
  responses: {
    previousExperience: string;
  };
  onResponseChange: (response: { previousExperience: string }) => void;
}

export default function Step7({ responses, onResponseChange }: Step7Props) {
  const experiences = [
    "Yes, and it was helpful!",
    "Yes, but it wasn't quite the right fit.",
    "No, this is my first time.",
    "Does Googling 'therapist memes' count?",
  ];

  return (
    <div className="space-y-4">
      <label className="text-lg font-medium text-[#2C1D14]">
        Have you seen a therapist before?
      </label>
      <RadioGroup
        value={responses.previousExperience}
        onValueChange={(value) => onResponseChange({ previousExperience: value })}
      >
        {experiences.map((experience, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={experience} 
              id={`experience-${index}`}
              className="border-[#B78160] text-[#B78160]"
            />
            <Label 
              htmlFor={`experience-${index}`} 
              className="text-[#2C1D14]"
            >
              {experience}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
