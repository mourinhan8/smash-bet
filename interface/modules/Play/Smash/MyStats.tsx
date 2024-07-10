import { Pie, PieChart } from "recharts";

import BetsHistory from "@/modules/Play/BetsHistory";
import Header from "@/common/components/Header";
import RecentPayout from "./RecentPayout";
import { useEffect, useState } from "react";
import { handleApi } from "@/common/utils";
import { totalValueByTransaction } from "@/common/api/profile";
import { ResponseStatus } from "@/common/types";
import { useAppSelector } from "@/common/redux/hooks";
import { selectValue } from "@/common/redux/utils";
import types from "@/common/redux/types";

const MyStats = () => {
  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));

  const [totalDeposit, setTotalDeposit] = useState(0)
  const [totalEarn, setTotalEarn] = useState(0)
  const fetchTotalDeposit = async (userId: number) => {
    const response = await handleApi(totalValueByTransaction(userId, 'deposit'));
    if (response.data.code === ResponseStatus.OK && +response.data.data > 0) {
      setTotalDeposit(response.data.data)
    }
  }
  const fetchTotalReward = async (userId: number) => {
    const response = await handleApi(totalValueByTransaction(userId, 'reward'));
    if (response.data.code === ResponseStatus.OK && +response.data.data > 0) {
      setTotalEarn(response.data.data)
    }
  }
  const renderActiveShape = (props: { cx: number; cy: number; fill: string }) => {
    const { cx, cy, fill } = props;

    return (
      <g>
        <text x={cx} y={cy} textAnchor="middle" fill={fill}>
          {"data I want to show"}
        </text>
      </g>
    );
  };

  useEffect(() => {
    if (userInfo?.id) {
      fetchTotalDeposit(userInfo?.id);
      fetchTotalReward(userInfo?.id);
    }
  }, [userInfo?.id]);

  return (
    <div>
      <div className="statistic grid grid-cols-2 gap-x-5 grid-rows-1">
        <div className="number grid grid-rows-2 gap-y-5 h-full">
          <div className="owner  border border-white rounded-[5px] p-3">
            <div className="title text-xl ">$DEPOSIT</div>
            <div className="number text-center lg:text-5xl text-3xl font-bold">{totalDeposit}</div>
          </div>
          <div className="earn  border border-white rounded-[5px] p-3">
            <div className="title text-xl">$ EARNED</div>
            <div className="number text-center lg:text-5xl text-3xl font-bold">{totalEarn}</div>
          </div>
        </div>
      </div>
      <div className="mt-10 ">
        <RecentPayout />
      </div>{" "}
    </div>
  );
};

export default MyStats;
