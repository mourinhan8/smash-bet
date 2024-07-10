import { Pagination, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { GetHistoryResponse, Transaction, getHistory, userHistory } from "@/common/api/profile";

import type { ColumnsType } from "antd/es/table";
import { getUserInfo } from "@/common/api/user";
import { handleApi } from "@/common/utils";
import { selectValue } from "@/common/redux/utils";
import types from "@/common/redux/types";
import { useAppSelector } from "@/common/redux/hooks";
import { ResponseStatus } from "@/common/types";

const columns: ColumnsType<userHistory> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Received Amount",
    dataIndex: "receivedAmount",
    key: "receivedAmount",
  },
  {
    title: "Race ID",
    dataIndex: "raceId",
    key: "raceId",
  },
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
  },
];

const ITEM_PER_PAGE = 10;

const ReferralHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [itemsPerPage] = useState(ITEM_PER_PAGE);
  const [refferalList, setRefferalList] = useState([]);

  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));

  const fetchUserReferralHistory = async (userId: number, page = 1) => {
    try {
      const { data: res } = await handleApi<GetHistoryResponse<Transaction[]>>(getHistory(userId, itemsPerPage, page, "referral"), false);
      if (res.data.code === ResponseStatus.OK) {
        setRefferalList(res?.data?.data?.transactions);
        setTotal(res?.data?.data?.total || 0);
      }
    } catch (error) {
      console.log("fetchUserReferralHistory error", error);
    }
  };

  useEffect(() => {
    if (userInfo?.id) {
      fetchUserReferralHistory(userInfo?.id);
    }
  }, [userInfo?.id]);

  const handlePageChange = ({ current }: any) => {
    setCurrentPage(current);
    fetchUserReferralHistory(userInfo?.id, current);
  };

  return (
    <div className="bg-black border border-white rounded-[7px] divide-y">
      <div className="title text-[#47DEFF] text-[22px] font-normal py-3 text-center">Referrals History</div>
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
        dataSource={refferalList}
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default ReferralHistory;
