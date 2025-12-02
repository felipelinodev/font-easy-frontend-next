"use client";

import { useState } from "react";
import Image from "next/image";
import CustomSwitch from "./CustomSwitch";
import Link from "next/link";
import ButtonFE from "@/components/font-easy-ui/Button";
import { UserRound } from "lucide-react";

export const FloatingMenu = () => {
  const [isSwicth, setIsSwitch] = useState<boolean>();

  const handdleSwitch = () => {
    setIsSwitch(!isSwicth);
  };

  return (
    <div className="h-16 m-10 mx-auto px-4 flex items-center max-w-[678.39px] justify-center gap-10 border-2 rounded-full max shadow-xl border-white bg-[#EFEFEF]">
      <Image
        src="/LogoOficial.png"
        alt="Logo da marca"
        width={121}
        height={38}
        unoptimized
      />
      <CustomSwitch checked={isSwicth!} onChange={handdleSwitch} />
      <ul className="flex items-center gap-4">
        <li>
          <Link className="text-sm text-[#1E1E1C] font-medium" href="#">
            Sobre
          </Link>
        </li>
        <li>
          <Link className="text-sm text-[#1E1E1C] font-medium" href="#">
            Github
          </Link>
        </li>
        <li>
          <Link className="text-sm text-[#1E1E1C] font-medium" href="#">
            Contato
          </Link>
        </li>
        <ButtonFE textSize={undefined} variant="primary">
          Contribuir
        </ButtonFE>
      </ul>
      <Link
        className="h-8 w-8 bg-[#D9D9D9] rounded-full flex items-center justify-center"
        href="#"
      >
        <UserRound size={18} />
      </Link>
    </div>
  );
};
