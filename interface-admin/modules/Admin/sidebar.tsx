import { BitcoinConvert, LogoutCurve, ReceiptSquare, Wallet1 } from "iconsax-react";
import { Divider, Layout, Menu } from "antd";
import React from "react";

import Link from "next/link";
import { useAuth } from "@/common/hooks/useAuth";

export const MenuData = [
  // {
  //   name: "Games",
  //   link: "/admin/game-create",
  //   icon: <Wallet1 size="20" />,
  //   key: "game-create",
  // },
  // {
  //   name: "Result",
  //   link: "/admin/result",
  //   icon: <ReceiptSquare size="20" />,
  //   key: "result",
  // },
  {
    name: "Transaction",
    link: "/admin/transaction",
    icon: <BitcoinConvert size="20" />,
    key: "transaction",
  },
  // {
  //   name: "Pay reward",
  //   link: "/admin/pay-reward",
  //   icon: <Image src="/svg/sidebar/founder.svg" alt="" width={28} height={28} />,
  //   key: "pay-reward",
  // },
];

const AdminSidebar = (props?: any) => {
  const { logout } = useAuth();
  return (
    <div className="flex h-full pt-4 mx-auto bg-white justify-items-center">
      <Layout.Sider width={200} style={{ background: "#ffffff" }}>
        <Menu defaultSelectedKeys={[window.location.href.split(`/`, 5)[4]]}>
          {MenuData.map((item) => (
            <Menu.Item key={item.key}>
              <Link href={item.link}>
                <div className="flex items-center">
                  {item.icon}
                  <div className="ml-2">{item.name}</div>
                </div>
              </Link>
            </Menu.Item>
          ))}
          <Divider />
          <Menu.Item style={{ marginTop: "auto" }} onClick={logout} key="6" className="relative mt-auto">
            <div className="flex items-center">
              <LogoutCurve size="20" color="#2B1C50" />
              <span className="ml-2 text-[#333a6d]">Log out</span>
            </div>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    </div>
  );
};

export default AdminSidebar;
