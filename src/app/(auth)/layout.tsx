
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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

    return <>{children}</>
}
