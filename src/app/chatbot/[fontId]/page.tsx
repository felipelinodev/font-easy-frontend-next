"use client";
import { useContext, useState } from "react";
import { CompontsWapperCard } from "../components/CompontsWapperCard";
import { MainContext } from "@/app/context/MainContext";
import { useParams } from "next/navigation";
import RangeInput from "../components/RangeInput";
import InputFontTextPreview from "../components/inputFontTextPreview";
import ButtonFE from "@/components/font-easy-ui/Button";
import { FontWeightCard } from "./components/FontWeightCard";

export default function FontPage() {
  const { fontId } = useParams();
  const { fonts } = useContext(MainContext)!;

  const [fontSizePreviw, setFontSizePreviw] = useState<number>(0);
  const [fontPreviewName, SetFontPreviewName] = useState<string>(""); //from vercel

  const fontFilter = fonts.find((font) => font.font_id === fontId);

  const fontVariation = {
    "100": "Thin",
    "100italic": "Thin Italic",

    "200": "ExtraLight",
    "200italic": "ExtraLight Italic",

    "300": "Light",
    "300italic": "Light Italic",

    "400": "Regular",
    regular: "Regular",
    italic: "Regular Italic",

    "500": "Medium",
    "500italic": "Medium Italic",

    "600": "SemiBold",
    "600italic": "SemiBold Italic",

    "700": "Bold",
    "700italic": "Bold Italic",

    "800": "ExtraBold",
    "800italic": "ExtraBold Italic",

    "900": "Black",
    "900italic": "Black Italic",
  };

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
      <div className="flex gap-5 mt-32 mb-10  items-center flex-col justify-center">
        <CompontsWapperCard shouldAnimate={false}>
          <div className="p-10">
            <div className="flex items-center justify-between border-b pb-4 border-black-default">
              <div className="flex items-center gap-6">
                <h1
                  className="text-4xl font-bold text-black-default"
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
              <p className="text-sm text-black-default">
                License: Personal & Commercial Use!
              </p>
            </div>
            <p className="text-[16px] pt-4 text-black-default">
              Mussum Ipsum, cacilds vidis litro abertis. Vehicula non. Ut sed ex
              eros. Vivamus sit amet nibh non tellus tristique interdum. Quem
              num gosta di mim que vai caçá sua turmis! Per aumento de cachacis,
              eu reclamis. Eu nunca mais boto a boca num copo de cachaça, agora
              eu só uso canudis!
            </p>
          </div>
        </CompontsWapperCard>
        <CompontsWapperCard shouldAnimate={false}>
          <div>
            <h1
              className="text-3xl p-6 text-center tracking-wide font-bold text-black-default"
              style={{ fontFamily: fontFilter?.name }}
            >
              ABCDEFGHIJKLMNOPWXY123456789!@#$%^&*
            </h1>
          </div>
        </CompontsWapperCard>
        <CompontsWapperCard shouldAnimate={false}>
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
            {Object.entries(fontFilter?.files || {}).map(([weight, url]) => (
              <div key={weight} className="pb-6">
                <FontWeightCard
                  weight={weight}
                  fontName="Mussum Ipsom"
                  fontVariationName={
                    fontVariation[weight as keyof typeof fontVariation]
                  }
                  fontsDownloadLink={url}
                  fontSize={fontSizePreviw}
                  textPreview={fontPreviewName}
                />
              </div>
            ))}
          </div>
        </CompontsWapperCard>
      </div>
    </>
  );
}
