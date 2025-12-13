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
            className="text-[#1E1E1C] bg-transparent border-gray-escure rounded-2xl"
          >
            <ChatInputEditor placeholder="Digite um prompt de recomendação ou um atributo." />
            <ChatInputGroupAddon align="block-end">
              <ChatInputSubmitButton
                disabled={!draftWord || draftWord.length === 0}
                className="ml-auto bg-amber-500 disabled:text-white-default hover:bg-orange-600 disabled:opacity-100 cursor-pointer disabled:bg-gray-escure"
              />
            </ChatInputGroupAddon>

            <button
              onClick={handdleWords}
              disabled={!draftWord || draftWord.length === 0}
              className="ml-auto flex items-center disabled:border-gray-escure mr-3 border rounded-full  border-primary-orange justify-center h-8 w-8 cursor-pointer"
            >
              {!draftWord || draftWord.length === 0 ? (
                <Plus className="text-gray-escure rounded-full" />
              ) : (
                <Plus className="text-amber-500 rounded-full" />
              )}
            </button>
          </ChatInput>
        </div>
      </div>
    </div>
  );
}
