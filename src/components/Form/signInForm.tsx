"use client"

import type * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { userSignInValidation } from "@/lib/validations/auth"
import { useState } from "react"
import ForgotPasswordDialog from "../Dialog/forgetPasswordDialog"

interface SignInFormProps {
  callbackUrl?: string
}

export default function LoginForm({ callbackUrl: propCallbackUrl }: SignInFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState<boolean>(false)

  const urlCallbackUrl = searchParams.get("callbackUrl")
  const finalCallbackUrl = urlCallbackUrl || propCallbackUrl || "/student-dashboard"

  const form = useForm<z.infer<typeof userSignInValidation>>({
    resolver: zodResolver(userSignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof userSignInValidation>) {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      })

      if (res?.ok) {
        toast.success("Login successful!")
        router.push(finalCallbackUrl)
      } else {
        toast.error("Invalid email or password")
      }
    } catch (error) {
      console.error("Error during login:", error)
      toast.error("An error occurred during login")
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h3>
          <p className="text-gray-600 text-sm">Enter your credentials to access your account</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 font-medium">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="h-12 glass-input text-gray-800 placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 font-medium">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-12 glass-input text-gray-800 placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full h-12 glass-button bg-gradient-to-r from-red-500 to-yellow-600 hover:from-yellow-600 hover:to-red-500 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-xl rounded-xl border-0 relative overflow-hidden group"
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isLoading ? (
                  <div className="flex items-center space-x-2 relative z-10">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span className="relative z-10 drop-shadow-sm">Sign In</span>
                )}
              </Button>

              <div className="flex items-center justify-center">
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-cyan-600 hover:text-cyan-700 font-medium transition-colors duration-200 text-sm"
                  onClick={() => setIsForgetPasswordOpen(true)}
                >
                  Forgot password?
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200/50">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 hover:underline"
                >
                  Sign up here
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>

      {isForgetPasswordOpen && (
        <ForgotPasswordDialog
          isForgetPasswordOpen={isForgetPasswordOpen}
          setIsForgetPasswordOpen={setIsForgetPasswordOpen}
        />
      )}
    </>
  )
}