"use client";
import { useContext, useState } from "react";
import { CompontsWapperCard } from "../components/CompontsWapperCard";
import { MainContext } from "@/app/context/MainContext";
import React from "react";
import { useParams } from "next/navigation";
import RangeInput from "../components/RangeInput";
import InputFontTextPreview from "../components/inputFontTextPreview";
import ButtonFE from "@/components/font-easy-ui/Button";
type fontPageProps = {
  params: { fontPage: string };
};

export default function FontPage({ params }: fontPageProps) {
  const { fontId } = useParams();
  const { fonts } = useContext(MainContext)!;

  const [fontSizePreviw, setFontSizePreviw] = useState<number>(0);
  const [fontPreviewName, SetFontPreviewName] = useState<string>();

  const fontFilter = fonts.find((font) => font.font_id === fontId);

  return (
    <>
      <style>
        {`
      @font-face {
      font-family: '${fontFilter?.name}';
      src: url('${fontFilter?.files.regular}') format('truetype');
      font-weight: normal;
      font-style: normal;}
     `}
      </style>
      <div className="flex gap-5 mb-10 mt-10 items-center flex-col justify-center">
        <CompontsWapperCard>
          <div className="p-10">
            <div className="flex items-center justify-between border-b pb-4 border-[#1E1E1C]">
              <div className="flex items-center gap-6">
                <h1
                  className="text-4xl font-bold text-[#1E1E1C]"
                  style={{ fontFamily: fontFilter?.name }}
                >
                  {fontFilter?.name}
                </h1>
                <div
                  className="h-8 rounded-full px-8 justify-center w-fit flex items-center text-xs border font-bold
            border-[#BEBEBE] text-[#BEBEBE]"
                >
                  Gratuito
                </div>
              </div>
              <p className="text-sm text-[#1E1E1C]">
                License: Personal & Commercial Use!
              </p>
            </div>
            <p className="text-[16px] pt-4 text-[#1E1E1C]">
              Mussum Ipsum, cacilds vidis litro abertis. Vehicula non. Ut sed ex
              eros. Vivamus sit amet nibh non tellus tristique interdum. Quem
              num gosta di mim que vai caçá sua turmis! Per aumento de cachacis,
              eu reclamis. Eu nunca mais boto a boca num copo de cachaça, agora
              eu só uso canudis!
            </p>
          </div>
        </CompontsWapperCard>
        <CompontsWapperCard>
          <div>
            <h1
              className="text-3xl p-6 text-center tracking-wide font-bold text-[#1E1E1C]"
              style={{ fontFamily: fontFilter?.name }}
            >
              ABCDEFGHIJKLMNOPWXY123456789!@#$%^&*
            </h1>
          </div>
        </CompontsWapperCard>
        <CompontsWapperCard>
          <div>
            <div className="p-10 flex justify-between">
              <RangeInput
                setFontSizePreviw={setFontSizePreviw}
                fontSizePreviw={fontSizePreviw}
              />
              <InputFontTextPreview SetFontPreviewName={SetFontPreviewName} />
              <ButtonFE variant="primary" textSize="sm">
                Baixar tudo
              </ButtonFE>
            </div>
          </div>
        </CompontsWapperCard>
      </div>
    </>
  );
}
