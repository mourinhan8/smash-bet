import { useAuth } from "@/common/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { APP_TOKEN_KEY, APP_VERIFY_KEY } from "@/common/utils/constants";
import AdminSidebar from "@/modules/Admin/sidebar";
import AppHeader from "../Header";
import { Layout } from "antd";

interface AppLayoutProps {
  children: React.ReactNode;
}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isAuthenticated, isInitial } = useAuth();
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem(APP_VERIFY_KEY);
    // if (isInitial && !isAuthenticated) {
    //   localStorage.removeItem(APP_TOKEN_KEY);
    //   router.push("/authen/login");
    // }
  }, [router, isInitial, isAuthenticated]);

  return (
    <Layout className="h-full">
      <AppHeader />
      <Layout className="h-full app-container">
        <AdminSidebar />
        <Layout className="h-full p-8 overflow-auto">
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
