import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Step5Props {
  responses: {
    preferences: string[];
  };
  onResponseChange: (response: { preferences: string[] }) => void;
}

export default function Step5({ responses, onResponseChange }: Step5Props) {
  const preferences = [
    "Someone who understands LGBTQ+ experiences",
    "Someone familiar with my cultural background",
    "Someone experienced in trauma therapy",
    "Someone who specializes in anxiety or depression",
    "Someone skilled in relationship or family therapy",
    "Someone with expertise in mindfulness or holistic approaches",
    "Someone who can provide faith-based counselling",
    "I don't have specific preferences",
  ];

  const handlePreferenceChange = (value: string) => {
    const currentPreferences = responses.preferences || [];
    const updatedPreferences = currentPreferences.includes(value)
      ? currentPreferences.filter((item: string) => item !== value)
      : [...currentPreferences, value];
    onResponseChange({ preferences: updatedPreferences });
  };

  return (
    <div className="space-y-4">
      <label className="text-lg font-medium text-[#2C1D14]">
        Do you have any preferences for your therapist? (Select all that apply)
      </label>
      <div className="space-y-2">
        {preferences.map((preference, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`preference-${index}`}
              checked={(responses.preferences || []).includes(preference)}
              onCheckedChange={() => handlePreferenceChange(preference)}
            />
            <Label htmlFor={`preference-${index}`} className="text-[#2C1D14]">
              {preference}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
