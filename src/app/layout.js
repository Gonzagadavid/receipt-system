import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import LogoutButton from "@/components/custom/LogutButton";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Receipt System",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/basket.svg" type="image/svg+xml"></link>
      <body className={inter.className}>
        <header className="pt-4 flex justify-end">
          <LogoutButton />
        </header>
        <SessionProvider
          refetchOnWindowFocus={false}
          refetchWhenOffline={false}
        >
          <ThemeProvider attribute="class" theme="dark">
            {children}
          </ThemeProvider>
          <Toaster position="top-center" richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
