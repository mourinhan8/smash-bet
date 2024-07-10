import { ConfigProvider, Layout, Spin } from "antd";
import React, { useEffect, useState } from "react";

import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}
const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Spin />;

  return (
    <ConfigProvider
      theme={{
        token: {
          // fontFamily: `"Sora Medium", sans-serif`,
          colorText: "#FFFFFF",
          colorPrimary: "#0979A6",
        },
        // components: {
        //   Button: {
        //     colorPrimary: "#FFFFFF",
        //   },
        // },
      }}
    >
      <div className="layout-container">
        <div className="flex min-h-screen">
          <Layout className="block w-full ">
            <Layout>
              <Layout>{children}</Layout>
            </Layout>
          </Layout>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AppLayout;
