"use client"

import type React from "react"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Building2, MapPin, Globe, ChevronLeft, ChevronRight, User } from "lucide-react"

interface RecruiterFormProps {
  form: UseFormReturn<any>
  onSubmit: (data: any) => void
}

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1001-5000 employees",
  "5000+ employees",
]

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Consulting",
  "Media & Entertainment",
  "Real Estate",
  "Transportation",
  "Energy",
  "Government",
  "Non-profit",
  "Automotive",
  "Aerospace",
  "Telecommunications",
  "Food & Beverage",
  "Fashion",
  "Sports",
  "Other",
]

const departments = [
  "Human Resources",
  "Engineering",
  "Sales",
  "Marketing",
  "Operations",
  "Finance",
  "Product",
  "Design",
  "Customer Success",
  "Legal",
  "Executive",
  "Other",
]

const steps = [
  { id: 1, title: "Company Info", icon: Building2 },
  { id: 2, title: "Your Role", icon: User },
  { id: 3, title: "Address", icon: MapPin },
  { id: 4, title: "Links", icon: Globe },
]

export function RecruiterForm({ form, onSubmit }: RecruiterFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = steps.length

  const validateCurrentStepSync = () => {
    const values = form.getValues()

    switch (currentStep) {
      case 1:
        return !!(
          values.companyName &&
          values.companyEmail &&
          values.companySize &&
          values.industry &&
          values.companyDescription
        )
      case 2:
        return !!(values.jobTitle && values.department)
      case 3:
        return !!(
          values.companyAddress?.street &&
          values.companyAddress?.city &&
          values.companyAddress?.state &&
          values.companyAddress?.zipCode &&
          values.companyAddress?.country
        )
      case 4:
        return true // Optional step
      default:
        return false
    }
  }

  const validateCurrentStep = async () => {
    let fieldsToValidate: string[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["companyName", "companyEmail", "companySize", "industry", "companyDescription"]
        break
      case 2:
        fieldsToValidate = ["jobTitle", "department"]
        break
      case 3:
        fieldsToValidate = [
          "companyAddress.street",
          "companyAddress.city",
          "companyAddress.state",
          "companyAddress.zipCode",
          "companyAddress.country",
        ]
        break
      case 4:
        return true // Optional step
    }

    const result = await form.trigger(fieldsToValidate)
    return result
  }

  const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep === totalSteps) {
      // Only call onSubmit on the final step
      const formData = form.getValues()
      onSubmit(formData)
    } else {
      // Navigate to next step for non-final steps
      await nextStep()
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div key="step-1" className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Information</h2>
              <p className="text-gray-600">Tell us about your company</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                rules={{ required: "Company name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-gray-700">Company Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter company name"
                        className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyEmail"
                rules={{
                  required: "Company email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-gray-700">Company Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="company@example.com"
                        className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companySize"
                rules={{ required: "Company size is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-gray-700">Company Size *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
                        {companySizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                rules={{ required: "Industry is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-gray-700">Industry *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-gray-700">Company Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://company.com"
                      className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyDescription"
              rules={{ required: "Company description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-gray-700">Company Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your company, its mission, values, and what makes it unique..."
                      className="min-h-[120px] px-4 py-3 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case 2:
        return (
          <div key="step-2" className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Role</h2>
              <p className="text-gray-600">Tell us about your position</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="jobTitle"
                rules={{ required: "Job title is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-gray-700">Your Job Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., HR Manager, Talent Acquisition Specialist"
                        className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                rules={{ required: "Department is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-gray-700">Department *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div key="step-3" className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Address</h2>
              <p className="text-gray-600">Where is your company located?</p>
            </div>

            <FormField
              control={form.control}
              name="companyAddress.street"
              rules={{ required: "Street address is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-gray-700">Street Address *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter company street address"
                      className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyAddress.city"
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-gray-700">City *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter city"
                        className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyAddress.state"
                rules={{ required: "State/Province is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-gray-700">State/Province *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter state/province"
                        className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyAddress.zipCode"
                rules={{ required: "ZIP/Postal code is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-gray-700">ZIP/Postal Code *</FormLabel>
                    <FormControl>
                      <Input
                        inputMode="numeric"
                        placeholder="Enter ZIP code"
                        className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyAddress.country"
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-gray-700">Country *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter country"
                        className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div key="step-4" className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Links</h2>
              <p className="text-gray-600">Connect your professional profiles (Optional)</p>
            </div>

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-gray-700">Your LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="h-12 px-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      {/* <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Recruiter Registration</h1>
          <span className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
      </div> */}

      {/* Step Indicators */}
      <div className="flex justify-center mb-8">
        {/* <div className="flex space-x-4">
          {steps.map((step) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id

            return (
              <div
                key={step.id}
                className={`flex flex-col items-center space-y-2 ${
                  isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                    isActive
                      ? "border-blue-600 bg-blue-50"
                      : isCompleted
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 bg-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium hidden sm:block">{step.title}</span>
              </div>
            )
          })}
        </div> */}
      </div>

      {/* Form Card */}
      <Card className="bg-white shadow-lg border border-gray-200">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={handleSubmit}>
              <div className="min-h-[600px]">{renderStepContent()}</div>

              {/* Navigation Buttons */}
              <div className="flex justify-end gap-3 pt-8 border-t border-gray-100 mt-8">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="h-10 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}

                <Button
                  type="submit"
                  disabled={currentStep !== totalSteps && !validateCurrentStepSync()}
                  className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {currentStep === totalSteps ? (
                    <>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Complete Registration
                    </>
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
