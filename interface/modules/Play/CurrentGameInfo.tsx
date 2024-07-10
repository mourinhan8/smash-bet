import { BetInfo, CurrentGame, NextGame, getBetForCharacter, getCurrentGame, getGameNext } from "@/common/api/game";
import { Character, ResponseStatus } from "@/common/types";
import { memo, useCallback, useEffect, useState } from "react";

import GameCountdown from "@/modules/Play/GameCountdown";
import SmashCard from "@/modules/Play/SmashCard";
import useUserInfo from "@/common/hooks/useUserInfo";
import { generateGameType, setRandomInterval } from "@/common/utils";
export interface NextGameInfoProps {
  listCharacter?: Character[];
  setCurrentGameType: (params: string) => void;
  onSetNextGameType: (params: string) => void;
}

const NextGameInfo = ({ listCharacter, setCurrentGameType, onSetNextGameType }: NextGameInfoProps) => {
  const [currentGame, setCurrentGame] = useState<CurrentGame>(null);
  const [nextGameData, setNextGameData] = useState<NextGame>(null);
  const [firstBetInfoList, setFirstChar] = useState<BetInfo[]>([]);
  const [secondBetInfoList, setSecondChar] = useState<BetInfo[]>([]);
  const [thirdBetInfoList, setThirdChar] = useState<BetInfo[]>([]);
  const [fourthBetInfoList, setFourthChar] = useState<BetInfo[]>([]);
  const { fetchUserInfo } = useUserInfo();

  const fetchBetForCharacter = useCallback(async (gameId: number, characterId: number, setCharFunc: any) => {
    const { data } = await getBetForCharacter({ gameId, characterId });
    if (data.code === ResponseStatus.OK && setCharFunc) {
      setCharFunc(data.data);
    }
  }, []);

  const getBetInfo = useCallback(
    async (nextData: NextGame = nextGameData) => {
      const { id: gameId, thirdCharacterId, firstCharacterId, fourthCharacterId, secondCharacterId } = nextData;
      await Promise.all([
        await fetchBetForCharacter(gameId, firstCharacterId, setFirstChar),
        await fetchBetForCharacter(gameId, secondCharacterId, setSecondChar),
        await fetchBetForCharacter(gameId, thirdCharacterId, setThirdChar),
        await fetchBetForCharacter(gameId, fourthCharacterId, setFourthChar),
      ]);
    },
    [fetchBetForCharacter, nextGameData]
  );

  const fetchNextGame = useCallback(async () => {
    const currentRes = await getCurrentGame();
    if (currentRes && currentRes.data.code == ResponseStatus.OK && currentRes.data.data.games) {
      setCurrentGame(currentRes.data.data.games);
      setCurrentGameType(currentRes.data.data.games.type);
      return;
    }
    setCurrentGame(null);
    setCurrentGameType(null);

    const { data } = await getGameNext();

    if (data.code == ResponseStatus.OK && data.data.next) {
      const nextGame = data.data.next;
      const startTime = nextGame.startedAt;
      const nowTime = Date.now();
      const countdownTime = startTime - nowTime;
      if (countdownTime <= 45 * 60 * 1000) {
        await getBetInfo(data.data.next);
        setNextGameData(data.data.next);
        onSetNextGameType(data.data.next.type);
      } else {
        setNextGameData(null);
        onSetNextGameType(null);
      }
    } else {
      setNextGameData(null);
      onSetNextGameType(null);
    }
  }, [getBetInfo]);

  useEffect(() => {
    fetchNextGame();
  }, [fetchNextGame]);

  useEffect(() => {
    let interval2 = null as any;

    if (currentGame) {
      if (interval2) {
        interval2?.clear();
      }
      interval2 = setRandomInterval(
        () => {
          fetchNextGame();
        },
        1000 * 5,
        1000 * 10
      );
    } else {
      fetchUserInfo();
      interval2?.clear();
    }

    return () => {
      interval2?.clear();
    };
  }, [currentGame, fetchNextGame, fetchUserInfo]);

  useEffect(() => {
    let interval = null as any;
    if (nextGameData) {
      interval?.clear();
      return;
    } else if (!currentGame && !nextGameData && !interval) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      interval = setRandomInterval(
        async () => {
          await fetchNextGame();
        },
        1000 * 5,
        1000 * 10
      );
    }

    return () => {
      interval?.clear();
    };
  }, [currentGame, fetchNextGame, nextGameData]);

  if (currentGame) {
    return <div className="animate-pulse text-center mt-12 text-white font-bold text-7xl">Game is in progress...</div>;
  }

  if (!nextGameData) {
    return <div className="animate-pulse text-center mt-12 text-white font-bold text-7xl">Waiting for new game...</div>;
  }

  return (
    <>
      <div className="mt-[10px]">
        <div className="flex justify-center w-full">
          <GameCountdown fetchNextGame={fetchNextGame} startedAt={nextGameData?.startedAt} />
        </div>
        <p className="text-white font-bold text-center my-5 text-2xl">{`Next Game type: ${generateGameType(nextGameData.type)}`}</p>
        {nextGameData ? (
          <div className="mb-5 pb-5 w-full items-center flex flex-wrap select-none justify-center rounded-xl bg-black bg-opacity-40">
            <SmashCard
              listCharacter={listCharacter}
              betInfoList={firstBetInfoList}
              characterId={nextGameData.firstCharacterId}
              getBetInfo={getBetInfo}
              gameId={nextGameData.id}
              gameType={nextGameData.type}
              {...nextGameData}
            />
            <SmashCard
              listCharacter={listCharacter}
              betInfoList={secondBetInfoList}
              characterId={nextGameData.secondCharacterId}
              getBetInfo={getBetInfo}
              gameId={nextGameData.id}
              gameType={nextGameData.type}
              {...nextGameData}
            />
            <SmashCard
              listCharacter={listCharacter}
              betInfoList={thirdBetInfoList}
              characterId={nextGameData.thirdCharacterId}
              getBetInfo={getBetInfo}
              gameId={nextGameData.id}
              gameType={nextGameData.type}
              {...nextGameData}
            />
            <SmashCard
              listCharacter={listCharacter}
              betInfoList={fourthBetInfoList}
              characterId={nextGameData.fourthCharacterId}
              getBetInfo={getBetInfo}
              gameId={nextGameData.id}
              gameType={nextGameData.type}
              {...nextGameData}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default memo(NextGameInfo);
