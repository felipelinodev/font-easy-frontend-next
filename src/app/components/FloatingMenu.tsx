"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import CustomSwitch from "../../components/font-easy-ui/CustomSwitch";
import Link from "next/link";
import ButtonFE from "@/components/font-easy-ui/Button";
import { DropDownMenuProfile } from "./DropDownMenuProfile";
import { DropDownMenuProfileAuth } from "./DropDownMenuProfileAuth";
import { verifyIfUserAuth } from "../actions/verify-auth";

export const FloatingMenu = () => {
  const [isSwicth, setIsSwitch] = useState<boolean>();
  const [isAuth, setIsAuth] = useState<boolean>(false)

  const handdleSwitch = () => {
    setIsSwitch(!isSwicth);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await verifyIfUserAuth()
      console.log("Resultado:", isAuthenticated)
      setIsAuth(isAuthenticated)
    };
    checkAuth()
  }, [])

  return (
    <div className="h-16 mt-10 mx-auto px-4 flex items-center max-w-[678.39px] justify-center gap-10 border-2 rounded-full max shadow-xl border-white bg-gray-surface">

      <Link href="/">
        <Image
          className="cursor-pointer"
          src="/LogoOficial.png"
          alt="Logo da marca"
          width={121}
          height={38}
          unoptimized
        />
      </Link>
      <CustomSwitch checked={isSwicth!} onChange={handdleSwitch} />
      <ul className="flex items-center gap-4">
        <li>
          <Link className="text-sm text-black-default font-medium" href="#">
            Sobre
          </Link>
        </li>
        <li>
          <Link className="text-sm text-black-default font-medium" href="#">
            Github
          </Link>
        </li>
        <li>
          <Link className="text-sm text-black-default font-medium" href="#">
            Contato
          </Link>
        </li>
        <ButtonFE textSize={undefined} variant="primary">
          Contribuir
        </ButtonFE>
      </ul>
      {isAuth ? (
        <>
          <DropDownMenuProfileAuth />
        </>
      ) :
        (
          <>
            <DropDownMenuProfile />
          </>
        )}

    </div>
  );
};
