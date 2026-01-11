import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ProfileContextProvider } from "../context/ProfileContext";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getFavoriteFont } from "@/lib/RequetsApiNode";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const API_URL = process.env.BACKEND_URL!;

    // pega a sessão do googel meu fi
    const session = await getServerSession(authOptions);
    const cookiesList = await cookies();
    const authCookie = cookiesList.get("font-easy-auth")?.value;

    if (!authCookie && !session) { return redirect("/login"); }

    let userData;
    let favoriteFonts;




    if (session) {
        userData = session.user
        try {
            const response = await getFavoriteFont(authCookie!)
            favoriteFonts = response
        } catch (error) {
            console.log(error)
        }
    } else {


        const res = await fetch(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${authCookie}`
            },
            cache: 'no-store',
        });

        if (!res.ok) { return redirect("/login"); }

        const text = await res.text();

        let user;

        try {
            user = JSON.parse(text);
        } catch (e) {
            return redirect("/login");
        }

        userData = user?.user || user;
        try {
            const response = await getFavoriteFont(authCookie!)
            favoriteFonts = response
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <ProfileContextProvider user={userData} token={authCookie} favoriteFonts={favoriteFonts}>
            {children}
        </ProfileContextProvider>
    )
}