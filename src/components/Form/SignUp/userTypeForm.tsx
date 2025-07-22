"use client"

import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Users, Building2, ChevronRight, CheckCircle, Briefcase, Search, TrendingUp, UserPlus } from "lucide-react"

interface UserTypeFormProps {
  form: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export function UserTypeForm({ form, onSubmit }: UserTypeFormProps) {
  const selectedValue = form.watch("userType")

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2 mt-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Path</h2>
        <p className="text-gray-600">Select the option that best describes your goals</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="userType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {/* Candidate Option */}
                    <div className="relative group">
                      <RadioGroupItem value="candidate" id="candidate" className="peer sr-only" />
                      <Label htmlFor="candidate" className="flex cursor-pointer">
                        <Card
                          className={`w-full transition-all duration-300 hover:shadow-xl hover:scale-105 transform ${
                            selectedValue === "candidate"
                              ? "ring-4 ring-blue-500/30 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl scale-105"
                              : "hover:shadow-lg border-gray-200 bg-white/80 backdrop-blur-sm"
                          }`}
                        >
                          {/* Selection Indicator */}
                          {selectedValue === "candidate" && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                          )}

                          <CardHeader className="text-center pb-4">
                            <div
                              className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 ${
                                selectedValue === "candidate"
                                  ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
                                  : "bg-blue-100 group-hover:bg-blue-200"
                              }`}
                            >
                              <Users
                                className={`h-10 w-10 transition-colors duration-300 ${
                                  selectedValue === "candidate" ? "text-white" : "text-blue-600"
                                }`}
                              />
                            </div>
                            <CardTitle
                              className={`text-xl font-bold transition-colors duration-300 ${
                                selectedValue === "candidate" ? "text-blue-700" : "text-gray-900"
                              }`}
                            >
                              I'm a Job Seeker
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                              Looking for opportunities to advance my career
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2 text-sm">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    selectedValue === "candidate" ? "bg-blue-500" : "bg-green-400"
                                  }`}
                                ></div>
                                <span className="text-gray-700">Create Profile</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    selectedValue === "candidate" ? "bg-blue-500" : "bg-green-400"
                                  }`}
                                ></div>
                                <span className="text-gray-700">Apply to Jobs</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    selectedValue === "candidate" ? "bg-blue-500" : "bg-green-400"
                                  }`}
                                ></div>
                                <span className="text-gray-700">Get Discovered</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    selectedValue === "candidate" ? "bg-blue-500" : "bg-green-400"
                                  }`}
                                ></div>
                                <span className="text-gray-700">Track Progress</span>
                              </div>
                            </div>

                            <div className="pt-3 border-t border-gray-100">
                              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Briefcase className="w-3 h-3" />
                                  <span>Job Search</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <TrendingUp className="w-3 h-3" />
                                  <span>Career Growth</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Label>
                    </div>

                    {/* Recruiter Option */}
                    <div className="relative group">
                      <RadioGroupItem value="recruiter" id="recruiter" className="peer sr-only" />
                      <Label htmlFor="recruiter" className="flex cursor-pointer">
                        <Card
                          className={`w-full transition-all duration-300 hover:shadow-xl hover:scale-105 transform ${
                            selectedValue === "recruiter"
                              ? "ring-4 ring-green-500/30 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl scale-105"
                              : "hover:shadow-lg border-gray-200 bg-white/80 backdrop-blur-sm"
                          }`}
                        >
                          {/* Selection Indicator */}
                          {selectedValue === "recruiter" && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                          )}

                          <CardHeader className="text-center pb-4">
                            <div
                              className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 ${
                                selectedValue === "recruiter"
                                  ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg"
                                  : "bg-green-100 group-hover:bg-green-200"
                              }`}
                            >
                              <Building2
                                className={`h-10 w-10 transition-colors duration-300 ${
                                  selectedValue === "recruiter" ? "text-white" : "text-green-600"
                                }`}
                              />
                            </div>
                            <CardTitle
                              className={`text-xl font-bold transition-colors duration-300 ${
                                selectedValue === "recruiter" ? "text-green-700" : "text-gray-900"
                              }`}
                            >
                              I'm a Recruiter
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                              Hiring talent and building amazing teams
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2 text-sm">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    selectedValue === "recruiter" ? "bg-green-500" : "bg-blue-400"
                                  }`}
                                ></div>
                                <span className="text-gray-700">Post Jobs</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    selectedValue === "recruiter" ? "bg-green-500" : "bg-blue-400"
                                  }`}
                                ></div>
                                <span className="text-gray-700">Find Talent</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    selectedValue === "recruiter" ? "bg-green-500" : "bg-blue-400"
                                  }`}
                                ></div>
                                <span className="text-gray-700">AI Matching</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    selectedValue === "recruiter" ? "bg-green-500" : "bg-blue-400"
                                  }`}
                                ></div>
                                <span className="text-gray-700">Manage Pipeline</span>
                              </div>
                            </div>

                            <div className="pt-3 border-t border-gray-100">
                              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Search className="w-3 h-3" />
                                  <span>Talent Search</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <UserPlus className="w-3 h-3" />
                                  <span>Team Building</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-500 text-sm text-center" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={!selectedValue}
              className={`h-12 px-8 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 ${
                selectedValue === "candidate"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  : selectedValue === "recruiter"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    : "bg-gray-400 cursor-not-allowed"
              } text-white`}
            >
              Continue as{" "}
              {selectedValue === "candidate" ? "Job Seeker" : selectedValue === "recruiter" ? "Recruiter" : "User"}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </Form>

    </div>
  )
}
