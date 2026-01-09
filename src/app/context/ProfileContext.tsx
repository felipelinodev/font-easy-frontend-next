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


interface ProfileContextType {
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void
    token?: string;
}

export const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileContextProvider({
    children,
    user: initialUser,
    token,
}: {
    children: React.ReactNode;
    user: UserProfile | null;
    token?: string;
}) {

    const [user, setUser] = useState<UserProfile | null>(initialUser);
    return (
        <ProfileContext.Provider value={{ user, setUser, token }}>
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