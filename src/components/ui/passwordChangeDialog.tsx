"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, X } from "lucide-react";
import { changePassword } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { sendUserEmail } from "@/lib/utils/sender";
import { User } from "@/lib/types/User";
import { UserRole } from "@prisma/client";

// interface PasswordChangeDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   userId: string;
//   email: string;
//   name: string;
//   className: string;
//   userType: "STUDENT" | "TEACHER";
// }

type UserWithClass = User & {
  class: {
    id: string;
    name: string;
  } | null;
};

interface PasswordChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserWithClass;
}

export const PasswordChangeDialog = ({
  open,
  onOpenChange,
  user,
}: PasswordChangeDialogProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    startTransition(async () => {
      const res = await changePassword(newPassword, user.id);

      if (!res.success) {
        toast.error(res.error || "Something went wrong.");
        return;
      }

      const emailRes = await sendUserEmail(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          password: newPassword,
          class: user?.class?.name ?? "",
        },
        "passwordReset",
        user.role as UserRole,
        
      );

      if (!emailRes.success) {
        toast.error(`Password changed but email failed: ${emailRes.error}`);
      } else {
        toast.success("Password changed and email sent successfully");
      }

      setNewPassword("");
      onOpenChange(false);
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Change Password
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full rounded border px-3 py-2 text-sm outline-none bg-gray-100 text-gray-700"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full rounded border px-3 py-2 pr-10 text-sm outline-none focus:ring focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex justify-end">
              <Button
                className="w-32"
                onClick={handleSubmit}
                disabled={isPending || newPassword.trim() === ""}
              >
                {isPending ? "Changing..." : "Change"}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
