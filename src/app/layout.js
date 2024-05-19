import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import LogoutButton from "@/components/custom/LogutButton";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";
const Menu = dynamic(() => import("@/components/custom/Menu", { ssr: false }));
const Title = dynamic(
  () => import("@/components/custom/Title", { ssr: false }),
);

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Receipt System",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider
          refetchOnWindowFocus={false}
          refetchWhenOffline={false}
        >
          <ThemeProvider attribute="class" theme="dark">
            <header className="pt-4 flex justify-between items-center h-[10vh]">
              <Menu />
              <Title />
              <LogoutButton />
            </header>
            <div className="h-[90vh]">{children}</div>
          </ThemeProvider>
          <Toaster position="top-center" richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
