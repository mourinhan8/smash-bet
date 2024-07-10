import { Button, Card } from "antd";
import { Character, ResponseStatus } from "@/common/types";
import { generateGameType, handleApi, setRandomInterval } from "@/common/utils";
import { useCallback, useEffect, useState } from "react";

import GameResults from "@/modules/Play/GameResults";
import Header from "@/common/components/Header";
import Image from "next/image";
import NextGameInfo from "@/modules/Play/CurrentGameInfo";
import Twitch from "@/modules/Play/Twitch";
import _ from "lodash";
import { getAllCharacters } from "@/common/api/character";
import { getGameEstimate } from "@/common/api/game";
import { selectValue } from "@/common/redux/utils";
import types from "@/common/redux/types";
import { useAppSelector } from "@/common/redux/hooks";
import ChatBox from "@/modules/Chat";

const PlayPage = () => {
  const [listCharacter, setListCharacter] = useState<Character[]>([]);
  const [currentGameType, setCurrentGameType] = useState("");
  const [nextGameType, setNextGameType] = useState("");
  const [gameEstimate, setGameEstimate] = useState(null);

  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));

  const fetchAllCharacters = useCallback(async () => {
    const { data } = await getAllCharacters();
    if (data.code === ResponseStatus.OK) {
      setListCharacter(data.data.rows);
    }
  }, []);

  const fetchGameEstimate = async (userId: number) => {
    const response = await handleApi(getGameEstimate(userId));
    const { data } = response;
    if (data) {
      setGameEstimate(data.data);
    }
  };

  const onSetCurrentGameType = (value: string) => {
    setCurrentGameType(value);
  };

  const onSetNextGameType = (value: string) => {
    setNextGameType(value);
  };

  useEffect(() => {
    fetchAllCharacters();
  }, [fetchAllCharacters]);

  useEffect(() => {
    let interval = null as any;
    if (userInfo?.id) {
      if (!(!currentGameType && !nextGameType)) {
        interval = setRandomInterval(
          async () => {
            await fetchGameEstimate(userInfo?.id);
          },
          1000 * 5,
          1000 * 10
        );
      } else {
        if (interval) {
          interval?.clear();
        }
        return;
      }
    }
    return () => {
      if (interval) {
        interval?.clear();
      }
    };
  }, [userInfo?.id, currentGameType, nextGameType]);

  return (
    <main
      className={`play-page overflow-hidden  min-h-screen lg:h-full bg-play bg-cover bg-center`}
    >
      <Header />

      <div className="pb-5 top-0 left-0 w-full mt-[20px] transition-all z-10">
        <p className="text-amber-400 text-center">{currentGameType && `Current Game type: ${generateGameType(currentGameType)}`}</p>
        <div className="md:flex relative">
          <div className="flex relative z-10 md:w-[81vw] flex-col">
            <div className="h-full w-full relative py-4 md:px-20 px-8 flex-grow flex flex-col">
              <div className="flex flex-wrap justify-between">
                {true && (
                  <>
                    <GameResults listCharacter={listCharacter} />
                    <Twitch />
                  </>
                )}
              </div>
              {!(!currentGameType && !nextGameType) && (
                <div className="mb-2 pt-2 pb-5 w-full mt-5 h-full rounded-xl bg-black bg-opacity-60">
                  <div className="flex items-center text-5xl lg:text-[65px] font-extrabold justify-center gap-2 text-white">
                    GAME ESTIMATE
                  </div>
                  <div className="grid grid-cols-1 gap-y-4 justify-items-center gap-x-8 px-4 mt-2 md:grid-cols-3 lg:grid-cols-3">
                    <Card
                      title="Bet amount"
                      size="small"
                      headStyle={{ fontSize: "2em" }}
                      bodyStyle={{ fontSize: "3em", fontWeight: "bold" }}
                      style={{ backgroundColor: "rgba(60, 60, 60, 0)", textAlign: "center" }}
                      className="flex-auto w-full"
                    >
                      <p>$ {gameEstimate?.bet_amount || 0}</p>
                    </Card>
                    <Card
                      size="small"
                      headStyle={{ fontSize: "2em" }}
                      bodyStyle={{ fontSize: "3em", fontWeight: "bold" }}
                      title="Quote"
                      style={{ backgroundColor: "rgba(60, 60, 60, 0)", textAlign: "center" }}
                      className="flex-auto w-full"
                    >
                      <p>{gameEstimate?.quote || 0}</p>
                    </Card>
                    <Card
                      size="small"
                      headStyle={{ fontSize: "2em" }}
                      bodyStyle={{ fontSize: "3em", fontWeight: "bold" }}
                      title="Estimate cashout"
                      style={{ backgroundColor: "rgba(60, 60, 60, 0)", textAlign: "center" }}
                      className="flex-auto w-full"
                    >
                      <p>$ {gameEstimate?.estimate_cashout || 0}</p>
                    </Card>
                  </div>
                </div>
              )}

              <NextGameInfo listCharacter={listCharacter} setCurrentGameType={onSetCurrentGameType} onSetNextGameType={onSetNextGameType} />
            </div>
            <div className="logo absolute z-10 -top-10">
              <Image src="/svg/mario-item-1.svg" alt="" width={130} height={270} />
            </div>
          </div>

          <ChatBox />
        </div>
      </div>
    </main>
  );
};

export default PlayPage;
function useWindowDimensions(): { height: any; width: any } {
  throw new Error("Function not implemented.");
}
