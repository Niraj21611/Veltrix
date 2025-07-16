"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface FirstLoginDialogProps {
  redirectUrl: string;
}

export function FirstLoginDialog({ redirectUrl }: FirstLoginDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleRedirect = () => {
    localStorage.setItem("isFirstLogin", "false");
    setIsOpen(false);
    router.push(redirectUrl);
  };

  const handleDismiss = () => {
    localStorage.setItem("isFirstLogin", "false");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[400px] w-[400px] h-[400px] flex flex-col justify-center items-center p-8">
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="text-center space-y-6 flex flex-col items-center justify-center h-full">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
            <svg
              className="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <DialogTitle className="text-lg font-semibold text-center">
            Security Warning
          </DialogTitle>

          <DialogDescription className="text-sm text-center leading-relaxed px-4">
            Your current password is a temporary password. For your account
            security, please change it immediately.
          </DialogDescription>

          <Button
            onClick={handleRedirect}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            size="lg"
          >
            Click Here to Change Password
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
