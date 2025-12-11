"use client";
import Headline from "@/components/svg/HeadlineHome.svg";
import {
  CircleArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { CardInfos } from "./chatbot/components/CardInfos";
import { CardsArticles } from "./components/CardArticles";
import TextType from "@/components/TextType";
import { CardAtributesPreview } from "./components/CardAtributesPreview";
import Image from "next/image";
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
      <section className="flex gap-5">
        <div className="min-w-[556px] p-10 bg-[#ECECEC] shadow-xl border-2 border-white rounded-2xl">
          <Image
            src="/BgSectionFeedback.png"
            alt="Text image feedback"
            width={476.09}
            height={240.27}
            className="mb-14"
          />
          <p className="ml-9 text-xs text-[#1E1E1C] max-w-[340.23px] mb-6">
            Você pode nos seguir nas redes sociais e acompanhar as ultimas
            novidades.
          </p>

          <div className=" flex text-right flex-col ml-9 ">
            <ul className="flex gap-2">
              <li className="p-1 bg-[#D1D1D1] rounded-full">
                <Instagram size={20} />
              </li>
              <li className="p-1 bg-[#D1D1D1] rounded-full">
                <Linkedin size={20} />
              </li>
              <li className="p-1 bg-[#D1D1D1] rounded-full">
                <Mail size={20} />
              </li>
              <li className="p-1 bg-[#D1D1D1] rounded-full">
                <Facebook size={20} />
              </li>
            </ul>
          </div>
        </div>
        <form className="min-w-[357px] p-10 bg-[#ECECEC] shadow-xl border-2 border-white rounded-2xl">
          <label className="text-sm p-5 text-[#1E1E1C]" htmlFor="name">
            Digite seu nome
          </label>
          <input
            className="pl-5 bg-transparent text-[16px] border-2 placeholder:text-[16px] placeholder:text-[#1E1E1C] border-[#D1D1D1] min-h-[40px] w-full p-2 rounded-full"
            type="text"
            placeholder="Nome"
          />
        </form>
      </section>
    </div>
  );
}
