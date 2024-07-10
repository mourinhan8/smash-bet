import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { getBetHistory } from "@/common/api/user";
import { Transaction } from "@/common/api/profile";

import type { ColumnsType } from "antd/es/table";
import { handleApi } from "@/common/utils";
import { selectValue } from "@/common/redux/utils";
import types from "@/common/redux/types";
import { useAppSelector } from "@/common/redux/hooks";
import { ResponseStatus } from "@/common/types";
import dayjs from "dayjs";

const columns: ColumnsType<Transaction> = [
  {
    title: "Race #",
    dataIndex: "gameId",
    key: "race",
  },
  {
    title: "Token ID",
    dataIndex: "tokenId",
    key: "tokenId",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "date",
    render: (value) => {
      return dayjs(value).format("MMM DD, YYYY - HH:mm:ss");
    },
  },
  {
    title: "$",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const ITEM_PER_PAGE = 10;

const BetsHistory: React.FC = () => {
  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [itemsPerPage] = useState(ITEM_PER_PAGE);
  const [betList, setBetList] = useState<Transaction[]>([]);

  const fetchUserBetHistory = async (userId: number, page = 1) => {
    try {
      const { data: res } = await handleApi<any>(getBetHistory(userId, page, itemsPerPage), false);
      if (res.data.code === ResponseStatus.OK) {
        setBetList(res?.data?.data?.bets);
        setTotal(res?.data?.data?.total || 0);
      }
    } catch (error) {
      console.log("fetchUserBetHistory error", error);
    }
  };

  useEffect(() => {
    if (userInfo?.id) {
      fetchUserBetHistory(userInfo?.id);
    }
  }, [userInfo?.id]);

  const handlePageChange = ({ current }: any) => {
    setCurrentPage(current);
    fetchUserBetHistory(userInfo?.id, current);
  };

  return (
    <div className="bg-black border border-white rounded-[7px] divide-y">
      <div className="title text-[#47DEFF] text-[22px] font-normal py-3 text-center">Bets History</div>
      <Table
        pagination={{
          position: ["bottomCenter"],
          current: currentPage,
          onChange: handlePageChange,
          showSizeChanger: false,
          total: total,
        }}
        rowKey="id"
        columns={columns}
        dataSource={betList}
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default BetsHistory;
