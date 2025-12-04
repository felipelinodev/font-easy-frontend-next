"use client";
import Headline from "@/components/svg/HeadlineHome.svg";
import { Circle, CircleArrowUp, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { CardInfos } from "./chatbot/components/CardInfos";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/chatbot`);
  };

  return (
    <div className="bg-zinc-100 bg-[url(/backgroun-home-page.jpg)] bg-contain bg-no-repeat h-full justify-center flex flex-col bg-center items-center">
      <div className=" flex flex-col items-center">
        <Headline
          className="w-full h-auto max-w-[810px]"
          viewBox="0 0 810 212"
        />
        <p className="text-2xl font-medium text-[#BEBEBE] p-7">
          Escolha suas fontes de uma maneira jamais vista.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-orange-500 text-neutral-200 flex mb-30 cursor-pointer items-center gap-2 rounded-full hover:bg-[#E9531E] p-2 text-2xl "
        >
          <p className="pb-1 pl-8">Iniciar</p>
          <div className="pl-3 pr-1">
            <CircleArrowUp className="rotate-45" size={30} />
          </div>
        </button>

        <div className="absolute left-110 bottom-100">
          <CardInfos
            title="Mais foco."
            subtitle="Aproveite esse tempo extra."
          />
        </div>
        <div className="absolute left-170 bottom-75">
          <CardInfos title="Mais controle." subtitle="Use sua sensibilidade." />
        </div>

        <div className="absolute right-120 bottom-90">
          <CardInfos
            title="Mais criatividade."
            subtitle="Liberte seu tempo, e pense mais"
          />
        </div>

        <div className="h-17 w-17 flex justify-center bg-white/50 backdrop-blur-sm absolute border border-white/70 bottom-10 items-center text-orange-500 rounded-[9px]">
          <Zap size={31} />
        </div>
      </div>
    </div>
  );
}
