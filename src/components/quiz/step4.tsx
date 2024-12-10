import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Step4Props {
  responses: {
    preferences: string[];
  };
  onResponseChange: (response: { preferences: string[] }) => void;
}

export default function Step4({ responses, onResponseChange }: Step4Props) {
  const handlePreferenceChange = (value: string) => {
    const currentPreferences = responses.preferences || [];
    const updatedPreferences = currentPreferences.includes(value)
      ? currentPreferences.filter((item: string) => item !== value)
      : [...currentPreferences, value];
    onResponseChange({ preferences: updatedPreferences });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-medium text-teal-700">
          What are you open to? (Select all that apply)
        </label>
        <div className="space-y-2">
          {["life-advice", "relationship-advice", "career-advice"].map(
            (preference) => (
              <div key={preference} className="flex items-center space-x-2">
                <Checkbox
                  id={preference}
                  checked={(responses.preferences || []).includes(preference)}
                  onCheckedChange={() => handlePreferenceChange(preference)}
                />
                <Label htmlFor={preference}>
                  {preference
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </Label>
              </div>
            )
          )}
        </div>
      </div>
      <div className="space-y-4">
        <label className="text-sm font-medium text-teal-700">
          Do you prefer a therapist who is...
        </label>
        <div className="space-y-2">
          {[
            "more-structured",
            "less-structured",
            "more-direct",
            "less-direct",
          ].map((preference) => (
            <div key={preference} className="flex items-center space-x-2">
              <Checkbox
                id={preference}
                checked={(responses.preferences || []).includes(preference)}
                onCheckedChange={() => handlePreferenceChange(preference)}
              />
              <Label htmlFor={preference}>
                {preference
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
