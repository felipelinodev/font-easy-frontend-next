import { Poppins } from "next/font/google";
import "./globals.css";

import { MainContextProvider } from "./context/MainContext";
import { FloatingMenu } from "@/app/components/FloatingMenu";
import { Footer } from "@/app/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" data-theme="light" className="bg-[#F4F4F4]">
      <body className={`${poppins.variable} h-screen antialiased bg-[#F4F4F4]`}>
        <MainContextProvider>
          <div className="fixed z-50 top-0 right-0 left-0">
            <FloatingMenu />
          </div>

          {children}
          <Footer />
        </MainContextProvider>
      </body>
    </html>
  );
}
