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
import { CardInfos } from "./components/CardInfos";
import { CardsArticles } from "./components/CardArticles";
import TextType from "@/components/TextType";
import SplitText from "@/components/SplitText";

import { CardAtributesPreview } from "./components/CardAtributesPreview";
import Image from "next/image";
import { InputFE } from "@/components/font-easy-ui/InputFE";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import TargetCursor from "@/components/TargetCursor";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRedirect = () => {
    router.push(`/chatbot`);
  };

  useGSAP(
    () => {

      ScrollTrigger.create({
        trigger: "#hero-section",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,

        onToggle: (self) => {
          gsap.to("#hero-section", { opacity: self.isActive ? 1 : 0, duration: 0.1 });
        }
      });

      gsap.fromTo("#next-section",
        {
          yPercent: 30,
        },
        {
          yPercent: 0,
          scrollTrigger: {
            trigger: "#next-section",
            start: "top bottom",
            end: "top top",
            scrub: 1,
          }
        }
      );

      gsap.to(".float-card", {
        y: -150,
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="bg-test justify-center flex flex-col items-center">
      <TargetCursor
        spinDuration={2.2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />

      <div id="hero-section" className="bg-center w-full h-screen bg-[url(/backgroun-home-page.jpg)] bg-contain bg-no-repeat flex flex-col items-center pt-50 z-0">
        <div className="w-full max-w-[810px]">
          <Headline
            className="w-full h-auto block" // Garante que o SVG preencha a div
            viewBox="0 0 810 212"
          />
        </div>
        {/* <p className="text-2xl font-medium text-[#BEBEBE] p-7"> */}
        <TextType
          className="text-2xl font-medium text-gray-muted-contrast p-7"
          text={["Escolha suas fontes de uma maneira jamais vista."]}
          typingSpeed={35}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />

        {/* </p> */}
        <button
          onClick={handleRedirect}
          className="bg-primary-orange animate-pulse-ring transition duration-300 ease-in-out cursor-pointer hover:scale-110 text-white-default flex items-center gap-2 rounded-full hover:bg-[#E9531E] p-2 text-2xl "
        >
          <p className="pb-1 pl-8">Iniciar</p>
          <div className="pl-3 pr-1">
            <CircleArrowUp className="rotate-45" size={30} />
          </div>
        </button>
        <div>
          <div className="float-card relative right-100 bottom-30">
            <CardInfos
              title="Mais foco."
              subtitle="Aproveite esse tempo extra."
            />
          </div>
          <div className="float-card relative right-45 bottom-30">
            <CardInfos
              title="Mais controle."
              subtitle="Use sua sensibilidade."
            />
          </div>

          <div className="float-card relative left-100 bottom-60">
            <CardInfos
              title="Mais criatividade."
              subtitle="Liberte seu tempo, e pense mais"
            />
          </div>

          <div className="float-card h-17 w-17 flex justify-center bg-white/50 backdrop-blur-sm relative border border-white/70 -top-10 ml-16 items-center text-primary-orange rounded-[9px]">
            <Zap size={31} />
          </div>
        </div>
      </div>
      <section id="next-section" className="rounded-t-4xl min-h-screen w-full bg-[#F4F4F4] relative z-10 pt-10 ">
        <article className="flex items-center flex-col">
          {/* <h1 className="text-4xl font-bold p-11 text-primary-orange">
            Sobre nós
          </h1> */}
          <SplitText
            text="Sobre nós"
            className="text-4xl font-bold p-11 text-primary-orange"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"

          />

          <p className="text-2xl font-normal text-black-default max-w-[574px] text-center">
            Somos uma plataforma que permite escolher fontes de forma inovadora,
            com o uso de inteligência artificial.
          </p>
        </article>
        <div className="mt-12 flex flex-col items-center">
          <CardsArticles />
        </div>
      </section>
      <section className="flex w-full justify-center h-full gap-5 p-30">
        <div>
          <p className="text-primary-orange text-2xl max-w-96 mb-16">
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
      <section className="flex gap-5 my-40">
        <div className="min-w-[556px] p-10 bg-gray-surface shadow-xl border-2 border-white rounded-2xl">
          <Image
            src="/BgSectionFeedback.png"
            alt="Text image feedback"
            width={476.09}
            height={240.27}
            className="mb-14"
          />
          <p className="ml-9 text-xs text-black-default max-w-[340.23px] mb-6">
            Você pode nos seguir nas redes sociais e acompanhar as ultimas
            novidades.
          </p>

          <div className=" flex text-right flex-col ml-9 ">
            <ul className="flex gap-2">
              <li className="p-2 cursor-pointer bg-gray-escure rounded-full">
                <Instagram size={20} />
              </li>
              <li className="p-2 cursor-pointer bg-gray-escure rounded-full">
                <Linkedin size={20} />
              </li>
              <li className="p-2 cursor-pointer bg-gray-escure rounded-full">
                <Mail size={20} />
              </li>
              <li className="p-2 cursor-pointer bg-gray-escure rounded-full">
                <Facebook size={20} />
              </li>
            </ul>
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="min-w-[357px] bg-gray-surface shadow-xl border-2  border-white rounded-2xl"
        >
          <Image
            src="/BgSectionTopFeedback.png"
            alt="image smils top feedback"
            width={352.85}
            height={102}
            className="mb-3 rounded-t-2xl w-full border border-b-gray-escure"
          />
          <div className="px-5">
            <InputFE
              label="Digite seu nome"
              className="mb-3"
              placeholder="Nome"
              id="name"
            />
            <InputFE label="Digite seu email" placeholder="Email" id="email" />
          </div>
          <div className="p-5">
            <textarea
              placeholder="Poderia melhorar"
              className="
    text-black-default pl-5 pt-2 bg-gray-muted-primary/24 p-2 border placeholder:text-black-default min-h-24 focus:outline-black-default focus:outline-offset-1  focus:placeholder:text-black/44 border-gray-escure rounded-2xl w-full
  "
            />
            <button
              type="button"
              onClick={handleRedirect}
              className="bg-primary-orange cursor-pointer w-full text-center text-white-default rounded-full hover:bg-primary-orange-two p-2 text-[18px] "
            >
              Enviar feedback
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}