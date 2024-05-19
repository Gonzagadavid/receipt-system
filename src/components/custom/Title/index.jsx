"use client";

import { routesInfo } from "@/constants/routes";
import { usePathname } from "next/navigation";

export default function Title() {
  const pathname = usePathname();
  const label = routesInfo?.[pathname]?.label;

  return <h1 className="text-4xl text-primary m-8">{label ?? ""}</h1>;
}
