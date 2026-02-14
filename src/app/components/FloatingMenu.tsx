"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import CustomSwitch from "../../components/font-easy-ui/CustomSwitch";
import Link from "next/link";
import ButtonFE from "@/components/font-easy-ui/Button";
import { DropDownMenuProfile } from "./DropDownMenuProfile";
import { DropDownMenuProfileAuth } from "./DropDownMenuProfileAuth";
import { verifyIfUserAuth } from "../actions/verify-auth";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const FloatingMenu = () => {
  const [isSwicth, setIsSwitch] = useState<boolean>();
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate Floating Menu: Move down and shrink width (no distortion)
    gsap.to(menuRef.current, {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "500px top",
        scrub: 1,
        onUpdate: (self) => {
          if (menuRef.current) {
            menuRef.current.style.overflow = self.progress > 0 ? "hidden" : "visible";
          }
        },
      },
      y: 150, // Move down
      maxWidth: 0, // Shrink width physically
      padding: 0, // Remove padding to collapse fully
      borderWidth: 0, // Remove border to collapse fully
      ease: "power1.inOut"
    });
  }, { scope: menuRef });

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
    <div ref={menuRef} className="h-16 mt-10 mx-auto px-4 flex items-center max-w-[678.39px] justify-center gap-10 border-2 rounded-full max shadow-xl border-white bg-gray-surface whitespace-nowrap">

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
