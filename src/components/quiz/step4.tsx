import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Step4Props {
  responses: {
    budget: string;
  };
  onResponseChange: (response: { budget: string }) => void;
}

export default function Step4({ responses, onResponseChange }: Step4Props) {
  const budgets = [
    "Free or low-cost options, please! (Under $50/session)",
    "Moderate—value is important, but I'm on a budget. ($50–$150/session)",
    "Flexible—I'm willing to invest in myself. ($150+/session)",
  ];

  return (
    <div className="space-y-4">
      <label className="text-lg font-medium text-[#2C1D14]">
        What's your budget?
      </label>
      <RadioGroup
        value={responses.budget}
        onValueChange={(value) => onResponseChange({ budget: value })}
      >
        {budgets.map((budget, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={budget} id={`budget-${index}`} />
            <Label htmlFor={`budget-${index}`} className="text-[#2C1D14]">
              {budget}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
