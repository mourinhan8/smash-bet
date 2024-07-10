import { useAccount, useNetwork } from "wagmi";

import { Book } from "iconsax-react";
import { Divider } from "antd";
import Header from "@/common/components/Header";
import LandingPage from "./landing-page";
import type { NextPage } from "next";

const Main: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  console.log(address, isConnected, chain);

  return (
    <div className=" bg-cover  bg-header  md:bg-center" style={{ minHeight: 400 }}>
      <Header />
      <LandingPage />
    </div>
  );
};

export default Main;
