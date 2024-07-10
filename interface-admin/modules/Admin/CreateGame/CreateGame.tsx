import { Alert, Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, Select, message } from "antd";
import { handleApi, validateFormMessages } from "@/common/utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { createNewGame, getAllCharacters, getCurrentGame, getGameNext, getListGames } from "@/common/api/admin";
import Image from "next/image";
import { useAppDispatch } from "@/common/redux/hooks";
import { fetchData } from "@/common/redux/actions/fetchAction";
import types from "@/common/redux/types";
import { PAGE_SIZE } from "./ListGame";

const BET_TYPE = [
  {
    name: "Against System",
    value: "against_system",
  },
  {
    name: "Against Others",
    value: "against_others",
  },
];

export default function CreateGameForm() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [firstCharacterId, setFirstCharacterId] = useState("");
  const [secondCharacterId, setSecondCharacterId] = useState("");
  const [thirdCharacterId, setThirdCharacterId] = useState("");
  const [fourthCharacterId, setFourthCharacterId] = useState("");
  const [betType, setBetType] = useState(BET_TYPE[0].value);

  const [currentGame, setCurrentGame] = useState({} as any);
  const [characters, setCharacters] = useState({} as any);
  const [loading, setLoading] = useState(false);

  const [nextGameData, setNextGameData] = useState(null);

  const fetchNextGame = async () => {
    const { data } = await handleApi(getGameNext())
    if (data) {
      setNextGameData(data.data.next)
    }
  };

  const fetchCurrentGame = async () => {
    try {
      const response = await handleApi(getCurrentGame());
      if (response.data?.data) {
        setCurrentGame(response.data.data);
      }
    } catch (error) {
      console.log("fetchCurrentGame error", error);
    }
  };
  const fetchCharacters = async () => {
    try {
      const response = await handleApi(getAllCharacters());
      if (response.data?.data) {
        setCharacters(response.data.data);
      }
    } catch (error) {
      console.log("setCharacters error", error);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    console.log(values);
    try {
      const response = await handleApi(
        createNewGame(
          values.gameType,
          +values.firstCharacterId,
          values.firstCharacterRate,
          +values.secondCharacterId,
          values.secondCharacterRate,
          +values.thirdCharacterId,
          values.thirdCharacterRate,
          +values.fourthCharacterId,
          values.fourthCharacterRate,
          values.streamUrl,
          values.duration[0].unix() * 1000,
          values.duration[1].unix() * 1000
        )
      );
      if (response.data) {
        message.success("Create new game successfully");
        form.resetFields();
        fetchCurrentGame();
        dispatch(fetchData(types.listGames, getListGames(1, PAGE_SIZE)));
      } else {
        console.log(response);
        throw new Error(response.error.data);
      }
    } catch (error) {
      message.error(`Create new game failed: ${error.message}`);
      console.log("createNewGame error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrentGame();
    fetchCharacters();
    fetchNextGame();
  }, []);

  const status = currentGame?.games?.status;

  const nextGameExist = nextGameData ? true : false;

  const listCharacter = characters?.rows || [];

  const listAvailable = listCharacter.filter((item: any) => {
    return item.id !== firstCharacterId && item.id !== secondCharacterId && item.id !== thirdCharacterId && item.id !== fourthCharacterId;
  });

  return (
    <div className="col-span-2">
      <Card title="Create game">
        {status === "starting" || nextGameExist ? (
          <Alert message="There is a game starting or pending" type="warning" showIcon className="mb-4" />
        ) : (
          <Form
            form={form}
            initialValues={{
              firstCharacterRate: 1,
              secondCharacterRate: 1,
              thirdCharacterRate: 1,
              fourthCharacterRate: 1,
            }}
            onFinish={onFinish}
            validateMessages={validateFormMessages}
            layout="vertical"
          >
            <Row gutter={32}>
              <Col span={16}>
                <Form.Item name={"gameType"} label="Game type" rules={[{ required: true }]}>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setBetType(value);
                    }}
                  >
                    {BET_TYPE.map((item: any, index: any) => (
                      <Select.Option key={index} style={{ width: "100%" }} value={item.value}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col span={16}>
                <Form.Item name={"firstCharacterId"} label="First Character ID" rules={[{ required: true }]}>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setFirstCharacterId(value);
                    }}
                  >
                    {listAvailable.map((item: any, index: any) => (
                      <Select.Option key={index} style={{ width: "100%" }} value={item.id}>
                        <OptionItemChar key={item.id} item={item} />
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                {betType === "against_system" && (
                  <Form.Item label="Rate" name="firstCharacterRate" rules={[{ required: true }]}>
                    <InputNumber controls={false} min={0.1} max={10} style={{ width: "100%" }} />
                  </Form.Item>
                )}
              </Col>
            </Row>

            <Row gutter={32}>
              <Col span={16}>
                <Form.Item name={"secondCharacterId"} label="Second Character ID" rules={[{ required: true }]}>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setSecondCharacterId(value);
                    }}
                  >
                    {listAvailable.map((item: any, index: any) => (
                      <Select.Option key={index} style={{ width: "100%" }} value={item.id}>
                        <OptionItemChar key={item.id} item={item} />
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                {betType === "against_system" && (
                  <Form.Item label="Rate" name="secondCharacterRate" rules={[{ required: true }]}>
                    <InputNumber controls={false} min={0.1} max={10} style={{ width: "100%" }} />
                  </Form.Item>
                )}
              </Col>
            </Row>

            <Row gutter={32}>
              <Col span={16}>
                <Form.Item name={"thirdCharacterId"} label="Third Character ID" rules={[{ required: true }]}>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setThirdCharacterId(value);
                    }}
                  >
                    {listAvailable.map((item: any, index: any) => (
                      <Select.Option key={index} style={{ width: "100%" }} value={item.id}>
                        <OptionItemChar key={item.id} item={item} />
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                {betType === "against_system" && (
                  <Form.Item label="Rate" name="thirdCharacterRate" rules={[{ required: true }]}>
                    <InputNumber controls={false} min={0.1} max={10} style={{ width: "100%" }} />
                  </Form.Item>
                )}
              </Col>
            </Row>

            <Row gutter={32}>
              <Col span={16}>
                <Form.Item name={"fourthCharacterId"} label="Fourth Character ID" rules={[{ required: true }]}>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setFourthCharacterId(value);
                    }}
                  >
                    {listAvailable.map((item: any, index: any) => (
                      <Select.Option key={index} style={{ width: "100%" }} value={item.id}>
                        <OptionItemChar key={item.id} item={item} />
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                {betType === "against_system" && (
                  <Form.Item label="Rate" name="fourthCharacterRate" rules={[{ required: true }]}>
                    <InputNumber controls={false} min={0.1} max={10} style={{ width: "100%" }} />
                  </Form.Item>
                )}
              </Col>
            </Row>

            <Form.Item name={"streamUrl"} label="Stream URL" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={"duration"} label="Duration" rules={[{ required: true }]}>
              <DatePicker.RangePicker
                className="w-full"
                format="MMM DD, YYYY - HH:mm:ss"
                showTime
                disabledDate={(currentDate) => currentDate && currentDate.endOf("day").valueOf() < Date.now()}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block className="mt-2" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
}

export function OptionItemChar({ item }: { item: any }) {
  return (
    <div className="flex items-center gap-2">
      <div>
        <Image src={item.image} width={40} height={40} alt="image" />
      </div>
      <div>
        <div>{item.former}</div>
        <div className="text-sm font-normal text-zinc-400">{item.name}</div>
      </div>
    </div>
  );
}
