import { CompontsWapperCard } from "../components/CompontsWapperCard";

type fontPageProps = {
  params: string;
};

export default async function FontPage({ params }: fontPageProps) {
  const { fontPage } = await params;
  return (
    <div className="flex gap-5 mb-10 mt-10 items-center flex-col justify-center">
      <CompontsWapperCard>
        <div className="p-10">
          <div className="flex items-center justify-between border-b pb-4 border-[#1E1E1C]">
            <div className="flex items-center gap-6">
              <h1 className="text-6xl font-bold text-[#1E1E1C]">{fontPage}</h1>
              <div
                className="h-8 rounded-full px-8 justify-center w-fit flex items-center text-xs border font-bold
            border-[#BEBEBE] text-[#BEBEBE]"
              >
                Gratuito
              </div>
            </div>
            <p className="text-sm text-[#1E1E1C]">
              License: Personal & Commercial Use!
            </p>
          </div>
          <p className="text-[16px] pt-4 text-[#1E1E1C]">
            Uma das características marcantes da fonte Poppins é a sua origem.
            Ela foi desenvolvida pela designer indiana, Ninad Kale, como parte
            do projeto de tipografia sober ed Athena, um sistema de fontes
            abertas para a Alfabetização Global.
          </p>
        </div>
      </CompontsWapperCard>
      <CompontsWapperCard>
        <div>
          <h1 className="text-3xl p-6 text-center font-bold text-[#1E1E1C]">
            ABCDEFGHIJKLMNOPWXY123456789!@#$%^&*
          </h1>
        </div>
      </CompontsWapperCard>
    </div>
  );
}
