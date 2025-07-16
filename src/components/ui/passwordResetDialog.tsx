"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { changePassword } from "@/lib/actions/auth.actions";
import { toast } from "sonner";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof schema>;

interface PasswordResetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export function PasswordResetDialog({
  open,
  onOpenChange,
  userId,
}: PasswordResetDialogProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (values: PasswordFormValues) => {
    startTransition(async () => {
      const res = await changePassword(values.currentPassword, values.newPassword, userId);

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success("Password changed successfully");
      reset();
      onOpenChange(false);
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-lg font-semibold">Change Password</Dialog.Title>
            <Dialog.Close asChild>
              <button>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </Dialog.Close>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type="password"
                placeholder="Current Password"
                {...register("currentPassword")}
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.currentPassword.message}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="New Password"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.newPassword.message}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Confirm New Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending || !isValid}>
                {isPending ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
