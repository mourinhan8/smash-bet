import { useCallback, useEffect, useState } from "react";

import { Character, ResponseStatus } from "@/common/types";
import Header from "@/common/components/Header";
import TopTabs from "@/modules/Menu/TopTabs";
import { getAllCharacters } from "@/common/api/character";
import Image from "next/image";

const CharactersPage = () => {
  const [list, setList] = useState<Character[]>([]);

  const fetchAllCharacters = useCallback(async () => {
    const { data } = await getAllCharacters();
    if (data.code === ResponseStatus.OK) {
      setList(data?.data?.rows);
    }
  }, []);

  useEffect(() => {
    fetchAllCharacters();
  }, [fetchAllCharacters]);

  const renderCharacters = useCallback(() => {
    return list?.map((e, index) => (
      <div
        key={index}
        className="flex flex-col self-center place-self-center bg-black/80 w-[200px] p-4 items-center justify-center  rounded-md shadow-xl h-auto"
      >
        <span className="mb-1 text-4xl italic font-extrabold text-center text-white">{e?.name}</span>
        <Image unoptimized width={128} height={128} objectFit="cover" src={e.image} className="w-32 h-32 mt-2" alt="" />
        <div className="flex items-center justify-center gap-2 mt-4 font-extrabold">
          <span className="bg-[#45E4AE] p-1 rounded-md text-white">Won: {e?.win}</span>
          <span className="bg-[#DE8516] p-1  rounded-md  text-white">Lost: {e?.lost}</span>
        </div>
      </div>
    ));
  }, [list]);

  return (
    <main className="min-h-screen bg-no-repeat bg-cover bg-play play-page ">
      <Header />
      <div className="top-0 left-0 z-10 flex flex-col w-full pt-6 pb-5 transition-all">
        <div className=" justify-center px-4 pb-4  w-full h-full grid-rows-[100px_1fr] grid-cols-1 grid">
          <TopTabs />

          <div className="mt-5 border-white bg-inherit ">
            <div className="flex flex-col items-center justify-center p-4">
              <div className="flex items-center text-5xl lg:text-[65px] font-extrabold justify-center gap-2 text-white">OUR CHARACTERS</div>
              <div className="grid items-center justify-center w-full grid-cols-1 gap-4 mt-10 lg:grid-cols-4 lg:w-3/4">
                {renderCharacters()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CharactersPage;
