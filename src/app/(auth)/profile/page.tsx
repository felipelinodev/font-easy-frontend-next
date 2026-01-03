"use client";

import { useProfile } from "@/app/context/ProfileContext";
import ProfileHeader from "./components/ProfileHeader";
import ProfileBody from "./components/ProfileBody";

// import { redirect } from "next/navigation";

export default function Profile() {
    const { user } = useProfile();
    console.log("CLIENT PROFILE PAGE: User from context:", user);

    // const session = await getServerSession()

    // if (!session) {
    //     redirect('/')
    // }
    return (
        <div className="m-50 flex flex-col gap-4 justify-center items-center">
            <ProfileHeader
                username={user?.name}
                email={user?.email}
                photo='/profilePreview.webp'
            />
            <ProfileBody username={user?.name} email={user?.email} />
        </div>
    )
}