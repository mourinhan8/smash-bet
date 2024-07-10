import { getUserGamesStats } from "@/common/api/user";
import Header from "@/common/components/Header";
import { useAppSelector } from "@/common/redux/hooks";
import types from "@/common/redux/types";
import { selectValue } from "@/common/redux/utils";
import { handleApi } from "@/common/utils";
import TopTabs from "@/modules/Menu/TopTabs";
import BetsHistory from "@/modules/Play/BetsHistory";
import { useEffect, useState } from "react";

const BetsPage = () => {
  const [userGamesStats, setUserGamesStats] = useState(null);

  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));

  const fetchUserStats = async (userId: number) => {
    const response = await handleApi(getUserGamesStats(userId));
    const { data } = response;
    if (data) {
      setUserGamesStats(data.data);
    }
  };

  useEffect(() => {
    if (userInfo?.id) {
      fetchUserStats(userInfo?.id);
    }
  }, [userInfo?.id]);
  return (
    <main className="bg-play play-page bg-no-repeat bg-cover  min-h-screen ">
      <Header />
      <div className="pb-5 top-0 left-0 w-full pt-6 transition-all  z-10 flex flex-col">
        <div className=" justify-center px-4 pb-4  w-full h-full grid-rows-[100px_1fr] grid-cols-1 grid">
          <TopTabs />
          <div className="mt-5 bg-inherit  border-white">
            <div className="flex flex-col items-center justify-center p-4">
              <div className="statistic text-white">
                <div className="number grid grid-cols-2 gap-20 h-full w-full text-center">
                  <div className="owner border border-white rounded-[5px] p-4">
                    <div className="title text-xl ">$TOTAL CASHOUT LIFEFIME</div>
                    <div className="number text-center lg:text-5xl text-3xl font-bold">$ {userGamesStats?.totalCashout}</div>
                  </div>
                  <div className="earn border border-white rounded-[5px] p-4">
                    <div className="title text-xl">$TOTAL BET LIFE TIME</div>
                    <div className="number text-center lg:text-5xl text-3xl font-bold">$ {userGamesStats?.totalBetAmount}</div>
                  </div>
                </div>
              </div>
              <div className="mt-10 xl:w-[55vw] lg:w-[75vw] w-full">
                <BetsHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BetsPage;
