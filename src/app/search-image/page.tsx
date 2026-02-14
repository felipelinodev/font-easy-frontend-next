"use client";

import { CompontsWapperCard } from "@/app/chatbot/components/CompontsWapperCard";
import { TextAreaInput } from "./components/TextAreaInput";
import { useContext, useEffect, useState } from "react";
import { RequestFontEasy } from "@/lib/RequestFontEasy";
import RangeSlider from "./components/RangeSlider";
import { FontCard } from "./components/FontCard";
import RangeInput from "./components/RangeInput";
import InputFontTextPreview from "./components/inputFontTextPreview";
import Loader from "./components/Loader";
import { WordsAndsWeight } from "./components/WordsAndsWeight";
import { normalizeTo100 } from "@/lib/NormalizePrompt";
import { MainContext } from "../context/MainContext";
import { JSONContent } from "@tiptap/core";
import TextType from "@/components/TextType";
import { ImageUp } from "lucide-react";

type WordsAndsWeightProps = {
  word: string;
  weight: number;
  id: number;
  selected?: boolean;
};

export default function ChatBot() {
  const [draftWord, setdraftWord] = useState<string>("");

  const context = useContext(MainContext);

  if (!context) {
    throw new Error("Use context is null");
  }

  const { fonts, setFonts } = context;

  const [draftWeight, setdraftWeight] = useState<number>(50);
  const [fontSizePreviw, setFontSizePreviw] = useState<number>(0);
  const [fontPreviewName, SetFontPreviewName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [keywords, SetKeywords] = useState<WordsAndsWeightProps[]>([]);

  const handleChange = (value: JSONContent) => {
    const inputText = value.content?.[0]?.content?.[0]?.text ?? "";

    setdraftWord(inputText);
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);

    if (keywords.length > 0) {
      const momentPrompt = keywords.reduce(
        (acc: Record<string, number>, item: WordsAndsWeightProps) => {
          acc[item.word] = item.weight;
          return acc;
        },
        {}
      );

      const normalizePrompt = normalizeTo100(momentPrompt);

      const userBodyResquestStructured = {
        prompt: normalizePrompt,
      };

      const response = await RequestFontEasy(userBodyResquestStructured);
      setFonts(response.response?.fonts);
    } else {
      const userBodyResquest = {
        prompt: draftWord,
      };

      const response = await RequestFontEasy(userBodyResquest);
      setFonts(response.response?.fonts);
    }
    setLoading(false);
  };

  const RemovekeyWords = (myword: string) => {
    SetKeywords((prevWords) => prevWords.filter((w) => w.word !== myword));
  };

  const handdleSelectItem = (id: number) => {
    SetKeywords((prevWords) =>
      prevWords.map((word) =>
        word.id === id
          ? { ...word, selected: !word.selected }
          : { ...word, selected: false }
      )
    );
  };

  useEffect(() => {
    SetKeywords((prevWords) =>
      prevWords.map((word) =>
        word.selected ? { ...word, weight: draftWeight } : word
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftWeight]);

  return (
    <div className="mt-24 mb-10 min-h-full flex items-center justify-center flex-col">
      <div className="pt-10 pb-8 flex flex-col items-center">
        <p className="text-2xl pt-5 bg-linear-to-r from-black-default to-gray-muted-contrast bg-clip-text text-transparent">
          Busque suas fontes por imagem.
        </p>
      </div>

      <div>
        <CompontsWapperCard shouldAnimate={false}>
          <div className="p-5 w-full">
            <label
              htmlFor="file-upload"
              className="min-w-[864.98px] cursor-pointer border-2 rounded-3xl shadow-xl border-white
      bg-gray-surface w-full space-y-4 p-3 flex-col flex items-center justify-center h-[132px]"
            >
              <p className="text-sm bg-linear-to-r from-black-default to-gray-muted-contrast bg-clip-text text-transparent">
                Faça o upload da imagem para buscar.
              </p>

              <ImageUp
                size={75}
                className="text-gray-muted-contrast"
                strokeWidth={0.75}
              />
            </label>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target?.files?.[0]
                console.log(file)
              }}
            />
          </div>

        </CompontsWapperCard>
      </div>
    </div>
  );
}
