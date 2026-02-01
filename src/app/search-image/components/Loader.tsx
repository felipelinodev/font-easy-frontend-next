import React from "react";

const Loader = () => {
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full border-[3px]"></div>
      <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-orange-300 border-l-orange-400 animate-spin"></div>
    </div>
  );
};

export default Loader;
