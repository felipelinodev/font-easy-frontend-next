"use client"

import { useProfile } from "@/app/context/ProfileContext";
import FavoriteFontCard from "./components/FavoriteFontCards";

export default function FavoriteFonts() {

    const { favoriteFonts } = useProfile()

    favoriteFonts.map(font => (
        console.log(font.fontlinks?.[0].font_link)
    ))

    return (
        <div className="my-70 mx-100 flex flex-col items-center justify-center text-center">
            <h1 className="mb-20 text-black-default text-5xl font-medium">Suas fontes Favoritas.</h1>
            <div className="flex gap-5 justify-center flex-wrap">
                {favoriteFonts.map(font => (

                    <FavoriteFontCard idFont={font.id_font} key={font.id_font} fontName={font.font_name} fontCategory={font.font_type} fontVariation={font.font_variations} fontLink={font.fontlinks?.[0].font_link || '/favorite_fonts'} />

                ))}


            </div>

        </div>
    )
}