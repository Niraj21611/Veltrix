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
      address: { street: "", city: "", state: "", zipCode: "0", country: "" },
    },
  });

  const recruiterForm = useForm<RecruiterData>({
    resolver: zodResolver(recruiterSchema),
    defaultValues: {
      companyAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "0",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl"></div>

      <Card className="w-full max-w-4xl relative z-10 bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
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
