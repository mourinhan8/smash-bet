import { getChatMessages } from "@/common/api/chat";
import { useAppSelector } from "@/common/redux/hooks";
import types from "@/common/redux/types";
import { selectValue } from "@/common/redux/utils";
import { handleApi } from "@/common/utils";
import { APP_TOKEN_KEY } from "@/common/utils/constants";
import { Button } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAccount } from "wagmi";
import { compactString } from "@/common/utils";

interface Message {
  text: string;
  walletAddress: string;
  sender?: string;
  isChatOwner: boolean;
  createdAt: number;
}

const convertDate = (timestamp: any) => {
  if (!timestamp) return "";
  return dayjs(new Date(timestamp)).format("hh:mm DD MMM, YYYY");
};

const LIMIT_MESSAGE = 10;

const ChatBox = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [totalPageAvailable, setTotalPageAvailable] = useState(0);
  const [avaiToChat, setAvaiToChat] = useState(false);
  const [onlineUser, setOnlineUser] = useState(0);

  const { address } = useAccount();

  const [currentPage, setCurrentPage] = useState(1);

  const socketRef = useRef<any>();

  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));

  const fetchInitialMessages = async () => {
    const response = await handleApi(getChatMessages(1, LIMIT_MESSAGE));
    const { data } = response;
    if (data) {
      setTotalPageAvailable(data.data.totalPages);
      const newMessages = data.data.messages.map((item: any) => {
        return {
          text: item.text,
          sender: item.sender,
          isChatOwner: item.walletAddress.toLowerCase() !== address?.toLowerCase() ? false : true,
          createdAt: item.createdAt,
          walletAddress: item.walletAddress,
        };
      });

      setChatMessages(newMessages);
    }
  };

  const fetchMoreMessage = async (page: number, limit: number = LIMIT_MESSAGE) => {
    if (totalPageAvailable > currentPage) {
      const response = await handleApi(getChatMessages(page + 1, limit));
      const { data } = response;
      if (data) {
        const newMessages = data.data.messages.map((item: any) => {
          return {
            text: item.text,
            sender: item.sender,
            isChatOwner: item.walletAddress.toLowerCase() !== address?.toLowerCase() ? false : true,
            createdAt: item.createdAt,
            walletAddress: item.walletAddress,
          };
        });
        setCurrentPage((page) => page + 1);
        setChatMessages((prevMessages) => [...prevMessages, ...newMessages]);
      }
    }
  };

  const resetChat = () => {
    setChatMessages([]);
  };

  const reverseMessages = useMemo(() => chatMessages.sort((a, b) => a.createdAt - b.createdAt), [chatMessages]);

  useEffect(() => {
    const token = localStorage.getItem(APP_TOKEN_KEY) || "";

    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      path: "/socket.io",
      auth: {
        token,
      },
      transports: ["websocket"],
      secure: true,
      // transportOptions: {
      //   polling: {
      //     extraHeaders: {
      //       auth: `${token}`,
      //     },
      //   },
      // },
    });

    socketRef.current.on("avaiToChat", (dataGot: any) => {
      console.log("Message from server:", JSON.stringify(dataGot));
      setAvaiToChat(dataGot.avaiToChat);
    });

    socketRef.current.on("Receive-msg", (dataGot: any) => {
      const newMessageData: Message = {
        text: dataGot.text,
        sender: dataGot.senderId,
        createdAt: dataGot.createdAt,
        isChatOwner: false,
        walletAddress: dataGot.walletAddress,
      };
      setChatMessages((oldMsgs) => [...oldMsgs, newMessageData]);
    });

    socketRef.current.on("userCnt", (dataGot: any) => {
      console.log(dataGot);
      setOnlineUser(dataGot.userCount);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    resetChat();
    fetchInitialMessages();
  }, [address]);

  const sendANewMessage = async () => {
    if (newMessage !== "") {
      const messagePayload = {
        text: newMessage,
        walletAddress: address,
      };
      const newMessageData: Message = {
        text: newMessage,
        isChatOwner: true,
        sender: userInfo?.id,
        createdAt: +dayjs(),
        walletAddress: address,
      };
      socketRef.current.emit("MessageSent", messagePayload);
      setChatMessages((oldMsgs) => [...oldMsgs, newMessageData]);
      setNewMessage("");
    }
  };

  return (
    <div
      className="md:w-[18vw] mx-auto w-[85vw] chat relative z-0 md:-left-[60px] mt-4 text-white bg-black bg-opacity-60 rounded-md"
      style={{ height: "100%" }}
    >
      <div className="chat-box overflow-y-scroll grid content-start h-full gap-y-3 p-3 md:max-h-[70vh] border-white border-[1px] rounded-[5px]">
        {reverseMessages.map((item: Message, index: number) => {
          return (
            <Message
              key={index}
              message={item.text}
              createdAt={item.createdAt}
              userId={item.sender}
              isChatOwner={item.isChatOwner}
              walletAddress={item.walletAddress}
            />
          );
        })}
      </div>
      <div className="input mx-2">
        {avaiToChat ? (
          <input
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendANewMessage();
              }
            }}
            placeholder="Your message here"
            className="bg-inherit border-[1px] border-white rounded-[5px] w-full mt-5 px-2 py-1"
            value={newMessage}
          />
        ) : (
          <div className="text-center">You need login or re-login to chat</div>
        )}
      </div>
      <div className="flex justify-between m-3">
        <div className="number-online">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#47DEFF]"></span>
            </span>
            <p>{onlineUser} Online</p>
          </div>
        </div>
        {avaiToChat && (
          <Button className="send-button  border-0 rounded-[2px] text-black bg-[#47DEFF] font-semibold px-4" onClick={sendANewMessage}>
            SEND
          </Button>
        )}
      </div>
    </div>
  );
};

const Message = ({ message, createdAt, userId, isChatOwner, walletAddress }: any) => {
  return (
    <div className="message-box h-fit border-white border-[1px] rounded-[2px] p-2">
      <div className="header-message flex justify-between text-gray-400 font-normal text-xs">
        <div className="address">
          {compactString(walletAddress, 8, 5)} {isChatOwner ? "(me)" : ""}
        </div>
        <div className="time">{convertDate(createdAt)}</div>
      </div>
      <div className="message">{message}</div>
    </div>
  );
};

export default ChatBox;
