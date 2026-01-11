
import Link from "next/link";
import { ExternalLink, LogOut, UserRound } from "lucide-react";
import Image from "next/image";

type ProfileHeaderProps = {
    username?: string;
    email?: string;
    photo?: string;
}

export default function ProfileHeader({ username, email, photo }: ProfileHeaderProps) {

    return (
        <>
            <section className="w-96 rounded-2xl border-2 flex flex-col border-white shadow-xl bg-gray-surface">
                <div className="flex p-1.5 gap-4 items-center">
                    <div className="w-16 h-16 bg-gray-escure rounded-[10px] flex justify-center items-center">
                        {photo && photo ? (
                            <Image
                                src={photo}
                                alt="profile photo"
                                width={96}
                                height={96}
                                quality={90}
                                sizes="96px"
                                className="rounded-[10px]"
                            />

                        ) : (
                            <UserRound className="text-[#1E1E1C]" />
                        )}
                    </div>
                    <div className="flex pr-2 flex-1 items-center justify-between">
                        <div className="flex flex-col items-start">
                            <h4 className="text-sm text-black-default font-medium">{username}</h4>
                            <h4 className="text-sm text-gray-muted-contrast font-regular">{email}</h4>
                        </div>
                        <Link href='/logout'>
                            <LogOut size={17} className="text-gray-muted-contrast" />
                        </Link>

                    </div>
                </div>
                <div className="bg-gray-muted-primary/70 p-4 flex justify-center rounded-b-2xl">
                    <Link href="/favorite_fonts" className="text-sm underline flex gap-1 items-center text-black-default font-medium">
                        Fontes favoritas <ExternalLink size={17} />
                    </Link>
                </div>
            </section>
            <section>
            </section>
        </>
    )
}