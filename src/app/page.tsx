"use server";

import Headline from "@/components/svg/HeadlineHome.svg";

export default async function Home() {
  return (
    <div className="bg-zinc-100 h-full justify-center flex flex-col items-center">
      <div className="m-20"></div>
      <Headline className="w-full h-auto max-w-[810px]" viewBox="0 0 810 212" />
    </div>
  );
}
