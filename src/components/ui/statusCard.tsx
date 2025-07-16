import { ProfileStatus } from "@prisma/client";
import { Clock, FileWarning, ShieldCheck, CheckCircle, XCircle } from "lucide-react";
import { JSX } from "react";

interface StatusCardProps {
  status: ProfileStatus;
}

const statusConfig: Record<ProfileStatus, {
  title: string;
  message: string;
  icon: JSX.Element;
  bgColor: string;
  borderColor: string;
  textColor: string;
  note?: string;
}> = {
  [ProfileStatus.UNDER_REVIEW]: {
    title: "Profile Under Review",
    message: "Your account has been created successfully! Your profile is currently under review.",
    icon: <Clock className="w-5 h-5 text-yellow-500" />,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
    note: "We'll notify you via email once your profile has been approved.",
  },
  [ProfileStatus.PENDING_DOCUMENTS]: {
    title: "Pending Documents",
    message: "We need additional documents to verify your account.",
    icon: <FileWarning className="w-5 h-5 text-orange-500" />,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    note: "Please upload the required documents to proceed.",
  },
  [ProfileStatus.PENDING_ACTIVATION]: {
    title: "Pending Activation",
    message: "Your documents have been received and are being verified.",
    icon: <ShieldCheck className="w-5 h-5 text-blue-500" />,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    note: "Your profile will be activated once verification is complete.",
  },
  [ProfileStatus.ACTIVE]: {
    title: "Profile Active",
    message: "Your profile is now active and fully approved.",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    note: "You can now access all features of the platform.",
  },
  [ProfileStatus.REJECTED]: {
    title: "Profile Rejected",
    message: "Unfortunately, your profile did not pass the verification process.",
    icon: <XCircle className="w-5 h-5 text-red-500" />,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    note: "Please review the reasons and reapply if needed.",
  },
};

export function StatusCard({ status }: StatusCardProps) {
  const config = statusConfig[status];

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{config.title}</h3>
      <p className="text-gray-600 mb-4">{config.message}</p>

      <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4 mb-6`}>
        <div className="flex items-center justify-center space-x-2">
          {config.icon}
          <span className={`${config.textColor} font-medium`}>
            Status: {ProfileStatus[status].replace(/_/g, " ")}
          </span>
        </div>
        {config.note && (
          <p className={`${config.textColor} text-sm mt-2`}>
            {config.note}
          </p>
        )}
      </div>
    </div>
  );
}
