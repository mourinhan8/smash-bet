import { useAppSelector } from "@/common/redux/hooks";
import type { RadioChangeEvent, SelectProps } from "antd";
import { Button, Form, Input, Radio, message } from "antd";
import React, { useState } from "react";

import { createWithdraw } from "@/common/api/profile";
import types from "@/common/redux/types";
import { selectValue } from "@/common/redux/utils";
import { handleApi } from "@/common/utils";
import Image from "next/image";
import useUserInfo from "@/common/hooks/useUserInfo";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

interface WithdrawFormProps {
  fetchUserWithdrawHistory: (userId: number, page?: number) => Promise<void>;
  currentPage: number;
}

const WithdrawForm = ({ fetchUserWithdrawHistory, currentPage }: WithdrawFormProps) => {
  const [token, setToken] = useState("USDT");
  const [amount, setAmount] = useState<number>();
  const [form] = Form.useForm();
  const { fetchUserInfo } = useUserInfo();
  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));
  const handleTokenChange = (e: RadioChangeEvent) => {
    setToken(e.target.value);
  };

  const handleWithdraw = async () => {
    const response = await handleApi<string>(createWithdraw(userInfo?.id, amount));

    if (response.success === false) {
      message.error("The amount must be lower than user's balance");
    } else {
      message.success("Success");
      await fetchUserInfo();
      await fetchUserWithdrawHistory(userInfo?.id, currentPage);
    }
  };

  return (
    <div>
      <Radio.Group className="flex justify-center mx-auto space-x-3" value={token} onChange={handleTokenChange}>
        {/* <Radio.Button className="h-full hover:opacity-80" style={{ backgroundColor: "#1a3344", borderRadius: "0" }} value="ETH">
          <div className="flex items-center p-2">
            <Image src="/images/eth.png" alt="" width={50} height={50} />
          </div>
  </Radio.Button>*/}
        <Radio.Button className="h-full hover:opacity-80" style={{ backgroundColor: "#1a3344", borderRadius: "10px" }} value="USDT">
          <div className="flex items-center p-2">
            <Image src="/images/busd.png" alt="" width={50} height={50} />
          </div>
        </Radio.Button>
      </Radio.Group>

      <div className="mt-5">
        <div className="input">
          <Form form={form} layout="vertical">
            <Form.Item
              name="your withdraw"
              rules={[{ required: true, message: "Your input  must be a number greater than 0 and not empty" }]}
              required
            >
              <Input
                onChange={(e) => setAmount(Number(e?.target.value))}
                defaultValue={0}
                pattern="^[0-9]"
                min={0}
                className="w-full bg-inherit"
                size="large"
              />
            </Form.Item>
          </Form>
        </div>
        <div className="flex justify-center mt-2 button">
          <Button
            onClick={handleWithdraw}
            size="large"
            className="bg-[#47DEFF] hover:opacity-90 font-semibold text-black min-w-[50%] border-0 mt-0"
          >
            Request Withdrawal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawForm;
