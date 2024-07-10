import { Character, Game, ResponseStatus } from "@/common/types";
import { useCallback, useEffect, useState } from "react";

import { getGamesResult } from "@/common/api/game";
import { Pagination } from "antd";
import Image from "next/image";

const ITEM_PER_PAGE = 6;

export interface GameResultsProps {
  listCharacter?: Character[];
}

const GameResults = ({ listCharacter }: GameResultsProps) => {
  const [listHistory, setListHistory] = useState<Game[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(ITEM_PER_PAGE);

  const fetchHistory = useCallback(
    async (page = currentPage) => {
      const { data } = await getGamesResult(page, itemsPerPage);
      if (data.code === ResponseStatus.OK) {
        setListHistory(data.data.games);
        setTotalPages(data.data.totalPages || 0);
      }
    },
    [currentPage, itemsPerPage]
  );

  const handlePageChange = (current: number) => {
    setCurrentPage(current);
    fetchHistory(current);
  };

  const renderList = useCallback(() => {
    return listHistory
      .filter((e) => e.winnerId)
      .map((c: Game) => {
        const character = listCharacter.find((item) => item.id === c.winnerId);
        return (
          <div
            key={c.id}
            className="flex items-center justify-between w-auto gap-1 px-1 mb-2 space-x-3 text-center transition-all shadow-xl cursor-pointer  bg-inherit min-h-[50px] hover:opacity-75 rounded-xl"
          >
            {character ? (
              <>
                <div className="transition-all justify-between bg-black border border-[#a5a5a5] w-full justify-end rounded-full text-[14px] lg:text-[16px] uppercase truncate flex items-center p-1 mr-1 lg:mr-0 text-white">
                  <Image
                    src={character.image}
                    className="border border-[#a5a5a5] rounded-full min-w-6"
                    alt=""
                    objectFit="cover"
                    width={45}
                    height={45}
                    unoptimized
                  />
                  <div className="ml-2 mr-3">{character.name}</div>
                </div>
              </>
            ) : null}
          </div>
        );
      });
  }, [listCharacter, listHistory]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="w-full lg:w-[32%] lg:max-w-[400px] lg:mt-0 mt-2 sm:top-2 md:top-0 h-auto lg:h-full  flex-col flex mb-5">
      <div className="lg:justify-start justify-between backdrop-blur-sm border lg:p-5 p-3 rounded-[7px] w-full overflow-x-auto flex lg:min-h-[460px] lg:flex-col flex-row gap-2">
        {renderList()}
      </div>
      {/* Pagination */}
      <div className="justify-center flex-grow hidden w-full mt-5 lg:flex">
        <Pagination current={currentPage} onChange={handlePageChange} showSizeChanger={false} total={totalPages * itemsPerPage} />
      </div>
    </div>
  );
};

export default GameResults;
