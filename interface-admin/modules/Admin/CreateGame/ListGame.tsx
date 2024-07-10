import { Card, Table } from "antd";
import { useGameColumns } from "./columns";
import { useEffect } from "react";
import { getListGames } from "@/common/api/admin";
import { useAppDispatch, useAppSelector } from "@/common/redux/hooks";
import { selectValue } from "@/common/redux/utils";
import types from "@/common/redux/types";
import { fetchData } from "@/common/redux/actions/fetchAction";

export const PAGE_SIZE = 10;

const ListGame = () => {
  const columns = useGameColumns();
  const { data: listGames, loading } = useAppSelector(selectValue(types.listGames));
  const dispatch = useAppDispatch();

  const handleChangePage = ({ current, pageSize, total }: any) => {
    dispatch(fetchData(types.listGames, getListGames(current, pageSize)));
  };

  useEffect(() => {
    dispatch(fetchData(types.listGames, getListGames(1, PAGE_SIZE)));
  }, [dispatch]);

  console.log("listGames", listGames);

  return (
    <Card title="List game" className="col-span-3">
      <Table
        dataSource={listGames?.games || []}
        columns={columns}
        scroll={{ x: 1500 }}
        bordered
        pagination={{
          total: listGames?.total || 0,
          pageSize: PAGE_SIZE,
          current: listGames?.currentPage || 1,
        }}
        loading={loading}
        onChange={handleChangePage}
      />
    </Card>
  );
};

export default ListGame;
