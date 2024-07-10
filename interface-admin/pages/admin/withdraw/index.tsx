import AppLayout from "@/modules/App/Layout";
import { ReactElement } from "react";
import AdminWithdraw from "@/modules/Admin/Withdraw";

const AdminWithdrawPage = () => {
  return <AdminWithdraw />;
};

AdminWithdrawPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default AdminWithdrawPage;
