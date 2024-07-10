import { ConnectorData, useAccount, useDisconnect } from "wagmi";
import { Dropdown, Space } from "antd";
import { User, UserSquare } from "iconsax-react";
import { getUserInfo, userLogin } from "@/common/api/user";
import { useAppDispatch, useAppSelector } from "@/common/redux/hooks";
import { useCallback, useEffect } from "react";

import { APP_TOKEN_KEY } from "@/common/utils/constants";
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import type { MenuProps } from "antd";
import Term from "./Term";
import { fetchData } from "@/common/redux/actions/fetchAction";
import { handleApi } from "@/common/utils";
import { selectValue } from "@/common/redux/utils";
import types from "@/common/redux/types";
import { useRouter } from "next/router";

const Header = () => {
  const { isConnected, address, connector: activeConnector } = useAccount();
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const dispatch = useAppDispatch();
  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));
  const handleAuthUser = useCallback(
    async (address: string, connector: any) => {
      try {
        const token = localStorage.getItem(APP_TOKEN_KEY);
        if (token) {
          return;
        }
        let resNonce = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/nonce?address=${address}`);
        let resBody = await resNonce.json();

        const signer = await connector.getSigner();
        let signature = await signer.signMessage(resBody.message);

        let opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resBody.tempToken}`,
          },
        };

        const resToken = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify?signature=${signature}`, opts);
        const tokenData = await resToken.json();

        localStorage.setItem(APP_TOKEN_KEY, tokenData.token);

        await handleApi(userLogin(address));

        router.push("/play");
      } catch (error) {
        disconnect();
        localStorage.removeItem(APP_TOKEN_KEY);
        console.log(error);
      }
    },
    [disconnect, router]
  );

  useAccount({
    onConnect: async ({ address, connector }) => {
      handleAuthUser(address, connector);
    },
    onDisconnect: () => {
      localStorage.removeItem(APP_TOKEN_KEY);
    },
  });

  useEffect(() => {
    const handleConnectorUpdate = ({ account }: ConnectorData) => {
      if (account) {
        localStorage.removeItem(APP_TOKEN_KEY);
        handleAuthUser(account, activeConnector);
      }
    };

    if (activeConnector) {
      activeConnector.on("change", handleConnectorUpdate);
    }

    return () => {
      if (activeConnector) {
        activeConnector.off("change", handleConnectorUpdate);
      }
    };
  }, [activeConnector, handleAuthUser]);

  const handleLogout = async () => {
    disconnect();
    localStorage.removeItem(APP_TOKEN_KEY);
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem(APP_TOKEN_KEY);
    if (isConnected && address && token) {
      dispatch(fetchData(types.userInfo, getUserInfo(address)));
    }
  }, [isConnected, address, dispatch]);

  const balance = userInfo?.balance;

  const items: MenuProps["items"] = [
    {
      key: "1",
      type: "group",
      label: (
        <div className="">
          {router.asPath.includes(`/play`) && (
            <div className=" items-center justify-center gap-3 ml-auto">
              <div
                className="term normal-text text-black text-[18px] cursor-pointer text-center"
                onClick={() => router.push("/profile/deposit")}
              >
                Menu
              </div>
            </div>
          )}
          {router.asPath.includes(`/profile`) && (
            <div className="items-center justify-center gap-3 ml-auto">
              <div
                className="term normal-text text-black text-[18px] cursor-pointer text-center"
                onClick={() => router.push("/play")}
              >
                Play
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "2",
      type: "group",
      label: (  <Term/>),
    },
    {
      key: "3",
      type: "group",
      label: (  <div className="flex items-center justify-center gap-3 ml-auto">
      <div
        className="term normal-text text-black text-[18px] cursor-pointer px-2 py-2 rounded-3xl"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>),
    },
  ];
  
  return (
    <div className="w-full app-header landing-page bg-black/50">
      <div className="py-2 text-black lg:py-4 px-3 lg:px-[30px] right-0 left-0 z-10 flex items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <Image className="cursor-pointer" src="/svg/logo.svg" alt="" width={80} height={40} objectFit="contain" />
        </Link>
        <div className="flex items-center justify-between gap-3">
          <div className="hidden md:block"><Term /></div>
          {isConnected ? (
            <>
              <div className="grid items-center grid-flow-col ml-auto space-x-3 text-white">
                <div className="title hidden md:block md:text-[25px] text-[#47DEFF]">Balance</div>
                <div className="border border-white h-full text-[15px] flex items-center px-2 rounded-[7px]">
                  <div className="flex items-center py-2 space-x-1">
                    <Image src="/images/busd.png" alt="" width={18} height={18} />
                    <p>{balance} USDT</p>
                  </div>
                </div>
                <Button
                  onClick={() => router.push("/profile/deposit")}
                  className="bg-[#3FBD88] font-bold  text-xl h-fit md:h-full text-black"
                >
                  <p className="mb-[3px] md:mb-[2px] ml-[2px] md:ml-0">+</p>
                </Button>
                <Button
                  onClick={() => router.push("/profile/withdraw")}
                  className="bg-[#e9ae24]  font-bold text-xl h-fit md:h-full text-black"
                >
                  <p className="mb-[3px] md:mb-[2px] ml-[2px] md:ml-0">-</p>
                </Button>
              </div>

              {router.asPath.includes(`/play`) && (
                <div className="md:flex hidden items-center justify-center gap-3 ml-auto">
                  <div
                    className="term normal-text text-white text-[18px] cursor-pointer px-4 py-2 border border-white rounded-3xl"
                    onClick={() => router.push("/profile/deposit")}
                  >
                    Menu
                  </div>
                </div>
              )}

              {router.asPath.includes(`/profile`) && (
                <div className="md:flex hidden items-center justify-center gap-3 ml-auto">
                  <div
                    className="term normal-text text-white text-[18px] cursor-pointer px-4 py-2 border border-white rounded-3xl"
                    onClick={() => router.push("/play")}
                  >
                    Play
                  </div>
                </div>
              )}

              <div className="md:flex hidden items-center justify-center gap-3 ml-auto">
                <div
                  className="term normal-text text-white text-[18px] cursor-pointer px-4 py-2 border border-white rounded-3xl"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
              <div className="md:hidden">
              <Dropdown className="text-white" menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <div className="flex items-center space-x-2">
                    <UserSquare size="32" color="white" />
                    <DownOutlined />
                  </div>
                </a>
              </Dropdown>
              </div>
            </>
          ) : (
            <Link href="/login">
              <div className="flex items-center gap-1 px-4 py-2 mx-3 text-white border border-white cursor-pointer rounded-3xl">
                <User size="16" />
                SIGN IN
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
