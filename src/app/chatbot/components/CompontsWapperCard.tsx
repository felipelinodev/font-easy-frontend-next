"use client";

import { ReactElement } from "react";
type ChildrenType = {
  children: ReactElement;
};

export function CompontsWapperCard({ children }: ChildrenType) {
  return (
    <div
      className="border-2 shadow-xl border-white
  bg-[#EFEFEF] inline-block rounded-3xl"
    >
      {children}
    </div>
  );
}
