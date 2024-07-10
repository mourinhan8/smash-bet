import AppLayout from "@/modules/App/Layout";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { ReactElement } from "react";

const Main = () => {
  return (
    <div className="min-h-[400px]">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  );
};

Main.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/admin",
      permanent: false,
    },
  };
}

export default Main;
