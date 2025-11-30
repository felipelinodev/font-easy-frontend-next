"use client";

import Headline from "@/components/svg/HeadlineHome.svg";
import { CircleArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/chatbot`);
  };

  return (
    <div className="bg-zinc-100 bg-[url(/backgroun-home-page.jpg)] bg-contain bg-no-repeat h-full justify-center flex flex-col bg-center items-center">
      <div className="m-20 flex flex-col items-center">
        <Headline
          className="w-full h-auto max-w-[810px]"
          viewBox="0 0 810 212"
        />
        <p className="text-2xl font-medium text-[#BEBEBE] p-7">
          Escolha suas fontes de uma maneira jamais vista.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-[#F07F1C] flex cursor-pointer items-center gap-2 rounded-full hover:bg-[#E9531E] p-2 text-2xl text-[#DEDFDF]"
        >
          <p className="pb-1 pl-8">Iniciar</p>
          <div className="pl-3 pr-1">
            <CircleArrowUp className="rotate-45" size={30} />
          </div>
        </button>
      </div>
    </div>
  );
}
