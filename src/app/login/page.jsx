import LoginForm from "@/components/custom/LoginForm";
import { auth } from "../api/auth/auth";
import { validateExp } from "@/utils/validateExp";
import { redirect } from "next/navigation";
import { Routes } from "@/constants/routes";
import dynamic from "next/dynamic";

const ExpiresModal = dynamic(
  () => import("@/components/custom/ExpiresModal", { ssr: false })
);

export default async function LoginPage() {
  const session = await auth();
  if (session && validateExp(session.expires)) {
    redirect(Routes.root);
  }
  return (
    <div className="flex items-center justify-center w-full  flex-col ">
      <ExpiresModal />
      <LoginForm />
    </div>
  );
}
