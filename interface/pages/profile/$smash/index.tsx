import { Button, RadioChangeEvent, Tabs } from "antd";

import BuySellHams from "@/modules/Play/Smash/BuySellSmash";
import Header from "@/common/components/Header";
import MyStats from "@/modules/Play/Smash/MyStats";
import RecentPayout from "@/modules/Play/Smash/RecentPayout";
import { SizeType } from "antd/es/config-provider/SizeContext";
import TopTabs from "@/modules/Menu/TopTabs";
import { useState } from "react";

const TabPane = Tabs.TabPane;

const SmashPage = () => {
  return (
    <main className="bg-play play-page bg-no-repeat bg-cover text-white min-h-screen">
      <Header />
      <div className="pb-5 top-0 left-0 w-full pt-6 transition-all  z-10 flex flex-col">
        <div className=" justify-center px-4 pb-4  w-full h-full grid-rows-[100px_1fr] grid-cols-1 grid">
          <TopTabs />

          <div className="mt-5 bg-inherit rounded-md">
            <div className="flex flex-col items-center justify-center p-4">
              <div className="flex items-center text-5xl lg:text-[65px] font-extrabold justify-center gap-2 text-white">#SMASH TOKEN</div>
              <div className="text-3xl mt-2">Invest in the SMASH token and earn passive income!</div>
              <div className="menu lg:w-[70vw] w-full">
                {" "}
                <Tabs
                  defaultActiveKey="1"
                  size="large"
                  type="card"
                  centered
                  style={{ marginBottom: 32, marginTop: 20 }}
                  items={new Array(1).fill(null).map((_, i) => {
                    const id = String(i + 1);
                    return {
                      label: id == "1" ? "MY STATS" : "BUY/SELL SMASH",
                      key: id,
                      children: id == "1" ? <MyStats /> : <BuySellHams />,
                    };
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SmashPage;
