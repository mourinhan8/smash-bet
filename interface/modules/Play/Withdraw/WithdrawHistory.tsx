import { Transaction } from "@/common/api/profile";
import { Table } from "antd";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "@/common/redux/hooks";
import types from "@/common/redux/types";
import { selectValue } from "@/common/redux/utils";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const columns: ColumnsType<Transaction> = [
  {
    title: "Deposit #",
    dataIndex: "id",
    key: "id",
    width: 100,
  },
  {
    title: "Amount USDT",
    dataIndex: "value",
    key: "value",
    width: 100,
  },
  {
    title: "TxId",
    dataIndex: "txHash",
    key: "txHash",
    width: 200,
    render: (value) => {
      return (
        <div className="break-all">
          <a href={`https://bscscan.com/tx/${value}`}>{value}</a>
        </div>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (value, item) => {
      // return <div>{!item.txHash ? "Processing" : "Completed"}</div>;
      return <div className="capitalize">{item.status}</div>;
    },
  },
  {
    title: "Time",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
    render: (value) => {
      return dayjs(value).format("MMM DD, YYYY - HH:mm:ss");
    },
  },
];

interface WithdrawHistoryProps {
  fetchUserWithdrawHistory: (userId: number, page?: number) => Promise<void>;
  handlePageChange: ({ current }: any) => void;
  withdrawList: any[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
}

const WithdrawHistory = ({
  fetchUserWithdrawHistory,
  handlePageChange,
  withdrawList,
  total,
  currentPage,
  itemsPerPage,
}: WithdrawHistoryProps) => {
  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));

  useEffect(() => {
    if (userInfo?.id) {
      fetchUserWithdrawHistory(userInfo?.id);
    }
  }, [userInfo?.id]);

  return (
    <div className="bg-black border border-white rounded-[7px] divide-y">
      <div className="title text-[#47DEFF] text-[22px] font-normal py-3 text-center">Withdraw History</div>
      <Table
        pagination={{
          position: ["bottomCenter"],
          current: currentPage,
          onChange: handlePageChange,
          showSizeChanger: false,
          total: total,
          pageSize: itemsPerPage,
        }}
        rowKey="id"
        columns={columns}
        dataSource={withdrawList}
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default WithdrawHistory;
