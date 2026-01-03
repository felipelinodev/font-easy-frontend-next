
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ProfileContextProvider } from "../context/ProfileContext";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const API_URL = await process.env.BACKEND_URL!;

    const cookiesList = await cookies();
    const authCookie = cookiesList.has("font-easy-auth");

    if (!authCookie) {
        return redirect("/login");
    }

    const res = await fetch(`${API_URL}/profile`, {
        headers: {
            cookie: cookiesList.toString(),
        },
        cache: 'no-store',
        credentials: 'include',
    });

    if (!res.ok) {
        return redirect("/login");
    }

    const text = await res.text();


    let user;
    try {
        user = JSON.parse(text);
    } catch (e) {
        console.error("SERVER LAYOUT: Failed to parse JSON", e);

        return redirect("/login");
    }

    const userData = user?.user || user;


    return (
        <ProfileContextProvider user={userData}>
            {children}
        </ProfileContextProvider>
    )
}
