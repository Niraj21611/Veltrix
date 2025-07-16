"use client";

import  CreateStudentForm  from "@/components/admin/students/create-student-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateStudentPage() {
  return (
    <div className="space-y-6">
      <CreateStudentForm />
    </div>
  );
}
