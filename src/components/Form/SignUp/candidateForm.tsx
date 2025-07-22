"use client"

import type React from "react"
import { useState } from "react"
import { type UseFormReturn, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  X,
  MapPin,
  GraduationCap,
  Globe,
  Linkedin,
  Github,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Briefcase,
} from "lucide-react"

interface CandidateFormProps {
  form: UseFormReturn<any>
  onSubmit: (data: any) => void
}

const profileDomains = [
  "Software Engineer",
  "Data Scientist",
  "Data Analyst",
  "Product Manager",
  "UI/UX Designer",
  "DevOps Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile Developer",
  "Machine Learning Engineer",
  "Cybersecurity Specialist",
  "Cloud Architect",
  "Business Analyst",
  "Digital Marketing Specialist",
  "Sales Representative",
  "HR Specialist",
  "Financial Analyst",
  "Project Manager",
  "Quality Assurance Engineer",
]

const experienceLevels = [
  "Entry Level (0-1 years)",
  "Junior (1-3 years)",
  "Mid-Level (3-5 years)",
  "Senior (5-8 years)",
  "Lead (8-12 years)",
  "Principal/Staff (12+ years)",
]

const steps = [
  {
    id: 1,
    title: "Professional Info",
    description: "Tell us about your career",
    icon: Briefcase,
    fields: ["profileDomain", "experience", "profileDescription", "skills"],
  },
  {
    id: 2,
    title: "Education",
    description: "Your academic background",
    icon: GraduationCap,
    fields: ["education"],
  },
  {
    id: 3,
    title: "Location",
    description: "Where are you based?",
    icon: MapPin,
    fields: ["address"],
  },
  {
    id: 4,
    title: "Professional Links",
    description: "Showcase your work",
    icon: Globe,
    fields: ["portfolio", "linkedin", "github"],
  },
]

export function CandidateForm({ form, onSubmit }: CandidateFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  })

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const newSkills = [...skills, skillInput.trim()]
      setSkills(newSkills)
      form.setValue("skills", newSkills)
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove)
    setSkills(newSkills)
    form.setValue("skills", newSkills)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  const validateCurrentStep = () => {
    const currentStepData = steps.find((step) => step.id === currentStep)
    if (!currentStepData) return false

    // Basic validation - you can enhance this based on your requirements
    const formValues = form.getValues()

    switch (currentStep) {
      case 1:
        return formValues.profileDomain && formValues.experience && formValues.profileDescription
      case 2:
        return formValues.education && formValues.education.length > 0 && formValues.education[0].degree
      case 3:
        return formValues.address?.city && formValues.address?.country
      case 4:
        return true // Optional step
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepNumber: number) => {
    if (stepNumber <= currentStep || completedSteps.includes(stepNumber - 1)) {
      setCurrentStep(stepNumber)
    }
  }

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Professional Information</h2>
              <p className="text-gray-600">Tell us about your career and expertise</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="profileDomain"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-sm font-semibold text-gray-700 group-focus-within:text-blue-600 transition-colors duration-200">
                      Profile Domain *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm">
                          <SelectValue placeholder="Select your domain" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {profileDomains.map((domain) => (
                          <SelectItem key={domain} value={domain}>
                            {domain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-sm font-semibold text-gray-700 group-focus-within:text-blue-600 transition-colors duration-200">
                      Experience Level *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="profileDescription"
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="text-sm font-semibold text-gray-700 group-focus-within:text-blue-600 transition-colors duration-200">
                    Profile Description *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a brief description about yourself, your experience, and career goals..."
                      className="min-h-[120px] border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Skills</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g., JavaScript, Python, React)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-10 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  className="h-10 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200"
                  >
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-600 transition-colors duration-200"
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Education Background</h2>
              <p className="text-gray-600">Share your academic qualifications</p>
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-4 p-6 border-2 border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm hover:border-gray-300 transition-all duration-200"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-900">Education {index + 1}</h4>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(index)}
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`education.${index}.degree`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Degree *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Bachelor's, Master's, PhD"
                              className="h-10 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.field`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Field of Study</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Computer Science, Engineering"
                              className="h-10 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.institution`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Institution</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="University/College name"
                              className="h-10 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.year`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Graduation Year</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 2023"
                              className="h-10 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => append({ degree: "", institution: "", year: "", field: "" })}
                className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all duration-200 rounded-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Education
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-4 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Location Details</h2>
              <p className="text-gray-600">Where are you currently based?</p>
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-sm font-semibold text-gray-700 group-focus-within:text-orange-600 transition-colors duration-200">
                      Street Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your street address"
                        className="h-10 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem className="group">
                      <FormLabel className="text-sm font-semibold text-gray-700 group-focus-within:text-orange-600 transition-colors duration-200">
                        City *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter city"
                          className="h-10 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem className="group">
                      <FormLabel className="text-sm font-semibold text-gray-700 group-focus-within:text-orange-600 transition-colors duration-200">
                        State/Province
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter state/province"
                          className="h-10 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.zipCode"
                  render={({ field }) => (
                    <FormItem className="group">
                      <FormLabel className="text-sm font-semibold text-gray-700 group-focus-within:text-orange-600 transition-colors duration-200">
                        ZIP/Postal Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter ZIP code"
                          className="h-10 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.country"
                  render={({ field }) => (
                    <FormItem className="group">
                      <FormLabel className="text-sm font-semibold text-gray-700 group-focus-within:text-orange-600 transition-colors duration-200">
                        Country *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter country"
                          className="h-10 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Professional Links</h2>
              <p className="text-gray-600">Showcase your work and professional presence (Optional)</p>
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 group-focus-within:text-purple-600 transition-colors duration-200">
                      <Globe className="h-4 w-4" />
                      Portfolio Website
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://yourportfolio.com"
                        className="h-10 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 group-focus-within:text-purple-600 transition-colors duration-200">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn Profile
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="h-10 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 group-focus-within:text-purple-600 transition-colors duration-200">
                      <Github className="h-4 w-4" />
                      GitHub Profile
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/yourusername"
                        className="h-10 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          {/* Progress Header */}
          <div className="space-y-6">
            {/* <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
              <div className="text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </div>
            </div> */}

            {/* <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Getting Started</span>
                <span>Almost Done</span>
              </div>
            </div> */}

            {/* Step Navigation */}
            {/* <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => goToStep(step.id)}
                    disabled={step.id > currentStep && !completedSteps.includes(step.id - 1)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      step.id === currentStep
                        ? "border-blue-500 bg-blue-500 text-white shadow-lg"
                        : completedSteps.includes(step.id)
                          ? "border-green-500 bg-green-500 text-white"
                          : step.id < currentStep
                            ? "border-gray-300 bg-gray-100 text-gray-600 hover:border-gray-400"
                            : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${completedSteps.includes(step.id) ? "bg-green-500" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-900">{steps[currentStep - 1]?.title}</h3>
              <p className="text-sm text-gray-600">{steps[currentStep - 1]?.description}</p>
            </div> */}
          </div>

          {/* Form Content */}
          <div className="border border-gray-200 rounded-xl shadow-lg bg-white p-8">{renderStepContent()}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="h-10 px-4 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!validateCurrentStep()}
                className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="h-10 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Complete Registration
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}
