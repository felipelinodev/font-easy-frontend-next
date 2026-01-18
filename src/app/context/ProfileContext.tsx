"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserProfile = {
    id?: number;
    name: string;
    email: string;
    photo?: string;
    plan_type?: string;
    favorite_fonts?: string[];
    google_id?: string;
};

type FavoriteFont = {
    id_font: number,
    font_name: string,
    font_variations?: number,
    font_type?: string,
    fontlinks?: { font_link: string }[]
}

interface ProfileContextType {
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void
    token?: string;
    setToken: (token: string) => void
    favoriteFonts: FavoriteFont[];
    setFavoriteFonts: (fonts: FavoriteFont[]) => void;
}

export const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileContextProvider({
    children,
    user: initialUser,
    token: initialToken,
    favoriteFonts: initialFavoriteFonts = [],
}: {
    children: React.ReactNode;
    user: UserProfile | null;
    token?: string;
    favoriteFonts?: FavoriteFont[];
}) {

    const [user, setUser] = useState<UserProfile | null>(initialUser);
    const [token, setToken] = useState<string | undefined>(initialToken)
    const [favoriteFonts, setFavoriteFonts] = useState<FavoriteFont[]>(initialFavoriteFonts)

    return (
        <ProfileContext.Provider value={{ user, setUser, token, setToken, favoriteFonts, setFavoriteFonts }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === null) {
        throw new Error("useProfile deve ser usado dentro de um ProfileContextProvider");
    }
    return context;
}