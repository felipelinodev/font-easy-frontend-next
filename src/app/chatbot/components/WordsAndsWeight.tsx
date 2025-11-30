import { Minus } from "lucide-react";

type WordsAndsWeight = {
  word: string;
  weight: number;
  RemovekeyWords: (word: string) => void;
  isSelected?: boolean;
};

export const WordsAndsWeight = ({
  word,
  weight,
  RemovekeyWords,
  isSelected,
}: WordsAndsWeight) => {
  return (
    <>
      <div key={weight} className={`mr-1 mb-2 cursor-pointer `}>
        <div
          className={`p-2 flex items-center ${
            isSelected ? "border border-[#A5A5A5]" : ""
          } gap-3 rounded-[11px] bg-[#E3E3E3]`}
        >
          <p className="pl-3">{word}</p>
          <p className="border p-1 border-[#C1C1C1] rounded-[5px] color-[#C1C1C1]">
            {weight}%
          </p>
          <button
            onClick={() => RemovekeyWords(word)}
            className=" p-1 rounded-[5px] hover:bg-[#dad8d8] hover:cursor-pointer"
          >
            <Minus color="#A5A5A5" />
          </button>
        </div>
      </div>
    </>
  );
};
