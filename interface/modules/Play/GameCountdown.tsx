import CountDown from "@/common/components/CountDown";
import Image from "next/image";
import { memo, useEffect, useState } from "react";

interface GameCountdownProps {
  startedAt: number;
  fetchNextGame?: any;
}

const GameCountdown = ({ startedAt, fetchNextGame }: GameCountdownProps) => {
  const [time, setTime] = useState<number>(null);

  useEffect(() => {
    if (!time) {
      setTime(startedAt);
    }
  }, [startedAt, time]);

  return (
    <div className="flex justify-center md:mr-0 w-fit relative h-fit border p-2 rounded-full bg-black pl-10 pr-5 md:pr-5 md:pl-16 mt-5 gap-1 flex-wrap">
      <div className="text-white lg:text-[21px] text-[14px]">Place your bets, race starts in:</div>
      <div className="text-white lg:text-[21px] text-[14px]">
        <span>
          <CountDown fetchNextGame={fetchNextGame} countDownDistance={time ? new Date(time).getTime() - Date.now() : 0} />
        </span>
      </div>
      <div className="logo  absolute  -left-10 -top-5">
        <Image src="/svg/mario-place-bet.svg" alt="" width={79} height={71} />
      </div>
    </div>
  );
};

export default memo(GameCountdown);
