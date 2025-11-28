"use client";

import { ReactElement } from "react";
type ChildrenType = {
  children: ReactElement;
};

export function CompontsWapperCard({ children }: ChildrenType) {
  return (
    <div
      className="border-2 mt-15 mb-10 shadow-xl border-white
  bg-[#EFEFEF] w-full max-w-[864.98px] inline-block rounded-3xl"
    >
      {children}
    </div>
  );
}
