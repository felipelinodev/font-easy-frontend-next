import { getServerSession } from "next-auth";
import ProfileCard from "./components/ProfileCard";
import { authOptions } from "@/lib/auth";


export default async function Profile() {
    const session = await getServerSession(authOptions)


    return (
        <>
            <ProfileCard
                name={session?.user?.name}
                email={session?.user?.email}
                google_id={session?.user.id}
                photo={session?.user?.image}
            />
        </>
    )
}
