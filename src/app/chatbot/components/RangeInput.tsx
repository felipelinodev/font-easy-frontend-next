"use client";
import React, {
  Dispatch,
  ReactEventHandler,
  SetStateAction,
  useState,
} from "react";

type RangeInputProps = {
  setFontSizePreviw: Dispatch<SetStateAction<number>>;
  fontSizePreviw: number;
};

const RangeInput = ({ setFontSizePreviw, fontSizePreviw }: RangeInputProps) => {
  const HandleRange = (value: string) => {
    setFontSizePreviw(parseInt(value));
  };
  return (
    <div className="flex gap-3 items-center">
      <p className="text-[16px]">{fontSizePreviw}px</p>

      <input
        type="range"
        className="h-1 accent-[#F07F1C] bg-[#FFDCC6] rounded-full  appearance-none cursor-pointer"
        onChange={(e) => HandleRange(e.target.value)}
      />
    </div>
  );
};

export default RangeInput;
