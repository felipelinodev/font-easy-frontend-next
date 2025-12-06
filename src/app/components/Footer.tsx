import Image from "next/image";
import {
  ArrowUpRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="text-[#1E1E1C] bg-[url(/rodape_bg.png)] bg-[#ECECEC] bg-contain bg-no-repeat">
      <div className="border-b border-b-[#1E1E1C]">
        <div className="p-16">
          <Image
            src="/LogoOficial.png"
            alt="Logo da marca"
            width={143}
            height={38}
            unoptimized
          />
        </div>
      </div>

      <div className="flex px-16 pt-6 pb-20 justify-between">
        <div>
          <h1 className="text-2xl font-medium mb-3">Sobre</h1>
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <ArrowUpRight size={32} />
              <a className="font-normal gap-3 text-sm" href="#">
                Quem somos
              </a>
            </div>
            <div className="flex gap-3 items-center">
              <Github size={27} />
              <a className="font-normal  text-sm" href="#">
                Github
              </a>
            </div>
          </div>
        </div>
        <div className=" flex text-right flex-col">
          <h1 className="text-2xl font-medium mb-3">Contatos</h1>
          <ul className="flex gap-2">
            <li className="p-2 bg-[#D1D1D1] rounded-full">
              <Instagram />
            </li>
            <li className="p-2 bg-[#D1D1D1] rounded-full">
              <Linkedin />
            </li>
            <li className="p-2 bg-[#D1D1D1] rounded-full">
              <Mail />
            </li>
            <li className="p-2 bg-[#D1D1D1] rounded-full">
              <Facebook />
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="p-15 gap-6 w-full flex justify-end items-end flex-col">
          <div
            className="cursor-pointer h-8 rounded-full px-8 justify-center w-fit flex items-center text-xs border font-medium
            border-[#BEBEBE]"
          >
            <a
              href="https://github.com/felipelinodev/recommend-ia-api
                "
            >
              Contribuir
            </a>
          </div>
          <p className="text-xs">© 2025 Font Easy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
