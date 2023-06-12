import { useState } from "react";
import Kanban from "../kanban-board/kanban";
import SideBarDrawer from "./sideBarDrawer";
import { useBoardAddModalStore } from "../../store/boardModalStore";
import BoardAddModal from "./boardAddModal";
import { useBoardStore } from "../../store/boardStore";
import { shallow } from "zustand/shallow";
import { MenuOutlined } from "@ant-design/icons";

const Home = () => {
  const toggleBoardAddModal = useBoardAddModalStore(
    (store) => store.toggleModal
  );

  const [open, setOpen] = useState<boolean>(false);
  const selectedBoard = useBoardStore((store) => store.selectedBoard, shallow);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleAddBoard = async () => {
    setOpen(false);
    toggleBoardAddModal();
  };

  const fillerText =
    "No boards selected. Enhance your productivity by selecting or creating a board.";

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden overflow-y-auto custom-scroll">
      <div className=" h-10 p-6 w-full flex items-center justify-between bg-teritiaryLight dark:bg-teritiaryDark">
        <MenuOutlined
          className="text-md p-3 text-secondaryDark dark:text-white hover:scale-105 cursor-pointer bg-secondaryLight bg-opacity-70 dark:bg-black 
          dark:bg-opacity-25 rounded-full"
          onClick={showDrawer}
        />
        <div className="text-xl font-semibold text-white select-none">
          {selectedBoard?.title?.toUpperCase() || ""}
        </div>
      </div>
      {selectedBoard ? (
        <Kanban selectedBoard={selectedBoard} showDrawer={showDrawer} />
      ) : (
        <div className="dark:text-white px-10 bg-primaryLight dark:bg-primaryDark text-primaryDark w-full flex justify-center items-center h-full flex-col text-center">
          <p className="text-lg font-semibold">{fillerText}</p>
          <p className="text-sm mt-2">
            Get started on your tasks and stay organized!
          </p>
        </div>
      )}
      <SideBarDrawer
        handleAddBoard={handleAddBoard}
        onClose={onClose}
        open={open}
      />
      <BoardAddModal />
    </div>
  );
};

export default Home;
