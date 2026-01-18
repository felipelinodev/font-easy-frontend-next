"use client";

import { useProfile } from "@/app/context/ProfileContext";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import { useEffect } from "react";
import { loginWithGoogleRequest, registerGoogleUserRequest } from "@/lib/RequetsApiNode";
import { SetCookieWithToken } from "@/app/actions/auth-action";


type GoogleOAuthSchema = {
    name?: string | null | undefined;
    email: string | null | undefined;
    google_id: string | null | undefined;
    photo?: string | null | undefined;
}


export default function ProfileCard({ name, email, google_id, photo }: GoogleOAuthSchema) {
    const { user, setToken } = useProfile();

    useEffect(() => {
        const syncGoogleUser = async () => {
            if (google_id && email) {
                try {
                    await registerGoogleUserRequest({
                        name: name ?? "",
                        email: email ?? "",
                        google_id: google_id ?? "",
                        photo: photo ?? ""
                    });

                    const res = await loginWithGoogleRequest({ google_id })
                    await SetCookieWithToken(res.tokenAuth);
                    setToken(res.tokenAuth)

                } catch (error) {
                    console.log(error)
                }
            }
        }
        syncGoogleUser()
    }, [google_id])
    return (
        <div className="m-50 flex flex-col gap-4 justify-center items-center">
            {google_id ? (
                <>
                    <ProfileHeader
                        username={name ?? ''}
                        email={email ?? ''}
                        photo={photo ?? ''}
                    />
                </>
            ) : (
                <>
                    <ProfileHeader
                        username={user?.name ?? ''}
                        email={user?.email ?? ''}
                    />
                </>
            )}
            {!google_id ? <ProfileBody username={user?.name} email={user?.email} /> : ''}
        </div>
    )
}