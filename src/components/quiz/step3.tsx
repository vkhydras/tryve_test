import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Step3Props {
  responses: {
    mentalHealth: string;
    physicalHealth: string;
  };
  onResponseChange: (response: { mentalHealth?: string; physicalHealth?: string }) => void;
}

export default function Step3({ responses, onResponseChange }: Step3Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-medium text-teal-700">
          How would you rate your current mental health?
        </label>
        <RadioGroup
          value={responses.mentalHealth || ""}
          onValueChange={(value) => onResponseChange({ mentalHealth: value })}
        >
          {["Poor", "Fair", "Good", "Very Good", "Excellent"].map(
            (option, index) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={String(index + 1)}
                  id={`mental-${index + 1}`}
                />
                <Label htmlFor={`mental-${index + 1}`}>{option}</Label>
              </div>
            )
          )}
        </RadioGroup>
      </div>
      <div className="space-y-4">
        <label className="text-sm font-medium text-teal-700">
          How would you rate your current physical health?
        </label>
        <RadioGroup
          value={responses.physicalHealth || ""}
          onValueChange={(value) => onResponseChange({ physicalHealth: value })}
        >
          {["Poor", "Fair", "Good", "Very Good", "Excellent"].map(
            (option, index) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={String(index + 1)}
                  id={`physical-${index + 1}`}
                />
                <Label htmlFor={`physical-${index + 1}`}>{option}</Label>
              </div>
            )
          )}
        </RadioGroup>
      </div>
    </div>
  );
}
