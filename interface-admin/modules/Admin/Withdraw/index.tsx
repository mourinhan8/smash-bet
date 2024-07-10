import { Card, Divider, Input, Pagination, Select, Table, message } from "antd";
import { useColumns } from "./columns";
import { getListWithdraw, resolveWithdraw } from "@/common/api/admin";
import { useEffect, useState } from "react";
import { handleApi } from "@/common/utils";
import { FilterOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/common/redux/hooks";
import types from "@/common/redux/types";
import { fetchData } from "@/common/redux/actions/fetchAction";
import { selectValue } from "@/common/redux/utils";

const { Search } = Input;

const headerTable = [
  "ID",
  "User ID",
  "User wallet",
  "Token ID",
  "Amount",
  "Fee",
  "Status",
  "Bot Execute Status",
  "Bot Comment",
  "TX Hash",
  "Created At",
  "Resolved At",
  "Executed At",
  "Action",
];

export const PAGE_SIZE = 10;

const AdminWithdrawPage = () => {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loadingButton, setLoadingButton] = useState(false);
  const dispatch = useAppDispatch();

  const { data: listWithdraw, loading } = useAppSelector(selectValue(types.listWithdraw));

  const handleChangeStatus = (value: string) => {
    setStatus(value);
  };

  const handleResolveWithdraw = async (e: React.MouseEvent<HTMLElement>, id: any, result: string) => {
    e.preventDefault();
    setLoadingButton(true);
    try {
      const response = await handleApi(resolveWithdraw(id, result));
      const { data } = response;
      if (data) {
        message.success(`${result.toUpperCase()} successfully`);
        dispatch(fetchData(types.listWithdraw, getListWithdraw(page, PAGE_SIZE, status, search)));
      } else {
        message.error(response.error.message);
        setLoadingButton(false);
      }
    } catch (error) {
      console.log("Confirm error: ", error);
    }
    setLoadingButton(false);
  };

  const onSearch = () => {
    dispatch(fetchData(types.listWithdraw, getListWithdraw(page, PAGE_SIZE, status, search)));
  };

  const columns = useColumns({ handleResolveWithdraw, loadingButton });
  useEffect(() => {
    //call data
    if (search === "") {
      dispatch(fetchData(types.listWithdraw, getListWithdraw(page, PAGE_SIZE, status, search)));
    }
    return () => {
      console.log("unmounted");
    };
  }, [status, page, search]);
  const handleChangePage = async (newPage: number, newLimit: number) => {
    setPage(newPage);
    dispatch(fetchData(types.listWithdraw, getListWithdraw(newPage, PAGE_SIZE, status, search)));
  };
  return (
    <div className="w-full">
      <Card title="Withdraw" className="overflow-hidden rounded-none">
        <div className="grid grid-flow-col mb-2">
          <div>
            <Search
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by user's wallet address"
              enterButton
              onSearch={onSearch}
            />
          </div>
        </div>
        <Divider />
        <div className="flex justify-between mb-4">
          <div className="filter">
            <p className="text-xl font-bold">
              Filter <FilterOutlined />
            </p>
            <div>
              <span className="mr-2">Status:</span>
              <Select value={status} className="min-w-[150px]" onChange={handleChangeStatus}>
                <Select.Option value="">All</Select.Option>
                <Select.Option value="approved">Approved</Select.Option>
                <Select.Option value="rejected">Rejected</Select.Option>
                <Select.Option value="pending">Pending</Select.Option>
              </Select>
            </div>
          </div>
        </div>
        <div className="pr-2 mb-2">
          <Table
            bordered
            loading={loading}
            columns={columns}
            dataSource={listWithdraw?.requests || []}
            pagination={false}
            scroll={{ x: 1500 }}
          />
        </div>
        <Pagination
          className="text-center"
          total={listWithdraw?.total}
          showLessItems={true}
          current={page}
          showSizeChanger={false}
          pageSize={PAGE_SIZE}
          pageSizeOptions={[10, 20, 30]}
          onChange={handleChangePage}
        />
      </Card>
    </div>
  );
};
export default AdminWithdrawPage;
