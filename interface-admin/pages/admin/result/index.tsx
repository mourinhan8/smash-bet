import AppLayout from "@/modules/App/Layout";
import { ReactElement } from "react";
import AdminResult from "@/modules/Admin/Result";
const AdminResultPage = () => {
  return <AdminResult />;
};

AdminResultPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default AdminResultPage;
