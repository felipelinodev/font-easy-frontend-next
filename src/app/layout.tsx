import { Poppins } from "next/font/google";
import "./globals.css";

import { MainContextProvider } from "./context/MainContext";
import { ProfileContextProvider } from "./context/ProfileContext";
import { FloatingMenu } from "@/app/components/FloatingMenu";
import { Footer } from "@/app/components/Footer";
import { Providers } from "@/app/components/Providers";
import { cookies } from "next/headers";
import { getFavoriteFont } from "@/lib/RequetsApiNode";

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

  // Pega o cookie de auth
  const cookiesList = await cookies();
  const authCookie = cookiesList.get("font-easy-auth")?.value;

  // Busca dados do usuario se tiver cookie
  let userData = null;
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
  }

  let favoriteFonts
  try {
    const response = await getFavoriteFont(authCookie!)
    favoriteFonts = response
  } catch (error) {
    console.log(error)
  }

  return (
    <html lang="pt-br" data-theme="light" className="bg-[#F4F4F4]">
      <body className={`${poppins.variable} h-screen antialiased bg-[#F4F4F4]`}>
        <Providers>
          <ProfileContextProvider user={userData} token={authCookie} favoriteFonts={favoriteFonts}>
            <MainContextProvider>
              <div className="fixed z-50 top-0 right-0 left-0">
                <FloatingMenu />
              </div>

              {children}
              <Footer />
            </MainContextProvider>
          </ProfileContextProvider>
        </Providers>
      </body>
    </html>
  );
}
