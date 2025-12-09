"use client";
import Headline from "@/components/svg/HeadlineHome.svg";
import { CircleArrowUp, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { CardInfos } from "./chatbot/components/CardInfos";
import { CardsArticles } from "./components/CardArticles";
import TextType from "@/components/TextType";
import { CardAtributesPreview } from "./components/CardAtributesPreview";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/chatbot`);
  };

  return (
    <div className=" justify-center flex flex-col  items-center">
      <div className=" bg-zinc-100 bg-center w-full bg-[url(/backgroun-home-page.jpg)] bg-contain bg-no-repeat flex flex-col items-center mt-50">
        <Headline
          className="w-full h-auto max-w-[810px]"
          viewBox="0 0 810 212"
        />
        {/* <p className="text-2xl font-medium text-[#BEBEBE] p-7"> */}
        <TextType
          className="text-2xl font-medium text-[#BEBEBE] p-7"
          text={["Escolha suas fontes de uma maneira jamais vista."]}
          typingSpeed={35}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
        {/* </p> */}
        <button
          onClick={handleRedirect}
          className="bg-orange-500 transition duration-300 ease-in-out cursor-pointer hover:scale-110 text-neutral-200 flex items-center gap-2 rounded-full hover:bg-[#E9531E] p-2 text-2xl "
        >
          <p className="pb-1 pl-8">Iniciar</p>
          <div className="pl-3 pr-1">
            <CircleArrowUp className="rotate-45" size={30} />
          </div>
        </button>
        <div>
          <div className="animate-bounce relative right-100 bottom-30">
            <CardInfos
              title="Mais foco."
              subtitle="Aproveite esse tempo extra."
            />
          </div>
          <div className="animate-bounce relative right-45 bottom-30">
            <CardInfos
              title="Mais controle."
              subtitle="Use sua sensibilidade."
            />
          </div>

          <div className="animate-bounce relative left-100 bottom-60">
            <CardInfos
              title="Mais criatividade."
              subtitle="Liberte seu tempo, e pense mais"
            />
          </div>

          <div className="h-17 w-17 flex justify-center bg-white/50 backdrop-blur-sm relative border border-white/70 -top-10 ml-16 items-center text-orange-500 rounded-[9px]">
            <Zap size={31} />
          </div>
        </div>
      </div>
      <section className=" max-h-[1063.72px] w-full bg-[#F4F4F4]">
        <article className="flex items-center flex-col">
          <h1 className="text-4xl font-bold p-11 text-[#F07F1C]">Sobre nós</h1>
          <p className="text-2xl font-normal text-[#1E1E1C] max-w-[574px] text-center">
            Somos uma plataforma que permite escolher fontes de forma inovadora,
            com o uso de inteligência artificial.
          </p>
        </article>
        <div className="mt-12 flex mb-20 flex-col items-center">
          <CardsArticles />
        </div>
      </section>
      <section className="flex w-full justify-center h-full gap-5 p-30">
        <div>
          <p className="text-[#F07F1C] text-2xl max-w-96 mb-16">
            <span className="font-bold">A excelência</span> no design surge da
            harmonia entre <span className="font-bold"> sensibilidade </span> e
            <span className="font-bold"> precisão.</span>
          </p>
          <CardAtributesPreview
            title1="Use sua"
            title2="sensibilidade."
            BottomDescription="Escolha de acordo com sua intuição e transmita sua essência."
            ImageSrc="/PreviewCardRange.jpg"
          />
        </div>
        <div className="flex flex-col gap-5">
          <CardAtributesPreview
            title1="Deixa que a IA"
            title2="resolve."
            BottomDescription="Poupe tempo e jogue na mão da IA que ela da conta do recado."
            ImageSrc="/PreviewCardTextarea.jpg"
          />
          <CardAtributesPreview
            title1="Seja assertivo"
            title2="na escolha."
            BottomDescription="A excelência nasce de escolhas precisas: menos 
            erros, mais acertos, sucesso garantido."
            ImageSrc="/PreviewCardFontWight.jpg"
          />
        </div>
      </section>
    </div>
  );
}
