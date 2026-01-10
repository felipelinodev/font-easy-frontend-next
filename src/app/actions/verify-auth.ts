"use server"
import { getServerSession } from "next-auth";
import { cookies } from "next/headers"
import { authOptions } from "@/lib/auth";

export async function verifyIfUserAuth(){
      const API_URL = process.env.BACKEND_URL!;
      const session = await getServerSession(authOptions);
      const cookiesList = await cookies()
      const authCookie = cookiesList.get("font-easy-auth")?.value;
    
    
      const res = await fetch(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${authCookie}`
        },
        cache: 'no-store',
      });
       console.log("Resposta da API:", res.status, res.ok) // Log no 
    
      return res.ok || session ? true : false;
}