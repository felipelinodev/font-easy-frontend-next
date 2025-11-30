import { Upload } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FontWeightCardProps = {
  fontName: string;
  fontsDownloadLink: string | undefined;
  fontSize: number | null | undefined;
  textPreview: string | undefined;
  fontVariationName: string;
  weight: string;
};

export const FontWeightCard = ({
  fontName,
  fontsDownloadLink,
  fontSize,
  textPreview,
  fontVariationName,
  weight,
}: FontWeightCardProps) => {
  const handleRedirect = () => {
    redirect(fontsDownloadLink!);
  };

  const isItalic = weight.includes("italic");
  const cleanWeight = weight.replace("italic", "") || "400";

  return (
    <>
      <style>
        {`
      @font-face {
      font-family: '${fontName}';
      src: url('${fontsDownloadLink}') format('truetype');
      font-weight: ${cleanWeight};
      font-style: ${isItalic ? "italic" : "normal"};}
     `}
      </style>
      <div className="bg-[#ECECEC] overflow-y-clip max-w-[864.98px] ml-6 pl-3 pr-3 mr-6 min-h-[129.92px] border p-5 rounded-2xl border-[#D1D1D1]">
        <p className="text-sm ">{fontVariationName}</p>
        <div className="flex items-center justify-between">
          <h1
            className="text-[#1E1E1C] inline-block"
            style={{
              fontFamily: fontName,
              fontSize: fontSize && fontSize > 0 ? `${fontSize}px` : "64px",
              fontWeight: cleanWeight,
              fontStyle: isItalic ? "italic" : "normal",
            }}
          >
            {textPreview ? textPreview : fontName}
          </h1>
          <div className="flex flex-col  gap-8">
            <div className="flex justify-end gap-3">
              <button
                onClick={handleRedirect}
                className="h-8 w-8 rounded-full flex justify-center items-center  hover:bg-orange-600 cursor-pointer bg-amber-500"
              >
                <Upload className="w-4 h-4 text-[#DEDFDF] " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
