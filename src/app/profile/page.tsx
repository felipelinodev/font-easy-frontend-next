import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


export default async function Profile() {
    const session = await getServerSession()

    if (!session) {
        redirect('/')
    }
    return (
        <div className="m-100 text-center">
            <h3>{session.user?.name}</h3>
            <p>{session.user?.email}</p>
            <p>{session.user?.image}</p>

        </div>
    )
}