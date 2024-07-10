import AppLayout from "@/modules/App/Layout";
import { ReactElement } from "react";
import PayReward from "@/modules/Admin/PayReward";
const AdminPayRewardPage = () => {
  return <PayReward />;
};

AdminPayRewardPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default AdminPayRewardPage;
