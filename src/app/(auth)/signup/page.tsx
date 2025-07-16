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

const basicInfoSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const userTypeSchema = z.object({
  userType: z
    .enum(["candidate", "recruiter"])
    .refine((val) => !!val, { message: "Please select a user type" }),
});

const candidateSchema = z.object({
  skills: z.array(z.string()).min(1, "Please add at least one skill"),
  experience: z.string().min(1, "Experience is required"),
  education: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        institution: z.string().min(1, "Institution is required"),
        year: z.string().min(1, "Year is required"),
        field: z.string().min(1, "Field of study is required"),
      })
    )
    .min(1, "Please add at least one education entry"),
  profileDescription: z
    .string()
    .min(50, "Profile description must be at least 50 characters"),
  profileDomain: z.string().min(1, "Please select a profile domain"),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
});

const recruiterSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyEmail: z.string().email("Invalid company email address"),
  companySize: z.string().min(1, "Please select company size"),
  industry: z.string().min(1, "Please select industry"),
  companyWebsite: z
    .string()
    .url("Invalid website URL")
    .optional()
    .or(z.literal("")),
  companyDescription: z
    .string()
    .min(50, "Company description must be at least 50 characters"),
  jobTitle: z.string().min(1, "Job title is required"),
  department: z.string().min(1, "Department is required"),
  companyAddress: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
});

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
