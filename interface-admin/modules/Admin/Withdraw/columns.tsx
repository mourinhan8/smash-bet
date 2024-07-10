import { Button, Popconfirm, Space, Tag } from "antd";

import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

export interface DataType {
  id: string;
  userId: number;
  tokenId: number;
  amount: number;
  fee: number;
  status: string;
  botExecuteStatus: number;
  txHash: number;
  createdAt: number;
  executedAt: number;
  resolvedAt: number;
  finishedAt: number;
}

const convertDate = (timestamp: any) => {
  if (!timestamp) return "";
  return dayjs(new Date(timestamp)).format("hh:mm A, DD/MM/YYYY");
};

export const useColumns = (props: any): ColumnsType<DataType> => {
  const { handleResolveWithdraw, loadingButton } = props;
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      width: 100,
    },
    {
      title: "User Wallet",
      dataIndex: "userWallet",
      key: "userWallet",
      width: 400,
    },
    {
      title: "Token ID",
      dataIndex: "tokenId",
      key: "tokenId",
      width: 100,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 100,
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "Bot Execute Status",
      dataIndex: "botExecuteStatus",
      key: "botExecuteStatus",
      width: 150,
    },
    {
      title: "Bot Comment",
      dataIndex: "botComment",
      key: "botComment",
      width: 150,
    },
    {
      title: "TX Hash",
      dataIndex: "txHash",
      key: "txHash",
      width: 200,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      render: (value) => (value ? convertDate(value) : ""),
    },
    {
      title: "Resolved At",
      dataIndex: "resolvedAt",
      key: "resolvedAt",
      width: 200,
      render: (value) => (value ? convertDate(value) : ""),
    },
    {
      title: "Executed At",
      dataIndex: "executedAt",
      key: "executedAt",
      width: 200,
      render: (value) => (value ? convertDate(value) : ""),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right" as const,
      width: 220,
      render: (_, { status, id }) => (
        <>
          <Space size="middle">
            {status === "pending" && (
              <>
                <Popconfirm
                  title="Confirm"
                  description="Are you sure to approve this transaction?"
                  onConfirm={(e) => handleResolveWithdraw(e, id, "approved")}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ loading: loadingButton }}
                >
                  <Button size="middle" type="primary" loading={loadingButton}>
                    Approve
                  </Button>
                </Popconfirm>
                <Popconfirm
                  title="Confirm"
                  description="Are you sure to reject this transaction?"
                  onConfirm={(e) => handleResolveWithdraw(e, id, "rejected")}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ loading: loadingButton }}
                >
                  <Button size="middle" type="primary" loading={loadingButton} danger>
                    Reject
                  </Button>
                </Popconfirm>
              </>
            )}
          </Space>
        </>
      ),
    },
  ];
};
