"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Step1 from "@/components/quiz/step1";
import Step2 from "@/components/quiz/step2";
import Step3 from "@/components/quiz/step3";
import Step4 from "@/components/quiz/step4";
import Step5 from "@/components/quiz/step5";
import Step6 from "@/components/quiz/step6";
import Step7 from "@/components/quiz/step7";
import Signup from "@/components/quiz/signup";

const steps = [
  "Reason for Visit",
  "Therapist Vibe",
  "Therapy Style",
  "Budget",
  "Therapist Preferences",
  "Session Type",
  "Previous Experience",
  "Sign Up",
];

interface Responses {
  reason: string;
  therapistVibe: string;
  therapyStyle: string;
  budget: string;
  preferences: string[];
  sessionType: string;
  previousExperience: string;
  name: string;
  email: string;
  reasons: string[];

  dob?: Date;
  timezone?: string;
  mentalHealth?: string;
  physicalHealth?: string;
  concerns?: string[];
}
export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Responses>({
    reason: "",
    therapistVibe: "",
    therapyStyle: "",
    budget: "",
    preferences: [],
    sessionType: "",
    previousExperience: "",
    name: "",
    email: "",
    reasons: [],
  });

  useEffect(() => {
    const savedResponses = sessionStorage.getItem("quizResponses");
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    sessionStorage.setItem("quizResponses", JSON.stringify(responses));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleResponseChange = (stepResponses: Partial<Responses>) => {
    setResponses((prev) => ({ ...prev, ...stepResponses }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1
            responses={responses}
            onResponseChange={handleResponseChange}
          />
        );
      case 1:
        return (
          <Step2
            responses={responses}
            onResponseChange={handleResponseChange}
          />
        );
      case 2:
        return (
          <Step3
            responses={responses}
            onResponseChange={handleResponseChange}
          />
        );
      case 3:
        return (
          <Step4
            responses={responses}
            onResponseChange={handleResponseChange}
          />
        );
      case 4:
        return (
          <Step5
            responses={responses}
            onResponseChange={handleResponseChange}
          />
        );
      case 5:
        return (
          <Step6
            responses={responses}
            onResponseChange={handleResponseChange}
          />
        );
      case 6:
        return (
          <Step7
            responses={responses}
            onResponseChange={handleResponseChange}
          />
        );
      case 7:
        return (
          <Signup
            responses={responses}
            onResponseChange={handleResponseChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5E6] px-4 py-6 sm:py-8 md:py-12 mt-20">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar for larger screens */}
        <div className="hidden sm:block mb-8">
          <Progress
            value={(currentStep / (steps.length - 1)) * 100}
            className="h-2 bg-[#EBBBA5]"
          />
          <div className="mt-10 text-sm text-[#B78160] text-right">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        <Card className="bg-white shadow-lg border-[#DCAB90]">
          <CardHeader className="space-y-2 md:space-y-3">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-[#2C1D14] text-center sm:text-left">
              {steps[currentStep]}
            </CardTitle>
            {/* Progress indicator for mobile */}
            <CardDescription className="text-[#B78160] sm:hidden">
              Step {currentStep + 1} of {steps.length}
            </CardDescription>
            <Progress
              value={(currentStep / (steps.length - 1)) * 100}
              className="h-2 bg-[#EBBBA5] sm:hidden mt-2"
            />
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <div className="min-h-[300px] flex flex-col">
              <div className="flex-grow">{renderStep()}</div>

              <div className="flex justify-between mt-6 pt-4 border-t border-[#EBBBA5]">
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#B78160] border-[#B78160] hover:bg-[#EBBBA5] min-w-[100px]"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  className="bg-[#B78160] text-white hover:bg-[#BE8B69] min-w-[100px]"
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                >
                  {currentStep === steps.length - 2 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
