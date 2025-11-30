"use client";
import React, { createContext, useState } from "react";

export type FontItem = {
  name: string;
  rank: number;
  category: string;
  font_variation: number;
  files: {
    regular: string;
    [key: string]: string | undefined;
  };
};

type MainContextProps = {
  fonts: FontItem[];
  setFonts: (v: FontItem[]) => void;
};

export const MainContext = createContext<MainContextProps | null>(null);

export function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fonts, setFonts] = useState<FontItem[]>([]);
  return (
    <MainContext.Provider value={{ fonts, setFonts }}>
      {children}
    </MainContext.Provider>
  );
}
