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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, MapPin, User, GraduationCap, Globe, Linkedin, Github } from "lucide-react"

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

export function CandidateForm({ form, onSubmit }: CandidateFormProps) {
  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState<string[]>([])

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="profileDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Domain</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="profileDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a brief description about yourself, your experience, and career goals..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skills */}
            <div className="space-y-3">
              <Label>Skills</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g., JavaScript, Python, React)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button type="button" onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Education {index + 1}</h4>
                  {fields.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
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
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Bachelor's, Master's, PhD" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.field`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Computer Science, Engineering" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input placeholder="University/College name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.year`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduation Year</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2023" {...field} />
                        </FormControl>
                        <FormMessage />
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
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Province</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter state/province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP/Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ZIP code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Professional Links (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Portfolio Website
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourportfolio.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn Profile
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub Profile
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/yourusername" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" className="px-8">
            Complete Registration
          </Button>
        </div>
      </form>
    </Form>
  )
}
