import { Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { handleApi, validateFormMessages } from "@/common/utils";

interface IForm {
  winner_wallet: string;
  amount: string;
}

export default function PayRewardForm() {
  const [formGetInfo] = Form.useForm();
  const [formPayment] = Form.useForm<IForm>();
  const [rewardAmount, setRewardAmount] = useState("");
  const [winnerAddress, setWinnerAddress] = useState("");
  const [winnerInfo, setWinnerInfo] = useState({} as any);
  const [loading, setLoading] = useState(false);

  // const fetchCurrentGame = async () => {
  //   try {
  //     const response = await handleApi(getCurrentGame());
  //     if (response.data?.data) {
  //       setWinnerInfo(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log("fetchCurrentGame error", error);
  //   }
  // };

  const setInitialState = () => {
    setRewardAmount("");
    setWinnerAddress("");
    formPayment.resetFields();
  };

  const onFinishGetInfo = async (values: any) => {
    console.log(values);
    formGetInfo.resetFields();
  };

  const onFinishPayment = async () => {
    console.log(rewardAmount);
    console.log(winnerAddress);
    setInitialState();
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card title="Winner info" className={`overflow-hidden rounded-none mt-2`}>
        <Form form={formGetInfo} name="nest-messages" onFinish={onFinishGetInfo} layout="vertical" validateMessages={validateFormMessages}>
          <Form.Item name={"gameId"} label="Input game ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Get info
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="Result" className={`overflow-hidden rounded-none mt-2`}>
        <Form form={formPayment} onFinish={onFinishPayment} layout="vertical" validateMessages={validateFormMessages}>
          <Form.Item name={"winnerWallet"} label="Winner's wallet" rules={[{ required: true }]}>
            <Input
              value={winnerAddress}
              onChange={(e) => {
                setWinnerAddress(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item name={"amount"} label="Reward's amount" rules={[{ required: true }]}>
            <Input
              value={rewardAmount}
              onChange={(e) => {
                setRewardAmount(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
