import { UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function DropDownMenuProfile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const areRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handdleOpen = () => {
    setIsOpen(!isOpen);
  };

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
        className="h-8 w-8  bg-gray-escure rounded-full flex items-center justify-center"
        href="#"
      >
        <UserRound size={18} />
      </Link>
      {isOpen && (
        <div
          id="drow-down"
          className="absolute z-10 w-full max-w-[177.33px] top-24 rounded-2xl bg-gray-surface border-2 shadow-xl border-white"
        >
          <div>
            <header className="border-b border-b-gray-escure p-3 flex justify-end">
              <Link href="#" className="underline text-sm">
                Ajuda
              </Link>
            </header>
            <p className="text-sm max-w-28 pl-3 pt-2">
              Faça login Pra salvar suas fontes Favoritas
            </p>
          </div>
          <div className="p-2">
            <button
              onClick={handleLogin}
              className="border mb-1 hover:bg-gray-escure hover:cursor-pointer text-sm p-1 rounded-full border-gray-escure w-full"
            >
              Entrar
            </button>
            <button className=" hover:bg-gray-escure hover:cursor-pointer text-sm p-1 rounded-full  w-full">
              <Link href="/signup">
                Criar conta
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
