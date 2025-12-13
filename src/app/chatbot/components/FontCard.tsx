import { Upload } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

type FontCardProps = {
  fontIdUnique: string;
  fontName: string;
  fontVariations: number;
  fontsDownloadLinks: {
    regular: string;
    [key: string]: string | undefined;
  };
  fontCategory: string;
  AcessType: "FREE" | "PREMIUM";
  fontSize: number | null | undefined;
  textPreview: string | undefined;
};

export const FontCard = ({
  fontName,
  fontVariations,
  fontCategory,
  fontsDownloadLinks,
  fontSize,
  textPreview,
  fontIdUnique,
}: FontCardProps) => {
  const handleRedirect = () => {
    redirect(fontsDownloadLinks.regular);
  };

  const router = useRouter();

  return (
    <>
      <style>
        {`
      @font-face {
      font-family: '${fontName}';
      src: url('${fontsDownloadLinks.regular}') format('truetype');
      font-weight: normal;
      font-style: normal;}
     `}
      </style>
      <div
        onClick={() => router.push(`/chatbot/${fontIdUnique}`)}
        className="bg-[#ECECEC] cursor-pointer hover:bg-[#e6e6e6] overflow-y-clip max-w-[864.98px] ml-6 pl-3 pr-3 mr-6 flex items-center justify-between min-h-[129.92px] border-t-2 border-[#D1D1D1]"
      >
        <h1
          className="text-black-default inline-block"
          style={{
            fontFamily: fontName,
            fontSize: fontSize && fontSize > 0 ? `${fontSize}px` : "64px",
          }}
        >
          {textPreview ? textPreview : fontName}
        </h1>
        <div className="flex flex-col  gap-8">
          <div className="text-[16px] justify-end text-black-default flex gap-5">
            <p>{fontVariations} variações</p>
            <p>{fontCategory}</p>
          </div>
          <div className="flex justify-end gap-3">
            <div
              className="h-8 rounded-full px-8 justify-center w-fit flex items-center text-xs border font-bold
            border-[#BEBEBE] text-[#BEBEBE]"
            >
              Gratuito
            </div>
            <button
              onClick={handleRedirect}
              className="h-8 w-8 rounded-full flex justify-center items-center  hover:primary-orange-twocursor-pointer bg-amber-500"
            >
              <Upload className="w-4 h-4 text-[#DEDFDF] " />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
