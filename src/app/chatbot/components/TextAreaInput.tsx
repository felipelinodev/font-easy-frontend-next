"use client";

import {
  ChatInput,
  ChatInputEditor,
  ChatInputGroupAddon,
  ChatInputSubmitButton,
} from "@/components/ui/chat-input";
import { JSONContent } from "@tiptap/core";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type ValueInputProps = {
  content: Array<{
    content?: Array<{
      text?: string;
    }>;
  }>;
};

type WordsAndsWeightProps = {
  word: string;
  weight: number;
  id: number;
};

type TextAreaProps = {
  handleSubmit: () => void;
  handleChange: (value: ValueInputProps) => void;
  draftWord: string;
  draftWeight: number;
  SetKeywords: Dispatch<SetStateAction<WordsAndsWeightProps[]>>;
};

export function TextAreaInput({
  handleSubmit,
  handleChange,
  draftWord,
  draftWeight,
  SetKeywords,
}: TextAreaProps) {
  const handdleWords = () => {
    const randomNumber: number = Math.floor(Math.random() * 10000);
    SetKeywords((prevWords: WordsAndsWeightProps[]) => [
      ...prevWords,
      { word: draftWord, weight: draftWeight, id: randomNumber },
    ]);
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
    </div>
  );
}
