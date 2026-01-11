
import { useProfile } from "@/app/context/ProfileContext";
import { createFavoriteFont } from "@/lib/RequetsApiNode";
import { Download, Heart } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "./Loader";



type FavoriteFont = {
  font_name: string,
  font_variations?: number,
  font_type?: string,
  fontlinks?: { fontLink: string }[]
}

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
  const { token } = useProfile();
  const [heartClick, setHeartClick] = useState<string>("empty")
  const [loadingSaveFont, setLoadingSaveFont] = useState<boolean>(false)

  const handleRedirect = () => {
    redirect(fontsDownloadLinks.regular);
  };

  const router = useRouter();

  const handleSaveFavoriteFont = async () => {
    const currentHeartClick = heartClick === "fill" ? "empty" : "fill";
    setHeartClick(currentHeartClick)


    if (!token) {
      return
    }


    const fontData: FavoriteFont = {
      font_name: fontName,
      font_variations: fontVariations,
      font_type: fontCategory,
      fontlinks: [{ fontLink: fontsDownloadLinks.regular }]
    }

    if (currentHeartClick === "fill") {
      setLoadingSaveFont(true)

      try {
        await createFavoriteFont(fontData, token);

        setTimeout(() => {
          setLoadingSaveFont(false)
        }, 2000)

      } catch (error) {
        console.log("erro ao inserir fonte no banco.", error)
      }

    }
  }



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
        className={`hover:bg-white-default/40 overflow-y-clip max-w-[864.98px] ml-6 pl-3 pr-3 mr-6 flex items-center justify-between min-h-[129.92px] border-t border-gray-escure`}
      >
        <h1 onClick={() => router.push(`/chatbot/${fontIdUnique}`)}
          className="text-black-default cursor-pointer inline-block"
          style={{
            fontFamily: fontName,
            fontSize: fontSize && fontSize > 0 ? `${fontSize}px` : "64px",
          }}
        >
          {textPreview ? textPreview : fontName}
        </h1>
        <div className="flex flex-col  gap-8">
          <div className="text-[16px] text-gray-muted-contrast justify-end  flex gap-5">
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
            <button onClick={handleSaveFavoriteFont} className="flex items-center justify-center border-black-default h-8 w-8 rounded-full cursor-pointer hover:bg-gray-escure">
              {!loadingSaveFont ? (
                <>
                  {heartClick === "fill" ?
                    (
                      <>
                        <Heart fill="#F07F1C" color="#F07F1C" size={19} />
                      </>
                    ) : (
                      <>
                        <Heart color="#F07F1C" size={19} />
                      </>)
                  }

                </>
              ) : (
                <>
                  <div className="flex justify-center items-center scale-50">
                    <Loader />
                  </div>

                </>
              )}

            </button>
            <button
              onClick={handleRedirect}
              className="h-8 w-8 rounded-full flex justify-center items-center  hover:primary-orange-two cursor-pointer bg-amber-500"
            >
              <Download className="w-4 h-4 text-[#DEDFDF] " />
            </button>

          </div>
        </div>
      </div>
    </>
  );
};
