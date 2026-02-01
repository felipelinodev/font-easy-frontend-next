"use client";

import { DropDownContextMenu } from "@/app/components/DropDownContextMenu";
import {
  ChatInput,
  ChatInputEditor,
  ChatInputGroupAddon,
  ChatInputSubmitButton,
} from "@/components/ui/chat-input";
import { JSONContent } from "@tiptap/core";
import { Plus, ScanSearch, Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type WordsAndsWeightProps = {
  word: string;
  weight: number;
  id: number;
  selected?: boolean;
};

type activeToolType = 'search' | 'search Image' | null;

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

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTool, setActiveTool] = useState<activeToolType>(null);

  const handdleOpen = () => {
    setIsOpen(!isOpen);
  };


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
            <ChatInputEditor
              placeholder="Digite aqui"
            />
            <ChatInputGroupAddon align="block-end" className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={handdleOpen}
                  className="flex items-center justify-center h-8 w-8 rounded-full cursor-pointer hover:bg-gray-escure transition-colors"
                >
                  <Plus size={18} className="text-black-default" />
                </button>
                {isOpen && (
                  <DropDownContextMenu setIsOpen={setIsOpen} setActiveTool={setActiveTool} activeTool={activeTool} />
                )}
              </div>
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
                <span className="text-gray-escure rounded-full textarea-[20px]">@</span>
              ) : (
                <span className="text-amber-500 rounded-full textarea-[20px]">@</span>
              )}
            </button>
          </ChatInput>
        </div>
      </div>
    </div>
  );
}
