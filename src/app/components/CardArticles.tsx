import { ArrowRight, Bolt, Brain, Shuffle } from "lucide-react";
import Link from "next/link";

export const CardsArticles = () => {
  return (
    <div className="flex gap-6">
      <article className="transition duration-300 ease-in-out hover:scale-115 cursor-pointer min-w-3xs max-w-3xs rounded-2xl border-2 max shadow-xl border-white bg-gray-surface p-6">
        <div className="h-12 flex items-center text-primary-orange justify-center bg-tertiary-orange rounded-[8px]  w-12">
          <Bolt size={20} />
        </div>
        <h3 className="text-2xl text-black-default font-semibold py-6">
          Produtividade.
        </h3>
        <p className=" text-black-default text-xs pb-4">
          Não perca, horas para escolher suas fontes.
        </p>
        <Link href="#">
          <div className="bg-[#D1D1D1] h-8 flex items-center justify-end rounded-full">
            <ArrowRight className="mr-3 text-[#BEBEBE]" />
          </div>
        </Link>
      </article>
      <article className="transition duration-300  ease-in-out hover:scale-115 cursor-pointer min-w-3xs rounded-2xl border-2 max shadow-xl border-white bg-gray-surface p-6">
        <div className="h-12 flex items-center text-primary-orange justify-center bg-tertiary-orange rounded-[8px] w-12">
          <Brain size={20} />
        </div>
        <h3 className=" text-2xl text-black-default font-semibold py-6">
          Criatividade.
        </h3>
        <p className="text-xs pb-4 text-black-default">
          Dê espaço para sua criatividade.
        </p>
        <Link href="#">
          <div className="bg-[#D1D1D1] h-8 flex items-center justify-end rounded-full">
            <ArrowRight className="mr-3 text-[#BEBEBE]" />
          </div>
        </Link>
      </article>
      <article className="transition duration-300 ease-in-out hover:scale-115 cursor-pointer min-w-3xs rounded-2xl border-2 max shadow-xl border-white bg-gray-surface p-6">
        <div className="h-12 flex items-center text-primary-orange justify-center bg-tertiary-orange rounded-[8px] w-12">
          <Shuffle size={20} />
        </div>
        <h3 className="text-2xl text-black-default font-semibold py-6">
          Flexibilidade.
        </h3>
        <p className="text-xs pb-4 text-black-default">
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
