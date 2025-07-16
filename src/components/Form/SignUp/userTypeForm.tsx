"use client"

import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Users, Building2, ChevronRight } from "lucide-react"

interface UserTypeFormProps {
  form: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export function UserTypeForm({ form, onSubmit }: UserTypeFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <RadioGroupItem value="candidate" id="candidate" className="peer sr-only" />
                    <Label htmlFor="candidate" className="flex cursor-pointer">
                      <Card className="w-full transition-all hover:shadow-md peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-blue-500 peer-data-[state=checked]:border-blue-500">
                        <CardHeader className="text-center">
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                            <Users className="h-8 w-8 text-blue-600" />
                          </div>
                          <CardTitle className="text-xl">I'm a Candidate</CardTitle>
                          <CardDescription>
                            Looking for job opportunities and want to showcase my skills
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Create professional profile</li>
                            <li>• Apply to job postings</li>
                            <li>• Get discovered by recruiters</li>
                            <li>• Track application status</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="recruiter" id="recruiter" className="peer sr-only" />
                    <Label htmlFor="recruiter" className="flex cursor-pointer">
                      <Card className="w-full transition-all hover:shadow-md peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-blue-500 peer-data-[state=checked]:border-blue-500">
                        <CardHeader className="text-center">
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <Building2 className="h-8 w-8 text-green-600" />
                          </div>
                          <CardTitle className="text-xl">I'm a Recruiter</CardTitle>
                          <CardDescription>Hiring talent and want to post job opportunities</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Post job openings</li>
                            <li>• Search candidate database</li>
                            <li>• Manage applications</li>
                            <li>• AI-powered candidate matching</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="flex items-center gap-2">
            Continue
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}
