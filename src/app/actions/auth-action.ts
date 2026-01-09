"use server"
import { cookies } from "next/headers"

export async function SetCookieWithToken(token: string){
    const cookieStore = await cookies()

    cookieStore.set("font-easy-auth", token, {
        httpOnly: true,
        secure: true, // process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    })
}