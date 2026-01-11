"use client"

import { useProfile } from "@/app/context/ProfileContext";
import { deleteFavoriteFont } from "@/lib/RequetsApiNode";
import { Download, Heart } from "lucide-react"
import Link from "next/link";
import { useState } from "react"

type FavoriteFontProps = {
    fontName: string;
    fontVariation: number | undefined;
    fontCategory: string | undefined;
    fontLink: string;
    idFont: number;
}

export default function FavoriteFont({ fontName, idFont, fontVariation, fontCategory, fontLink }: FavoriteFontProps) {
    const { token, favoriteFonts, setFavoriteFonts } = useProfile()

    const handleDeleteFavoriteFont = async () => {
        try {
            await deleteFavoriteFont(idFont, token!)

            const updateFonts = favoriteFonts.filter(font => font.id_font !== idFont)
            setFavoriteFonts(updateFonts)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div
            className={`border-2 shadow-xl rounded-2xl flex-col border-white max-w-[864.98px] items-start flex justify-between `}
        >
            <h1
                className="truncate text-black-default flex justify-between p-4 w-full cursor-pointer text-4xl "

            >
                {fontName}
            </h1>


            <div className="flex flex-col w-80 rounded-b-2xl p-4 bg-white-default/40 gap-8">
                <div className="text-[16px] w-full text-gray-muted-contrast justify-between flex gap-5">
                    <div className="text-left">
                        <p>{fontVariation} Variações</p>
                        <p>{fontCategory}</p>
                    </div>
                    <div className="flex flex-col">
                        <button onClick={handleDeleteFavoriteFont} className="flex items-center justify-center border-black-default h-8 w-8 rounded-full cursor-pointer hover:bg-gray-escure">
                            <Heart fill="#F07F1C" color="#F07F1C" size={19} />
                        </button>
                        <Link
                            href={fontLink}
                            className="h-8 hover:bg-gray-escure w-8 rounded-full flex justify-center items-center cursor-pointer"
                        >
                            <Download color="#F07F1C" className="w-4 h-4  text-[#DEDFDF] " />
                        </Link>
                    </div>


                </div>

            </div>
        </div >
    )
}
