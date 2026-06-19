"use client";

import { useProfile } from "@/app/context/ProfileContext";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";


type GoogleOAuthSchema = {
    name?: string | null | undefined;
    email: string | null | undefined;
    google_id: string | null | undefined;
    photo?: string | null | undefined;
}


export default function ProfileCard({ name, email, google_id, photo }: GoogleOAuthSchema) {
    const { user } = useProfile();

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