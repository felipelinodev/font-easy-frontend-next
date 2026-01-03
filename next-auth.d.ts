// Source - https://stackoverflow.com/a
// Posted by Salman Patni
// Retrieved 2026-01-03, License - CC BY-SA 4.0

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }
}