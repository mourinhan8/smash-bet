import { Book, House2, Monitor, Share, Star } from "iconsax-react";
import { Menu } from "antd";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const Sidebar = (props: any) => {
  const router = useRouter();

  return (
    <Menu
      defaultSelectedKeys={[router.pathname]}
      className="sidebar title-main bottom-0 top-[56px] space-y-7 text-base mr-8 bg-transparent"
      style={{ width: 280, borderInlineEnd: 0 }}
    >
      <Menu.Item key="/">
        <div className="flex items-center space-x-5">
          <House2 size="32" />
          <Link href="/">Your Project</Link>
        </div>
      </Menu.Item>
      <Menu.Item key="/launchpad/create">
        <div className="flex items-center space-x-5">
          <Monitor size="32" />
          <Link href="/launchpad/create">Create Launchpad</Link>
        </div>
      </Menu.Item>
      <Menu.Item key="/launchpad/list">
        <div className="flex items-center space-x-5">
          <Share size="32" />
          <Link href="/launchpad/list">Launchpad List</Link>
        </div>
      </Menu.Item>
      <Menu.Item key="/proposal/create">
        <div className="flex items-center space-x-5">
          <Star size="32" />
          <Link href="/proposal/create">Create Proposal</Link>
        </div>
      </Menu.Item>
      <Menu.Item key="/proposal/list">
        <div className="flex items-center space-x-5">
          <Book size="32" />
          <Link href="/proposal/list">Proposal List</Link>
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
