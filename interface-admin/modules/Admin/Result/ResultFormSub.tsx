import { Button, Card, Form, Input, InputNumber, message } from "antd";
import { handleApi, validateFormMessages } from "@/common/utils";
import { useEffect, useState } from "react";
import { finishGame, getCurrentGame, getListBetByGameId } from "@/common/api/admin";
import dayjs from "dayjs";
import classNames from "classnames";

export default function ResultForm() {
  const [form] = Form.useForm();
  const [currentGameResponse, setCurrentGameResponse] = useState({} as any);
  const [listBetResponse, setListBetResponse] = useState([] as any);
  const [loading, setLoading] = useState(false);

  const fetchListBet = async (gameId: number) => {
    try {
      const response = await handleApi(getListBetByGameId(gameId));
      if (response.data?.data) {
        setListBetResponse(response.data.data);
      }
    } catch (error) {
      console.log("fetchListBet error", error);
    }
  };

  const fetchCurrentGame = async () => {
    try {
      const response = await handleApi(getCurrentGame());
      if (response.data?.data) {
        setCurrentGameResponse(response.data.data);

        fetchListBet(response.data.data?.games?.id);
      }
    } catch (error) {
      console.log("fetchCurrentGame error", error);
    }
  };

  useEffect(() => {
    fetchCurrentGame();
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const response = await handleApi(finishGame(+values.gameId, +values.winnerId));
      if (response?.data?.code === "OK") {
        message.success("Update game result successfully");
        form.resetFields();
        fetchCurrentGame();
      } else {
        throw new Error(response?.error?.data);
      }
    } catch (error) {
      message.error(`Update game result failed: ${error.message}`);
      console.log("finishGame error", error);
    }
    setLoading(false);
  };

  const currentGame = currentGameResponse?.games;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card title="Current game info" className={`overflow-hidden rounded-none mt-2`}>
        <div>
          <p>
            Current game id: <span className="font-bold">{currentGame?.id}</span>
          </p>
          <p>
            Participants: <span className="font-bold">{listBetResponse.length || 0}</span>
          </p>
          <p>
            End time:{" "}
            <span className={classNames("font-bold", new Date(currentGame?.finishedAt) < new Date() ? "text-red-500" : "text-black")}>
              {dayjs(currentGame?.finishedAt).format("MMM DD, YYYY - HH:mm:ss")}
            </span>
          </p>
          <p>
            CharacterId 1: <span className="font-bold">{currentGame?.firstCharacterId}</span>
          </p>
          <p>
            CharacterId 2: <span className="font-bold">{currentGame?.secondCharacterId}</span>
          </p>
          <p>
            CharacterId 3: <span className="font-bold">{currentGame?.thirdCharacterId}</span>
          </p>
          <p>
            CharacterId 4: <span className="font-bold">{currentGame?.fourthCharacterId}</span>
          </p>
        </div>
      </Card>
      <Card title="Update result" className={`overflow-hidden rounded-none mt-2`}>
        <Form form={form} layout="vertical" name="nest-messages" onFinish={onFinish} validateMessages={validateFormMessages}>
          <Form.Item name={"gameId"} label="Game ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"winnerId"} label="Winner ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block className="mt-2" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
