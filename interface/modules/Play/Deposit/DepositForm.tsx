import { Button, Form, InputNumber, message } from "antd";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useContract, useSigner } from "wagmi";
import { parseEther } from "ethers/lib/utils.js";
import useUserInfo from "@/common/hooks/useUserInfo";

const ABI = [
  {
    inputs: [],
    name: "DepositEth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as any;

const DepositForm: React.FC = () => {
  const [form] = Form.useForm();
  const signer = useSigner();
  const [rate, setRate] = useState(300);
  const { fetchUserInfo } = useUserInfo();

  const contract = useContract({
    address: process.env.NEXT_PUBLIC_SMC_ADDRESS,
    abi: ABI,
    signerOrProvider: signer.data,
  });

  const handleDeposit = async (values: any) => {
    try {
      const response = await contract.functions.DepositEth({ value: parseEther(`${values.amount}`) });
      const tx = await response.wait();
      if (tx.status) {
        message.success("Deposit successfully");
        await fetchUserInfo();
      }
    } catch (error) {
      console.log(error);
      message.error("Deposit failed");
    }
  };

  const fetchRate = async () => {
    try {
      let response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
      const data = await response.json();
      setRate(data?.ethereum?.usd);
    } catch (error) {
      console.log("fetchRate error", error);
    }
  };

  useEffect(() => {
    fetchRate();
  }, []);

  return (
    <div className="flex flex-wrap justify-between w-full">
      <div className="h-full">
        <div className="mb-4 text-xl text-center">NETWORK</div>
        <div className="w-auto hover:opacity-80" style={{ backgroundColor: "black", borderRadius: 10 }}>
          <div className="flex items-center justify-center p-2">
            <Image src="/images/eth.png" alt="" width={100} height={100} />
          </div>
        </div>

        {/* <Radio.Group
          className="flex justify-center w-full h-full mt-3 space-x-3 lg:justify-between"
          value={token}
          onChange={handleTokenChange}
        >
          <Radio.Button className=" h-fit hover:opacity-80" style={{ backgroundColor: "black", borderRadius: "0" }} value="ETH">
            <div className="flex items-center p-2">
              <Image src="/images/eth.png" alt="" width={100} height={100} />
            </div>
          </Radio.Button>
          <Radio.Button className="w-auto h-fit hover:opacity-80" style={{ backgroundColor: "black", borderRadius: "0" }} value="BUSD ">
            <div className="flex items-center p-2">
              <Image src="/images/busd.png" alt="" width={100} height={100} />
            </div>
          </Radio.Button>
        </Radio.Group> */}
      </div>

      <div className="flex-1 mt-5 lg:pl-5 lg:mt-0">
        <div className="input">
          <Form
            initialValues={{
              amount: 0.1,
            }}
            form={form}
            onFinish={handleDeposit}
            layout="vertical"
          >
            <Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.amount !== curValues.amount}>
              {() => {
                const amount = form.getFieldValue("amount");
                return (
                  <div className="mb-3 text-lg text-center play-page">
                    You will receive roughly ~{amount ? (+amount * rate).toFixed(2) : 0} USDT
                  </div>
                );
              }}
            </Form.Item>
            <Form.Item
              name="amount"
              rules={[{ required: true, message: "Your input  must be a number greater than 0 and not empty" }]}
              required
            >
              <InputNumber min={0} controls={false} className="w-full text-white bg-black" size="large" />
            </Form.Item>
            <Form.Item noStyle>
              <Button
                className="bg-[#47DEFF] disabled:bg-[#636363] uppercase rounded-[2px] text-[25px] h-fit hover:opacity-90 font-semibold text-black w-full border-0 mt-0"
                htmlType="submit"
                block
              >
                Deposit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DepositForm;
