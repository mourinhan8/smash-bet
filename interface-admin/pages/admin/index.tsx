import { ReactElement, useEffect } from "react";

import AppLayout from "@/modules/App/Layout";
import { useRouter } from "next/router";
import { Spin } from "antd";

const AdminPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/result");
  }, []);
  return <Spin />;
};

AdminPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default AdminPage;
