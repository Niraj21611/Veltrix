"use client"

import type React from "react"

// This is a minimal implementation that provides the required exports
// without using any JSX in a .ts file

// Define the toast variants
export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info"

// Define the toast interface
export interface Toast {
  id?: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

// Create a no-op implementation of useToast
export function useToast() {
  return {
    toast: (props: Toast) => {
      if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
        console.log("Toast:", props)
      }
    },
  }
}

// Create a no-op implementation of toast
export const toast = {
  // Default toast
  default: (props: { title?: string; description?: string; duration?: number }) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.log("Toast (default):", props)
    }
  },
  // Success toast
  success: (props: { title?: string; description?: string; duration?: number }) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.log("Toast (success):", props)
    }
  },
  // Error toast
  error: (props: { title?: string; description?: string; duration?: number }) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.log("Toast (error):", props)
    }
  },
  // Warning toast
  warning: (props: { title?: string; description?: string; duration?: number }) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.log("Toast (warning):", props)
    }
  },
  // Info toast
  info: (props: { title?: string; description?: string; duration?: number }) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.log("Toast (info):", props)
    }
  },
  // Custom toast
  custom: (props: Toast) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.log("Toast (custom):", props)
    }
  },
}

// Create a no-op implementation of ToastProvider
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return children
}

// Create a no-op implementation of ToastInit
export function ToastInit() {
  return null
}
