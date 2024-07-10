import { GetHistoryResponse, Transaction, getHistory } from "@/common/api/profile";
import { useAppSelector } from "@/common/redux/hooks";
import types from "@/common/redux/types";
import { selectValue } from "@/common/redux/utils";
import { ResponseStatus } from "@/common/types";
import { handleApi } from "@/common/utils";
import { Table } from "antd";

import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

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
      return <div className="break-all">{value}</div>;
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (value, item) => {
      return <div>{!item.txHash ? "Processing" : "Completed"}</div>;
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

const ITEM_PER_PAGE = 10;

const DepositHistory: React.FC = () => {
  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [itemsPerPage] = useState(ITEM_PER_PAGE);
  const [depositList, setDepositList] = useState([]);

  const fetchUserDepositHistory = async (userId: number, page = 1) => {
    try {
      const { data: res } = await handleApi<GetHistoryResponse<Transaction[]>>(getHistory(userId, itemsPerPage, page, "deposit"), false);
      if (res.data.code === ResponseStatus.OK) {
        setDepositList(res?.data?.data?.transactions);
        setTotal(res?.data?.data?.total || 0);
      }
    } catch (error) {
      console.log("fetchUserDepositHistory error", error);
    }
  };

  useEffect(() => {
    if (userInfo?.id) {
      fetchUserDepositHistory(userInfo?.id);
    }
  }, [userInfo?.id]);

  const handlePageChange = ({ current }: any) => {
    setCurrentPage(current);
    fetchUserDepositHistory(userInfo?.id, current);
  };

  return (
    <div className="bg-black border border-white rounded-[7px] divide-y">
      <div className="title text-[#47DEFF] text-[22px] font-normal py-3 text-center">Deposit History</div>
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
        dataSource={depositList}
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default DepositHistory;
