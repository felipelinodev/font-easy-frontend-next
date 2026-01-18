import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const API_URL = process.env.BACKEND_URL!;

    const session = await getServerSession(authOptions);
    const cookiesList = await cookies();
    const authCookie = cookiesList.get("font-easy-auth")?.value;


    if (!authCookie && !session) { return redirect("/login"); }


    if (!session) {
        const res = await fetch(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${authCookie}`
            },
            cache: 'no-store',
        });

        if (!res.ok) { return redirect("/login"); }
    }

    return (
        <>
            {children}
        </>
    )
}