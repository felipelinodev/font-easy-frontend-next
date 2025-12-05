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

type WordsAndsWeightProps = {
  word: string;
  weight: number;
  id: number;
  selected?: boolean;
};

type TextAreaProps = {
  handleSubmit: () => void;
  handleChange: (value: JSONContent) => void;
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
      {
        word: draftWord,
        weight: draftWeight,
        id: randomNumber,
        selected: false,
      },
    ]);
  };

  return (
    <div>
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-full space-y-4 max-w-[864.98px] p-5">
          <ChatInput
            onSubmit={handleSubmit}
            onChange={(v: JSONContent) => handleChange(v)}
            className="text-[#1E1E1C] bg-[#ECECEC] border-[#D1D1D1] rounded-2xl"
          >
            <ChatInputEditor placeholder="Digite um prompt de recomendação ou um atributo." />
            <ChatInputGroupAddon align="block-end">
              <ChatInputSubmitButton
                disabled={!draftWord || draftWord.length === 0}
                className="ml-auto bg-amber-500 disabled:text-[#b8b8b8] hover:bg-orange-600 cursor-pointer disabled:bg-[#dddddd]"
              />
            </ChatInputGroupAddon>

            <button
              onClick={handdleWords}
              disabled={!draftWord || draftWord.length === 0}
              className="ml-auto flex items-center disabled:border-[#dddddd] mr-3 border rounded-full hover:border-amber-400 border-amber-500 justify-center h-8 w-8 cursor-pointer"
            >
              {!draftWord || draftWord.length === 0 ? (
                <Plus className="text-[#dddddd] rounded-full hover:text-amber-400" />
              ) : (
                <Plus className="text-amber-500 rounded-full hover:text-amber-400" />
              )}
            </button>
          </ChatInput>
        </div>
      </div>
    </div>
  );
}
