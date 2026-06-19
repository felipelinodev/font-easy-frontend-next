import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const API_URL = process.env.BACKEND_URL!;
        try {
          // Registra ou atualiza o usuário Google no backend
          await fetch(`${API_URL}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name ?? "",
              email: user.email ?? "",
              google_id: user.id ?? "",
              photo: user.image ?? "",
            }),
          });

          // Faz login no backend para obter o JWT token
          const loginRes = await fetch(`${API_URL}/auth/google/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ google_id: user.id }),
          });

          if (loginRes.ok) {
            const data = await loginRes.json();
            // Armazena o token do backend no objeto user para ser acessível no callback jwt
            (user as any).backendToken = data.tokenAuth;
          }
        } catch (error) {
          console.error("Erro ao sincronizar usuário Google com o backend:", error);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Propaga o token do backend para o JWT do NextAuth
        if ((user as any).backendToken) {
          token.backendToken = (user as any).backendToken;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      // Expõe o token do backend na session
      (session as any).backendToken = token.backendToken as string | undefined;
      return session;
    }
  }
};
