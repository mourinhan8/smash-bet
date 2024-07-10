import { memo, useEffect, useState } from "react";

function CountDown({ countDownDistance, fetchNextGame }: { countDownDistance: number; fetchNextGame?: any }) {
  const [countdown, setCountdown] = useState(0);

  const addZero = (num: number) => {
    return num < 10 ? "0" + num : num;
  };

  useEffect(() => {
    let interval = null as any;
    if (countDownDistance) {
      let countdown = countDownDistance;
      interval = setInterval(() => {
        countdown = countdown - 1000;
        if (countdown < 0) {
          if (fetchNextGame) {
            fetchNextGame();
          }
          clearInterval(interval);
        } else {
          setCountdown(countdown);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [countDownDistance, fetchNextGame]);

  let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  let hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  return (
    <section className="font-medium ml-0 bg-inherit  rounded-md px-1 inline-block">
      {addZero(days)} : {addZero(hours)} : {addZero(minutes)} : {addZero(seconds)}
    </section>
  );
}

export default memo(CountDown);
