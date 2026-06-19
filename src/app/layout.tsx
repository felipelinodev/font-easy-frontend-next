import { Poppins } from "next/font/google";
import "./globals.css";

import { MainContextProvider } from "./context/MainContext";
import { ProfileContextProvider } from "./context/ProfileContext";
import { FloatingMenu } from "@/app/components/FloatingMenu";
import { Footer } from "@/app/components/Footer";
import { Providers } from "@/app/components/Providers";
import { cookies } from "next/headers";
import { getFavoriteFont } from "@/lib/RequetsApiNode";
import Link from "next/link";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CookieSetter } from "@/app/components/CookieSetter";

export const metadata: Metadata = {
  title: "Font Easy",
  description: "Escolha suas fontes de uma maneira jamais vista.",
  icons: {
    icon: "/favicon.ico?v=2",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);
  const cookiesList = await cookies();
  let authCookie = cookiesList.get("font-easy-auth")?.value;

  // Se o usuário logou com Google e o cookie ainda não existe,
  // usa o backendToken da sessão NextAuth
  let needsCookieSet = false;
  if (!authCookie && session && (session as any).backendToken) {
    authCookie = (session as any).backendToken;
    needsCookieSet = true;
  }

  let userData = null;
  let favoriteFonts;

  if (authCookie) {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/profile`, {
        headers: { Authorization: `Bearer ${authCookie}` },
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        userData = data?.user || data;
      }
    } catch (e) { }

    try {
      const response = await getFavoriteFont(authCookie!)
      favoriteFonts = response
    } catch (error) {
      console.log(error)
    }
  }






  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${poppins.variable} h-screen antialiased bg-white-full text-black-default transition-colors duration-300`}>
        <Providers>
          <ProfileContextProvider user={userData} token={authCookie} favoriteFonts={favoriteFonts}>
            <MainContextProvider>
              <div id="floating-menu-wrapper" className="fixed z-50 top-0 right-0 left-0">
                <FloatingMenu />
              </div>
              <Link href="/chatbot" className="flex items-center justify-center fixed bottom-10 right-10 w-16 h-16 rounded-full bg-primary-orange bg-[url(/LogoOnly.png)] bg-no-repeat bg-size-[60%] bg-center shadow-lg z-50 hover:scale-105 transition-transform duration-300">
              </Link>
              {children}
              <Footer />
            </MainContextProvider>
          </ProfileContextProvider>
        </Providers>
        {needsCookieSet && <CookieSetter token={authCookie!} />}
      </body>
    </html>
  );
}
