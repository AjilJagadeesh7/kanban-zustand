import { useState } from "react";
import Kanban from "../kanban-board/kanban";
import SideBarDrawer from "./sideBarDrawer";
import { useBoardAddModalStore } from "../../store/boardModalStore";
import BoardAddModal from "./boardAddModal";
import { useBoardStore } from "../../store/boardStore";
import { shallow } from "zustand/shallow";

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
    <div className="w-full h-full flex">
      {selectedBoard ? (
        <Kanban selectedBoard={selectedBoard} showDrawer={showDrawer} />
      ) : (
        <div className="dark:text-white px-10 text-primaryDark w-full flex justify-center flex-col text-center">
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
