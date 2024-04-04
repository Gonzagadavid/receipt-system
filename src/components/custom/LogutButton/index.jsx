"use client";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { logout } from "@/lib/actions";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function LogoutButton() {
  const pathname = usePathname();

  return pathname === Routes.login ? null : (
    <form action={logout}>
      <Button className="mr-4" variant="link">
        <LogOut size={40} />
      </Button>
    </form>
  );
}
