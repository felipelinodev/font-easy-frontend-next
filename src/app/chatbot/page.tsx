"use client";

import { CompontsWapperCard } from "@/app/chatbot/components/CompontsWapperCard";
import { TextAreaInput } from "./components/TextAreaInput";
import { ReactNode, useState } from "react";
import ResquestFontEasy from "@/lib/RequestFontEasy";
import RangeSlider from "./components/RangeSlider";
import { FontCard } from "./components/FontCard";
import RangeInput from "./components/RangeInput";
import InputFontTextPreview from "./components/inputFontTextPreview";
import Loader from "./components/Loader";
import { JSX } from "react/jsx-runtime";
import { WordsAndsWeight } from "./components/WordsAndsWeight";

type ValueInputProps = {
  content: Array<{
    content?: Array<{
      text?: string;
    }>;
  }>;
};

type ResponseFontsProps = {
  map(
    arg0: (f: {
      name: string;
      rank: number;
      category: string;
      font_variation: number;
      files: {
        regular: string;
        [key: string]: string | undefined;
      };
    }) => JSX.Element
  ): ReactNode;
  fonts: Array<{
    name: string;
    rank: number;
    category: string;
    font_variation: number;
    files: {
      regular: string;
      [key: string]: string | undefined;
    };
  }>;
};

type WordsAndsWeightProps = {
  word: string;
  weight: number;
  id: number;
  selected?: boolean;
};

export default function ChatBot() {
  const [draftWord, setdraftWord] = useState<string>("");
  const [fonts, setFonts] = useState<ResponseFontsProps>();
  const [draftWeight, setdraftWeight] = useState<number>(50);
  const [fontSizePreviw, setFontSizePreviw] = useState<number>(0);
  const [fontPreviewName, SetFontPreviewName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const [keywords, SetKeywords] = useState<WordsAndsWeightProps[]>([]);

  const handleChange = (value: ValueInputProps) => {
    const inputText = value.content[0]?.content?.[0]?.text;
    if (inputText) {
      setdraftWord(inputText);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    keywords.map((word) => {
      if (word.selected === true) {
        alert("TEM UM CARD PALAVRA CHAVE AI")
      }})
    
    const userBodyResquest = {
      prompt: draftWord,
    };

    const response = await ResquestFontEasy(userBodyResquest);
    setFonts(response.response?.fonts);
    setLoading(false);
  };

  const RemovekeyWords = (myword: string) => {
    SetKeywords((prevWords) => prevWords.filter((w) => w.word != myword));
  };

  const handdleSelectItem = (id: number) => {
    SetKeywords((prevWords) =>
      prevWords.map((word) =>
        word.id === id ? { ...word, selected: !word.selected } : word
      )
    );
  }

  return (
    <div className="bg-[#F4F4F4] h-screen flex items-center justify-center">
      <CompontsWapperCard>
        <div>
          <TextAreaInput
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            draftWord={draftWord}
            draftWeight={draftWeight}
            SetKeywords={SetKeywords}
          />

          <div className="pr-5 pl-5 flex flex-wrap w-[864.98px]" >
            {keywords.map((currentWord: WordsAndsWeightProps) => (
              <div key={currentWord.id} onClick={() => handdleSelectItem(currentWord.id)} >
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
              <RangeSlider
                min={0}
                max={100}
                defaultValue={50}
                onChange={setdraftWeight}
                showValue={true}
              />
              <div className="flex justify-between p-7 items-center">
                <RangeInput
                  setFontSizePreviw={setFontSizePreviw}
                  fontSizePreviw={fontSizePreviw}
                />
                <InputFontTextPreview SetFontPreviewName={SetFontPreviewName} />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center pb-5">
              <Loader />
            </div>
          )}
          <div
            className="overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-transparent
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 max-h-[8em]"
          >
            {fonts &&
              fonts?.map((f) => (
                <FontCard
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
  );
}
