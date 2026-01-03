import { getServerSession } from "next-auth";
import ProfileCard from "./components/ProfileCard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


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
