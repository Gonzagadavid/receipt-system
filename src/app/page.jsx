import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Routes, routesInfo } from "@/constants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-wrap justify-around">
        {Object.keys(routesInfo).map((route) => (
          <Link key={route} href={route}>
            <Card className="bg-primary px-8 py-4 m-6 w-96">
              <CardContent className="flex justify-center">
                {routesInfo[route].icon}
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-2xl align-center">
                  {routesInfo[route].label}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
