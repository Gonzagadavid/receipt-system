"use client";
import { Menu as MenuIcon, Home } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Routes, routesInfo } from "@/constants/routes";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const { data } = useSession();
  const pathname = usePathname();

  const render = pathname !== Routes.root && pathname !== Routes.login;
  const routes = useMemo(
    () =>
      Object.keys(routesInfo).map((route) =>
        routesInfo[route].role.includes(data?.role) ? (
          <Link key={route} href={route}>
            <DrawerClose className="flex p-5 items-end">
              {routesInfo[route].icon(
                30,
                pathname === route ? "secondary" : "primary"
              )}
              <p
                className={`ml-4 text-${pathname === route ? "secondary" : "primary"}`}
              >
                {routesInfo[route].label}
              </p>
            </DrawerClose>
          </Link>
        ) : null
      ),
    [data?.role, pathname]
  );
  return render ? (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <MenuIcon size={40} className="ml-4 text-primary" />
      </DrawerTrigger>
      <DrawerContent className="flex w-[20%] h-full">
        <div className="mt-10">
          <Link key={Routes.root} href={Routes.root}>
            <DrawerClose className="flex p-5 items-end">
              <Home className="text-primary" />
              <p className="ml-4 text-primary">Página inicial</p>
            </DrawerClose>
          </Link>
          {routes}
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <div></div>
  );
}
