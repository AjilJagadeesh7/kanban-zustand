import { Avatar, Button, Drawer, Space } from "antd";
import React from "react";
import DrawerContents from "./drawerContents";
import { User, useAuthStore } from "../../store/authStore";

const SideBarDrawer = ({
  onClose,
  open,
  handleAddBoard,
}: {
  onClose: () => void;
  open: boolean;
  handleAddBoard: () => Promise<void>;
}) => {
  const { display } = useAuthStore((store) => store.user as User);
  return (
    <Drawer
      title={
        <div className="dark:text-white flex gap-2 items-center">
          <Avatar size={40} />
          {display}
        </div>
      }
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button type="link" className="text-white" onClick={onClose}>
            Close
          </Button>
        </Space>
      }
      style={{
        backgroundColor: "#111827",
      }}
    >
      <DrawerContents handleAddBoard={handleAddBoard} />
    </Drawer>
  );
};

export default SideBarDrawer;
