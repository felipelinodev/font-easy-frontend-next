import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const allCookies = await cookies();
    const authCookie = allCookies.has("font-easy-auth");

    if (!authCookie) {
        return redirect("/login");
    }

    const res = await fetch("http://localhost:5000/profile", {
        headers: {
            cookie: allCookies.toString(),
        },
        cache: "no-store",
    });

    if (!res.ok) {
        return redirect("/login");
    }

    return (
        <>
            {children}
        </>


    );
}
