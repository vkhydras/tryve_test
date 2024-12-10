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
import Step1 from "@/components/quiz/step1";
import Step2 from "@/components/quiz/step2";
import Step3 from "@/components/quiz/step3";
import Step4 from "@/components/quiz/step4";
import Step5 from "@/components/quiz/step5";
import Signup from "@/components/quiz/signup";

const steps = [
  "Basic Info",
  "Profile",
  "Current State",
  "Preferences",
  "Areas of Concern",
  "Sign Up",
];

interface Responses {
  name: string;
  email: string;
  mentalHealth: string;
  physicalHealth: string;
  age?: number;
  timezone?: string;
  preferences: string[];
  concerns: string[];
  reasons: string[];
}

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Responses>({
    name: "",
    email: "",
    mentalHealth: "",
    physicalHealth: "",
    age: undefined,
    timezone: undefined,
    preferences: [],
    concerns: [],
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
            onResponseChange={(response) => handleResponseChange(response as Partial<Responses>)}
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
    <div className="container mx-auto px-4 py-8 bg-teal-50">
      <Card className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-teal-800">
            {steps[currentStep]}
          </CardTitle>
          <CardDescription className="text-teal-600">
            Step {currentStep + 1} of {steps.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              className="text-teal-600 border-teal-600 hover:bg-teal-100"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              type="button"
              className="bg-teal-600 text-white hover:bg-teal-700"
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
            >
              {currentStep === steps.length - 2 ? "Finish" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
