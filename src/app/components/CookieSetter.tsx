"use client";

import { useEffect } from "react";
import { SetCookieWithToken } from "@/app/actions/auth-action";

export function CookieSetter({ token }: { token: string }) {
    useEffect(() => {
        if (token) {
            SetCookieWithToken(token).catch(console.error);
        }
    }, [token]);

    return null;
}
