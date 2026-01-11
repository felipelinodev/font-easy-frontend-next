import { UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useProfile } from "../context/ProfileContext";
import Image from "next/image";


export function DropDownMenuProfileAuth() {
  const { data: session } = useSession();
  const { user } = useProfile();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const areRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const displayName = user?.name ?? session?.user?.name;
  const displayEmail = user?.email ?? session?.user?.email;
  const imageUrl = user?.photo ?? session?.user?.image ?? null;
  const displayImage = imageUrl?.startsWith('http') ? imageUrl : null;

  const handdleOpen = () => {
    setIsOpen(!isOpen);
  };
  console.log(user?.name)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (areRef.current) {
        const target = e.target as Node;

        if (!areRef.current.contains(target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={areRef} className="flex text-black-default flex-col items-center">
      <Link
        onClick={handdleOpen}
        className="h-8 w-8 bg-gray-escure rounded-full flex items-center justify-center overflow-hidden"
        href="#"
      >
        {displayImage ? (
          <Image src={displayImage} alt="Profile" width={32} height={32} className="rounded-full" />
        ) : (
          <UserRound size={18} />
        )}
      </Link>
      {isOpen && (
        <>
          <div
            className="absolute z-10 w-full min-w-[177.33px] max-w-[200.33px] top-24 rounded-2xl bg-gray-surface border-2 shadow-xl border-white">
            <div className="flex flex-col ">
              <header onClick={() => router.push('/profile')} className="p-3 flex gap-3 hover:bg-gray-escure/30 border-t-rounded-2xl hover:cursor-pointer border-b border-b-gray-escure pb-2">
                <div className="h-8 w-8 bg-gray-escure rounded-full flex items-center justify-center overflow-hidden shrink-0">
                  {displayImage ? (
                    <Image src={displayImage} alt="Profile" width={32} height={32} className="rounded-full" />
                  ) : (
                    <UserRound size={18} />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-black-default">
                    {displayName}
                  </h4>
                  <p className="text-xs text-gray-muted-contrast truncate max-w-[120px]">{displayEmail}</p>
                </div>
              </header>

              <div>
                <ul className="flex  flex-col">
                  <li>
                    <Link
                      className="block px-3 text-base hover:bg-gray-escure/50 py-1 text-black-default"
                      href="/favorite_fonts"
                    >
                      Fontes Favoritas
                    </Link>
                    <Link
                      className="block px-3 text-base hover:bg-gray-escure/50 py-1 text-black-default"
                      href="#"
                    >
                      Preferências
                    </Link>
                    <Link
                      className="block px-3 text-base hover:bg-gray-escure/50 py-1 text-black-default"
                      href="#"
                    >
                      Ajuda
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="p-3">
                <button
                  onClick={() => window.location.href = "/logout"}
                  className="border p-1 hover:bg-gray-escure hover:cursor-pointer text-sm rounded-full border-gray-escure w-full"
                >
                  Sair
                </button>
              </div>

            </div>
          </div>
        </>
      )}

    </div>
  );
}
