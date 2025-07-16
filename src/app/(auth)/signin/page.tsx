import SignInForm from "@/components/Form/signInForm";
import { nextauthOptions } from "@/lib/utils/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface SignInPageProps {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const { callbackUrl } = await searchParams;
  const session = await getServerSession(nextauthOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <SignInForm callbackUrl={callbackUrl || "/"} />
    </div>
  );
};

export default SignInPage;
