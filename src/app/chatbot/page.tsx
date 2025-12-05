"use client";

import { CompontsWapperCard } from "@/app/chatbot/components/CompontsWapperCard";
import { TextAreaInput } from "./components/TextAreaInput";
import { useContext, useEffect, useState } from "react";
import ResquestFontEasy from "@/lib/RequestFontEasy";
import RangeSlider from "./components/RangeSlider";
import { FontCard } from "./components/FontCard";
import RangeInput from "./components/RangeInput";
import InputFontTextPreview from "./components/inputFontTextPreview";
import Loader from "./components/Loader";
import { WordsAndsWeight } from "./components/WordsAndsWeight";
import { normalizeTo100 } from "@/lib/NormalizePrompt";
import { MainContext } from "../context/MainContext";
import { JSONContent } from "@tiptap/core";

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

    if (inputText) {
      setdraftWord(inputText);
    }
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

      const response = await ResquestFontEasy(userBodyResquestStructured);
      setFonts(response.response?.fonts);
    } else {
      const userBodyResquest = {
        prompt: draftWord,
      };

      const response = await ResquestFontEasy(userBodyResquest);
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
        <p className="text-2xl pt-5 bg-linear-to-r from-stone-900 to-zinc-400 bg-clip-text text-transparent">
          Ola
          <span className="bg-zinc-200 rounded-full pb-1 px-2 text-[#F07F1C]">
            Designer
          </span>
          , qual fonte deseja encontrar?
        </p>
      </div>

      <div>
        <CompontsWapperCard>
          <div>
            <div>
              <TextAreaInput
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                draftWord={draftWord}
                draftWeight={draftWeight}
                SetKeywords={SetKeywords}
              />

              <div className="pr-5 pl-5 flex flex-wrap w-[864.98px]">
                {keywords.map((currentWord: WordsAndsWeightProps) => (
                  <div
                    key={currentWord.id}
                    onClick={() => handdleSelectItem(currentWord.id)}
                  >
                    <WordsAndsWeight
                      word={currentWord.word}
                      weight={currentWord.weight}
                      RemovekeyWords={RemovekeyWords}
                      isSelected={currentWord.selected}
                    />
                  </div>
                ))}
              </div>
              {!loading ? (
                <>
                  <div
                    className={` ${
                      keywords.length > 0 ? "block" : "hidden"
                    } mx-5 my-2`}
                  >
                    <RangeSlider
                      min={0}
                      max={100}
                      defaultValue={50}
                      onChange={setdraftWeight}
                    />
                  </div>
                  {fonts.length > 0 && (
                    <div className="flex justify-between p-7 items-center">
                      <RangeInput
                        setFontSizePreviw={setFontSizePreviw}
                        fontSizePreviw={fontSizePreviw}
                      />
                      <InputFontTextPreview
                        SetFontPreviewName={SetFontPreviewName}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center pb-5">
                  <Loader />
                </div>
              )}
            </div>

            <div
              className="
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-transparent
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
              {fonts &&
                fonts?.map((f) => (
                  <FontCard
                    fontIdUnique={f.font_id}
                    key={f.rank}
                    fontName={f.name}
                    fontVariations={f.font_variation}
                    fontsDownloadLinks={f.files}
                    fontCategory={f.category}
                    AcessType="FREE"
                    fontSize={fontSizePreviw}
                    textPreview={fontPreviewName}
                  />
                ))}
            </div>
          </div>
        </CompontsWapperCard>
      </div>
    </div>
  );
}
