import { Dispatch, SetStateAction } from "react";

type InputTextPreviewProps = {
  SetFontPreviewName: Dispatch<SetStateAction<string>>;
};

const InputFontTextPreview = ({
  SetFontPreviewName,
}: InputTextPreviewProps) => {
  const handdleInput = (value: SetStateAction<string>) => {
    SetFontPreviewName(value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Digite seu texto aqui"
        className="h-10 border rounded-full p-5 placeholder-black-default border-[#BEBEBE]"
        onChange={(e) => {
          handdleInput(e.target.value);
        }}
      />
    </div>
  );
};

export default InputFontTextPreview;
