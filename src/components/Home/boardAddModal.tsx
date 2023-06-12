import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { useBoardAddModalStore } from "../../store/boardModalStore";
import { useBoardStore } from "../../store/boardStore";
import { useAuthStore } from "../../store/authStore";

const BoardAddModal = () => {
  const board = useBoardAddModalStore((store) => store);
  const user = useAuthStore((store) => store.user);
  const addBoard = useBoardStore((store) => store.addBoard);
  const [boardTitle, setBoardTitle] = useState("");
  const [columnTitles, setColumnTitles] = useState([""]);

  const handleAddColumn = () => {
    setColumnTitles([...columnTitles, ""]);
  };

  const handleRemoveColumn = (index) => {
    if (columnTitles.length > 1) {
      const updatedColumnTitles = columnTitles.filter((_, i) => i !== index);
      setColumnTitles(updatedColumnTitles);
    }
  };

  const handleClose = () => {
    setBoardTitle("");
    setColumnTitles([""]);
    board.toggleModal();
  };

  const handleAddBoard = () => {
    if (boardTitle && columnTitles.length > 0) {
      addBoard({
        title: boardTitle,
        columns: columnTitles,
        createdBy: user?.uid || "",
      });
    }
    setBoardTitle("");
    setColumnTitles([""]);
  };

  return (
    <Modal
      closable={false}
      open={board.show}
      onCancel={handleClose}
      footer={null}
    >
      <div className="bg-primaryLight dark:bg-secondaryDark p-2 rounded-md flex flex-col gap-5">
        <div className="flex w-full px-3 justify-between">
          <div className="text-lg font-semibold dark:text-white self-center">
            New board details
          </div>
          <div>
            <CloseOutlined
              className="hover:scale-110 dark:text-primaryLight text-primaryDark 
              text-md"
              onClick={handleClose}
            />
          </div>
        </div>
        <div className="px-3 py-2 w-full ">
          <div className={`w-full ${columnTitles.length > 1 ? "pr-7" : ""} `}>
            <Input
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              placeholder="Board Title"
            />
          </div>
          {columnTitles.map((columnTitle, index) => (
            <div key={index} className="flex my-2 w-full">
              <Input
                className="w-full"
                value={columnTitle}
                onChange={(e) => {
                  const updatedColumnTitles = [...columnTitles];
                  updatedColumnTitles[index] = e.target.value;
                  setColumnTitles(updatedColumnTitles);
                }}
                placeholder={`Column Title ${index + 1}`}
              />
              {columnTitles.length > 1 && (
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveColumn(index)}
                />
              )}
            </div>
          ))}
          <div
            className={`border-dashed border-primaryDark dark:border-primaryLight border-[0.12rem] pb-1.5 rounded-full
             text-center cursor-pointer hover:bg-teritiaryLight hover:dark:bg-teritiaryDark hover:bg-opacity-25 ${
               columnTitles.length > 1 ? "mr-7" : ""
             }`}
            onClick={handleAddColumn}
          >
            <PlusOutlined className="dark:text-primaryLight text-primaryDark" />
          </div>

          <Button
            className="mt-5 border-none bg-indigo-800 hover:bg-indigo-700  dark:bg-blue-700 dark:hover:bg-blue-600
           text-white w-full"
            onClick={handleAddBoard}
          >
            Add Board
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BoardAddModal;
