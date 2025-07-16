import { UserRole } from "@prisma/client";
import { z } from "zod";

export const userSignInValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const userSignUpValidation = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    role: z.nativeEnum(UserRole),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const basicInfoSchema = z
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

export const userTypeSchema = z.object({
  userType: z
    .enum(["candidate", "recruiter"])
    .refine((val) => !!val, { message: "Please select a user type" }),
});

export const candidateSchema = z.object({
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
    zipCode: z.number().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const recruiterSchema = z.object({
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
    zipCode: z.number().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
});
