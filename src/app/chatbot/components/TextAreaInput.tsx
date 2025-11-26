"use client";

import {
  ChatInput,
  ChatInputEditor,
  ChatInputGroupAddon,
  ChatInputSubmitButton,
} from "@/components/ui/chat-input";
import { JSONContent } from "@tiptap/core";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { WordsAndsWeight } from "./WordsAndsWeight";

type ValueInputProps = {
  content: Array<{
    content?: Array<{
      text?: string;
    }>;
  }>;
};

type TextAreaProps = {
  handleSubmit: () => void;
  handleChange: (value: ValueInputProps) => void;
  valueChange: string;
  valueRangeSlider: number;
};

type WordsAndsWeightProps = {
  word: string;
  weight: number;
};

export function TextAreaInput({
  handleSubmit,
  handleChange,
  valueChange,
  valueRangeSlider,
}: TextAreaProps) {
  const [keywords, SetKeywords] = useState<WordsAndsWeightProps[]>([]);

  const handdleWords = () => {
    SetKeywords((prevWords) => [
      ...prevWords,
      { word: valueChange, weight: valueRangeSlider },
    ]);
  };

  const RemovekeyWords = (myword: string) => {
    SetKeywords((prevWords) => prevWords.filter((w) => w.word != myword));
  };
  return (
    <div>
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-full space-y-4 min-w-[864.98px] max-w-[864.98px] p-5">
          <ChatInput
            onSubmit={handleSubmit}
            onChange={(v: JSONContent | null) => handleChange(v)}
            className="text-[#1E1E1C] bg-[#ECECEC] border-[#D1D1D1] rounded-2xl"
          >
            <ChatInputEditor placeholder="Fonte moderna e elegante" />
            <ChatInputGroupAddon align="block-end">
              <ChatInputSubmitButton className="ml-auto bg-amber-500  hover:bg-orange-600 cursor-pointer" />
            </ChatInputGroupAddon>
            <button
              onClick={handdleWords}
              className="ml-auto flex items-center mr-3 border rounded-full hover:border-amber-400 border-amber-500 justify-center h-8 w-8 cursor-pointer"
            >
              <Plus className="text-amber-500 rounded-full hover:text-amber-400" />
            </button>
          </ChatInput>
        </div>
      </div>
      <div className="p-5 w-[864.98px]">
        {keywords.map((palavra: WordsAndsWeightProps) => (
          <>
            <WordsAndsWeight
              word={palavra.word}
              weight={palavra.weight}
              RemovekeyWords={RemovekeyWords}
            />
          </>
        ))}
      </div>
      <br />
    </div>
  );
}
