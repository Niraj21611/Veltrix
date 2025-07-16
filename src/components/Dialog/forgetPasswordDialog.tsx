"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import { sendResetEmail } from "@/lib/actions/auth.actions";
import { cn } from "@/lib/utils/utils";

interface ForgotPasswordDialog{
    setIsForgetPasswordOpen:  React.Dispatch<React.SetStateAction<boolean>>;
    isForgetPasswordOpen: boolean;
}


const ForgotPasswordDialog = ({setIsForgetPasswordOpen, isForgetPasswordOpen} : ForgotPasswordDialog) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
        setMessage({ text: "Please enter your email address", type: "error" });
        return;
    }
    
    setLoading(true);
    setMessage(null);
    
    const res = await sendResetEmail(email); 
  
    if (res?.error) {
        setMessage({ text: res.error, type: "error" });
    } else {
        setMessage({ 
            text: "Password reset link has been sent to your email address. Please check your inbox.", 
            type: "success" 
          });
          setEmail("");
    }
  
    setLoading(false);
  };
  

  return (
    <Dialog.Root open={isForgetPasswordOpen} onOpenChange={setIsForgetPasswordOpen}>
      <Dialog.Trigger asChild>
        <Button
          type="button"
          variant="link"
          className="text-[#7C3AED] hover:text-[#9461FF] p-0 h-auto font-medium"
        >
          Forgot password?
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">
          <div className="mb-2">
            <Dialog.Title className="text-xl font-semibold text-gray-900">Reset Password</Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mt-1">
              Enter your email address below and we&apos;ll send you a link to reset your password.
            </Dialog.Description>
          </div>
          
          <div className="h-px bg-gray-200 my-4" />
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full"
              />
            </div>
            
            {message && (
              <div className={cn(
                "p-3 rounded-md text-sm",
                message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
              )}>
                {message.text}
              </div>
            )}
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsForgetPasswordOpen(false)}
                disabled={loading}
                className="border-gray-300 text-gray-700"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
              >
                {loading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};


export default ForgotPasswordDialog