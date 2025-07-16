"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import { BasicInfoForm } from "@/components/Form/SignUp/basicInfoForm";
import { UserTypeForm } from "@/components/Form/SignUp/userTypeForm";
import { CandidateForm } from "@/components/Form/SignUp/candidateForm";
import { RecruiterForm } from "@/components/Form/SignUp/recruiterForm";
import {
  basicInfoSchema,
  candidateSchema,
  recruiterSchema,
  userTypeSchema,
} from "@/lib/validations/auth";

type BasicInfoData = z.infer<typeof basicInfoSchema>;
type UserTypeData = z.infer<typeof userTypeSchema>;
type CandidateData = z.infer<typeof candidateSchema>;
type RecruiterData = z.infer<typeof recruiterSchema>;

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<"candidate" | "recruiter" | null>(
    null
  );
  const [basicInfo, setBasicInfo] = useState<BasicInfoData | null>(null);

  const basicInfoForm = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
  });

  const userTypeForm = useForm<UserTypeData>({
    resolver: zodResolver(userTypeSchema),
  });

  const candidateForm = useForm<CandidateData>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      skills: [],
      education: [{ degree: "", institution: "", year: "", field: "" }],
      address: { street: "", city: "", state: "", zipCode: "", country: "" },
    },
  });

  const recruiterForm = useForm<RecruiterData>({
    resolver: zodResolver(recruiterSchema),
    defaultValues: {
      companyAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
  });

  const handleBasicInfoSubmit = (data: BasicInfoData) => {
    setBasicInfo(data);
    setCurrentStep(2);
  };

  const handleUserTypeSubmit = (data: UserTypeData) => {
    setUserType(data.userType);
    setCurrentStep(3);
  };

  const handleCandidateSubmit = (data: CandidateData) => {
    console.log("Candidate Registration Data:", {
      ...basicInfo,
      userType: "candidate",
      ...data,
    });
    // Here you would typically send the data to your API
    alert("Candidate registration completed! Check console for data.");
  };

  const handleRecruiterSubmit = (data: RecruiterData) => {
    console.log("Recruiter Registration Data:", {
      ...basicInfo,
      userType: "recruiter",
      ...data,
    });
    // Here you would typically send the data to your API
    alert("Recruiter registration completed! Check console for data.");
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Basic Information";
      case 2:
        return "Account Type";
      case 3:
        return userType === "candidate"
          ? "Candidate Profile"
          : "Recruiter Profile";
      default:
        return "Sign Up";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Let's start with your basic information";
      case 2:
        return "Choose your account type to continue";
      case 3:
        return userType === "candidate"
          ? "Tell us about your professional background"
          : "Tell us about your company";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Join TalentHub
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            {getStepDescription()}
          </CardDescription>
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep} of 3</span>
              <span>{getStepTitle()}</span>
            </div>
            <Progress value={(currentStep / 3) * 100} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <BasicInfoForm
              form={basicInfoForm}
              onSubmit={handleBasicInfoSubmit}
            />
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <UserTypeForm
                form={userTypeForm}
                onSubmit={handleUserTypeSubmit}
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && userType === "candidate" && (
            <div className="space-y-6">
              <CandidateForm
                form={candidateForm}
                onSubmit={handleCandidateSubmit}
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && userType === "recruiter" && (
            <div className="space-y-6">
              <RecruiterForm
                form={recruiterForm}
                onSubmit={handleRecruiterSubmit}
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
