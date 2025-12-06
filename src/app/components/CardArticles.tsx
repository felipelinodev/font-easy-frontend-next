import { ArrowRight, Bolt, Brain, Shuffle } from "lucide-react";
import Link from "next/link";

export const CardsArticles = () => {
  return (
    <div className="flex gap-6">
      <article className="transition duration-300 ease-in-out hover:scale-115 cursor-pointer min-w-3xs max-w-3xs rounded-2xl border-2 max shadow-xl border-white bg-[#EFEFEF] p-6">
        <div className="h-12 flex items-center text-[#F07F1C] justify-center bg-[#FFDCC6] rounded-[8px] w-12">
          <Bolt size={20} />
        </div>
        <h3 className="text-2xl text-[#1E1E1C] font-semibold py-6">
          Produtividade.
        </h3>
        <p className=" text-[#1E1E1C] text-xs pb-4">
          Não perca, horas para escolher suas fontes.
        </p>
        <Link href="#">
          <div className="bg-[#D1D1D1] h-8 flex items-center justify-end rounded-full">
            <ArrowRight className="mr-3 text-[#BEBEBE]" />
          </div>
        </Link>
      </article>
      <article className="transition duration-300  ease-in-out hover:scale-115 cursor-pointer min-w-3xs rounded-2xl border-2 max shadow-xl border-white bg-[#EFEFEF] p-6">
        <div className="h-12 flex items-center text-[#F07F1C] justify-center bg-[#FFDCC6] rounded-[8px] w-12">
          <Brain size={20} />
        </div>
        <h3 className=" text-2xl text-[#1E1E1C] font-semibold py-6">
          Criatividade.
        </h3>
        <p className="text-xs pb-4 text-[#1E1E1C]">
          Dê espaço para sua criatividade.
        </p>
        <Link href="#">
          <div className="bg-[#D1D1D1] h-8 flex items-center justify-end rounded-full">
            <ArrowRight className="mr-3 text-[#BEBEBE]" />
          </div>
        </Link>
      </article>
      <article className="transition duration-300 ease-in-out hover:scale-115 cursor-pointer min-w-3xs rounded-2xl border-2 max shadow-xl border-white bg-[#EFEFEF] p-6">
        <div className="h-12 flex items-center text-[#F07F1C] justify-center bg-[#FFDCC6] rounded-[8px] w-12">
          <Shuffle size={20} />
        </div>
        <h3 className="text-2xl text-[#1E1E1C] font-semibold py-6">
          Flexibilidade.
        </h3>
        <p className="text-xs pb-4 text-[#1E1E1C]">
          Escolha de forma fina e sensível.
        </p>
        <Link href="#">
          <div className="bg-[#D1D1D1] h-8 flex items-center justify-end rounded-full">
            <ArrowRight className="mr-3 text-[#BEBEBE]" />
          </div>
        </Link>
      </article>
    </div>
  );
};
