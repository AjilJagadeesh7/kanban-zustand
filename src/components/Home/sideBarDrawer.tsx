import { Avatar, Drawer, Tooltip } from "antd";
import DrawerContents from "./drawerContents";
import { User, useAuthStore } from "../../store/authStore";
import {
  BulbFilled,
  CloseOutlined,
  EditFilled,
  UnlockFilled,
} from "@ant-design/icons";
import { useThemeStore } from "../../store/themeStore";

const SideBarDrawer = ({
  onClose,
  open,
  handleAddBoard,
}: {
  onClose: () => void;
  open: boolean;
  handleAddBoard: () => Promise<void>;
}) => {
  const theme = useThemeStore((store) => store);
  const { display } = useAuthStore((store) => store.user as User);
  const signOut = useAuthStore((store) => store.signOut);

  const handleEdit = () => {
    onClose();
  };

  const handleSignOut = () => {
    onClose();
    signOut();
  };
  return (
    <Drawer
      title={
        <div
          className="dark:text-white flex flex-col justify-center items-center bg-secondaryDark
        p-2 rounded-md"
        >
          <div
            className="absolute top-4 left-7"
            onClick={() => theme.toggleDarkMode()}
          >
            <Tooltip title={theme.darkMode ? "light" : "dark"}>
              <BulbFilled
                className={`${
                  !theme.darkMode ? "text-amber-500" : "text-sky-200"
                } cursor-pointer`}
              />
            </Tooltip>
          </div>
          <Avatar size={70} />
          <div className="mt-2 mb-3">{display}</div>
          <div className="flex text-xs gap-2">
            <div
              className="flex gap-1 items-center justify-center py-1 px-3
            bg-sky-800 rounded-sm shadow-md hover:bg-sky-700 active:bg-sky-900
            cursor-pointer"
              onClick={handleEdit}
            >
              <EditFilled /> <div>Edit</div>
            </div>
            <div
              className="flex gap-1 items-center justify-center py-1 px-3
            bg-red-800 rounded-sm shadow-md hover:bg-red-700 active:bg-red-900
            cursor-pointer"
              onClick={handleSignOut}
            >
              <UnlockFilled />
              <div>Signout</div>
            </div>
          </div>
          <CloseOutlined
            className="text-red-white hover:scale-105 active:text-red-900 p-1 text-md bg-slate-200 
            bg-opacity-10 rounded-md md:hidden absolute top-5 right-8"
            onClick={onClose}
          />
        </div>
      }
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      style={{
        backgroundColor: "#111827",
      }}
    >
      <DrawerContents handleAddBoard={handleAddBoard} />
    </Drawer>
  );
};

export default SideBarDrawer;
