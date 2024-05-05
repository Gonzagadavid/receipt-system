"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { routesInfo } from "@/constants/routes";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
export default function NavContainer() {
  const { data } = useSession();
  const routes = useMemo(
    () =>
      Object.keys(routesInfo).map((route) =>
        routesInfo[route].role.includes(data?.role) ? (
          <Link key={route} href={route}>
            <Card className="bg-secondary px-8 py-4 m-6 w-96 text-primary">
              <CardContent className="flex justify-center">
                {routesInfo[route].icon(100)}
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-2xl align-center">
                  {routesInfo[route].label}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ) : null,
      ),
    [data?.role],
  );
  return (
    <div className="flex w-[94%] flex-wrap justify-self-center">{routes}</div>
  );
}
