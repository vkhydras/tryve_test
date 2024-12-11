import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Step3Props {
  responses: {
    therapyStyle: string;
  };
  onResponseChange: (response: { therapyStyle: string }) => void;
}

export default function Step3({ responses, onResponseChange }: Step3Props) {
  const styles = [
    "Just listen and help me process my feelings.",
    "Assign me homework and give me tools I can use every day.",
    "A mix of both, depending on what I need.",
  ];

  return (
    <div className="space-y-4">
      <label className="text-lg font-medium text-[#2C1D14]">
        How would you like to work on things?
      </label>
      <RadioGroup
        value={responses.therapyStyle}
        onValueChange={(value) => onResponseChange({ therapyStyle: value })}
      >
        {styles.map((style, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={style} id={`style-${index}`} />
            <Label htmlFor={`style-${index}`} className="text-[#2C1D14]">
              {style}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
