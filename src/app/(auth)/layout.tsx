// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";
// import { ProfileContextProvider } from "../context/ProfileContext";

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export default async function RootLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {

//     const API_URL = process.env.BACKEND_URL!;

//     // pega a sessão do googel meu fi
//     const session = await getServerSession(authOptions);
//     const cookiesList = await cookies();
//     const authCookie = cookiesList.has("font-easy-auth");

//     if (!authCookie && !session) { return redirect("/login"); }

//     let userData;

//     if (session) {
//         userData = session.user
//     } else {
//         const res = await fetch(`${API_URL}/profile`, {
//             headers: {
//                 cookie: cookiesList.toString(),
//             },
//             cache: 'no-store',
//             credentials: 'include',
//         });

//         if (!res.ok) { return redirect("/login"); }

//         const text = await res.text();

//         let user;

//         try {
//             user = JSON.parse(text);
//         } catch (e) {
//             return redirect("/login");
//         }

//         userData = user?.user || user;
//     }




//     return (
//         <ProfileContextProvider user={userData}>
//             {children}
//         </ProfileContextProvider>
//     )
// }
