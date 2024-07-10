import { BetInfo, placeBet } from "@/common/api/game";
import { useAppSelector } from "@/common/redux/hooks";
import { Character, ResponseStatus } from "@/common/types";
import { Button, Form, InputNumber, Modal, message } from "antd";
import { useCallback, useMemo, useState } from "react";

import types from "@/common/redux/types";
import { selectValue } from "@/common/redux/utils";
import Image from "next/image";
import useUserInfo from "@/common/hooks/useUserInfo";
import { handleApi } from "@/common/utils";

export interface SmashCardProps {
  characterId?: number;
  listCharacter?: Character[];
  betInfoList?: any[];
  getBetInfo?: any;
  gameId?: number;
  gameType: string;
}

const FIX_AMOUNT_AGAINST_OTHERS = 100;

const SmashCard = ({ listCharacter, betInfoList, characterId, getBetInfo, gameId, gameType }: SmashCardProps) => {
  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));

  const [form] = Form.useForm();

  const [isModal, setModal] = useState(false);
  const { fetchUserInfo } = useUserInfo();
  const character = useMemo(() => {
    return listCharacter.find((e) => e.id === characterId);
  }, [listCharacter, characterId]);

  const handlePlaceBet = useCallback(
    async (values: any) => {
      const amount = values["your-bet"];
      if (!amount || amount <= 0) {
        message.error("You must bet more than 0 USDT");
        return;
      }
      if (gameType === "against_others" && amount !== FIX_AMOUNT_AGAINST_OTHERS) {
        message.error(`You can only bet ${FIX_AMOUNT_AGAINST_OTHERS} USDT for AGAINST OTHERS game`);
        return;
      }

      const response = await handleApi(placeBet({ userId: userInfo.id, gameId, characterId, amount }));
      const { data } = response;
      if (data) {
        getBetInfo?.();
        setModal(false);
        message.success("Bet successfully");
        await fetchUserInfo();
      } else {
        message.error(response.error.data);
      }
    },
    [characterId, fetchUserInfo, gameId, getBetInfo, userInfo.id]
  );

  const handleCancel = () => {
    setModal(false);
  };

  const getShortAddress = useCallback((address: any) => {
    if (!address) {
      return "abcdf";
    }
    return address.substring(0, 5) + "..." + address.slice(-3);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 mt-2 h-fit lg:w-1/2 sm:w-1/2 xl:flex-1">
      {character ? (
        <>
          <div className="flex flex-col items-center gap-2 lg:gap-0 md:space-y-2">
            <div>
              <Image
                unoptimized
                width={60}
                height={60}
                objectFit="cover"
                alt=""
                src={character?.image}
                className="border border-[#a5a5a5] rounded-full min-w-6 h-10"
              />
            </div>
            <div className=" text-base font-semibold lg:text-2xl text-game-white text-sky-100">{`${character?.former} (id: ${character?.id})`}</div>
          </div>
          <div
            onClick={() => setModal(true)}
            className="rounded-md bg-inherit flex justify-center w-[30vw] md:w-[60%] bg-game-gray-dark hover:text-black active:bg-inherit font-semiBold text-white hover:bg-white  cursor-pointer px-4 py-1 lg:px-10 border text-[14px] md:text-[17px] border-game-gray-superlight"
          >
            Betting
          </div>
          <Modal
            title={
              <div className="text-center bg-[#1a2c38]  md:text-[60px] text-[30px] italic font-black">
                NEW BET <span></span>
              </div>
            }
            className="relative top-[10vh] play-page bg-[#1a2c38] p-0 rounded-[10px] "
            open={isModal}
            onCancel={handleCancel}
            footer={false}
          >
            <div className="px-5 mb-5 md:px-[60px] normal-text h-full w-full">
              <div className="name text-center justify-center space-x-3 md:text-[25px] flex items-center italic font-black">
                <div className="mr-3">{character?.name}</div>{" "}
                <Image alt="" width={42} height={42} src={character?.image} unoptimized objectFit="contain" />
              </div>
              <Form form={form} layout="vertical" onFinish={handlePlaceBet}>
                <div className="mt-5 input">
                  <Form.Item
                    name="your-bet"
                    rules={[{ required: true, message: "Please input your bet" }]}
                    initialValue={gameType === "against_others" ? FIX_AMOUNT_AGAINST_OTHERS : null}
                    required
                  >
                    <InputNumber
                      pattern="^[0-9]"
                      min={0}
                      type="number"
                      controls={false}
                      className={`w-full bg-inherit ${gameType === "against_others" ? "text-white" : ""}`}
                      addonAfter="USDT"
                      size="large"
                      disabled={gameType === "against_others" ? true : false}
                    />
                  </Form.Item>
                </div>
                {gameType === "against_others" && (
                  <div className="mt-2 text-xs text-center text-red-500 alert">
                    {`You can only place ${FIX_AMOUNT_AGAINST_OTHERS} USDT bet for AGAINST OTHER game`}
                  </div>
                )}

                <div className="grid mt-3 button gap-y-3">
                  <Form.Item className="mt-3 mb-0">
                    <Button size="large" className="bg-[#47DEFF] font-bold mb-0 w-full" htmlType="submit">
                      PLACE BET
                    </Button>
                  </Form.Item>
                  <Button size="large" className="bg-[#e9ae24] font-bold" onClick={handleCancel}>
                    CANCEL
                  </Button>
                </div>
              </Form>
              {/* <div className="mt-5 text-base italic font-bold leading-5 text-center text-red-500 alert">
                The return on your bet can change based on other hamsters wagers, and it may be adjusted up to 1 minute before the race
                begins.
              </div> */}
            </div>
          </Modal>
        </>
      ) : null}

      <div className="flex flex-col items-center w-full h-auto px-4 mt-2">
        <div className="bg-game-gray-dark h-[150px] gap-1 flex flex-col overflow-y-auto w-full p-2 rounded-[3px] border border-game-gray-superlight">
          {betInfoList.map((e: BetInfo) => (
            <div key={e.id} className="w-full items-center false border-game-gray-superlight rounded-full h-6 grid grid-cols-[1fr_1px_1fr]">
              <span className="text-[14px] lg:text-[16px] items-center justify-center lg:hidden whitespace-nowrap overflow-hidden max-w-[90%] flex text-white text-ellipsis">
                {getShortAddress(e?.userWallet)}
              </span>
              <span className="text-[14px] lg:text-[16px] items-center justify-center lg:flex hidden whitespace-nowrap overflow-hidden max-w-[90%] text-white text-ellipsis">
                {getShortAddress(e?.userWallet)}
              </span>
              <div className="h-3 relative md:-ml-1  w-[1.5px] bg-white " />
              <div className="text-[14px] mr-1  lg:text-[16px] flex text-white items-center justify-center gap-1 text-center">
                <div className="lg:inline-block ">{e?.amount} USDT</div>
                <Image src="/svg/coin.svg" alt="" width={14} height={10} />
              </div>
              {/* <div className="h-3  w-[1.5px] bg-white" />
              <span className="text-[10px] lg:text-[12px] flex  items-center justify-center gap-1 text-game-green text-[#64edfc]">
                66.99
              </span> */}
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default SmashCard;
