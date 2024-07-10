import { Table } from "antd";

import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { getHistory, Transaction, GetHistoryResponse } from "@/common/api/profile";
import { useAppSelector } from "@/common/redux/hooks";
import { selectValue } from "@/common/redux/utils";
import types from "@/common/redux/types";
import { handleApi } from "@/common/utils";
import { ResponseStatus } from "@/common/types";
import dayjs from "dayjs";

const columns: ColumnsType<Transaction> = [
  {
    title: "Payout #",
    dataIndex: "id",
    key: "payout",
  },
  // {
  //   title: "Race #",
  //   dataIndex: "message",
  //   key: "race",
  //   render: (value) => value?.split("=")[1],
  // },
  {
    title: "Amount",
    dataIndex: "value",
    key: "amount",
  },
  // {
  //   title: "Fee",
  //   dataIndex: "fee",
  //   key: "fee",
  // },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (value, item) => {
      // return <div>{!item.txHash ? "Processing" : "Completed"}</div>;
      return <div>{"Completed"}</div>;

    },
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "date",
    render: (value) => {
      return dayjs(value).format("MMM DD, YYYY - HH:mm:ss");
    },
  },
];

const ITEM_PER_PAGE = 10;

const RecentPayout: React.FC = () => {
  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [itemsPerPage] = useState(ITEM_PER_PAGE);
  const [rewardList, setRewardList] = useState<Transaction[]>([]);

  const fetchUserRewardHistory = async (userId: number, page = 1) => {
    try {
      const { data: res } = await handleApi<GetHistoryResponse<Transaction[]>>(getHistory(userId, itemsPerPage, page, "reward", true), false);
      if (res.data.code === ResponseStatus.OK) {
        setRewardList(res?.data?.data?.transactions);
        setTotal(res?.data?.data?.total || 0);
      }
    } catch (error) {
      console.log("fetchUserWithdrawHistory error", error);
    }
  };

  useEffect(() => {
    if (userInfo?.id) {
      fetchUserRewardHistory(userInfo?.id);
    }
  }, [userInfo?.id]);

  const handlePageChange = ({ current }: any) => {
    setCurrentPage(current);
    fetchUserRewardHistory(userInfo?.id, current);
  };

  return (
    <div className="bg-black border border-white rounded-[7px] divide-y">
      <div className="title text-[#47DEFF] text-[22px] font-normal py-3 text-center">RECENT PAYOUTS</div>
      <Table
        className="overflow-auto"
        pagination={{
          position: ["bottomCenter"],
          current: currentPage,
          onChange: handlePageChange,
          showSizeChanger: false,
          total: total,
        }}
        columns={columns}
        dataSource={rewardList}
      />
    </div>
  );
};

export default RecentPayout;
