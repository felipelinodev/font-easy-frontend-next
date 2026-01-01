
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const cookiesList = await cookies();
    const authCookie = cookiesList.has("font-easy-auth");

    if (!authCookie) {
        return redirect("/login");
    }

    const res = await fetch("http://localhost:5000/profile", {
        headers: {
            cookie: cookiesList.toString(),
        },
        cache: 'no-store',
        credentials: 'include',
    });

    if (!res.ok) {
        console.log("Error fetching profile in layout:", res.status, res.statusText);
        const text = await res.text();
        console.log("Response body:", text);
        return redirect("/login");
    }

    return <>{children}</>
}
