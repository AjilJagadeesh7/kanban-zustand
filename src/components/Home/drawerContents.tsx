import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useBoardStore } from "../../store/boardStore";
import { shallow } from "zustand/shallow";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import CustomSpinner from "../Reusable/customSpinner";

const DrawerContents = ({
  handleAddBoard,
}: {
  handleAddBoard: () => Promise<void>;
}) => {
  const fetchBoards = useBoardStore((store) => store.fetchBoards, shallow);
  const boardsList = useBoardStore((store) => store.kanbanBoards, shallow);
  const boardsLoading = useBoardStore((store) => store.isLoading);
  const selectedBoard = useBoardStore((store) => store.selectedBoard);
  const setSelectedBoards = useBoardStore((store) => store.setSelectedBoards);
  const deleteBoard = useBoardStore((store) => store.deleteBoard);
  const user = useAuthStore((store) => store.user);

  useEffect(() => {
    fetchBoards();
  }, [boardsList.length]);

  const boardListContent = () => {
    if (boardsLoading) {
      return (
        <div className="flex justify-center items-center w-full h-[80%]">
          <CustomSpinner />
        </div>
      );
    }
    return (
      <>
        {boardsList.length > 0 ? (
          boardsList.map((boards, key) => {
            return (
              <div
                className={`hover:dark:bg-teritiaryDark hover:bg-teritiaryLight my-2
                px-2 rounded-md flex ${
                  selectedBoard.id === boards.id
                    ? "dark:bg-teritiaryDark bg-teritiaryLight hover:bg-opacity-100"
                    : " hover:bg-opacity-40"
                }
                 justify-between items-center dark:text-white
                `}
                key={key}
              >
                <div
                  className="text-xs  font-semibold w-full cursor-pointer py-3"
                  onClick={() => {
                    setSelectedBoards(boards);
                  }}
                >
                  {boards?.title.toUpperCase()}
                </div>
                {boards?.createdBy === user?.uid ? (
                  <DeleteFilled
                    className="text-sm mb-1 hover:scale-105 
                    hover:text-red-500 active:text-red-800"
                    onClick={() => {
                      deleteBoard(boards.id);
                    }}
                  />
                ) : null}
              </div>
            );
          })
        ) : (
          <>Add more boards</>
        )}
      </>
    );
  };
  return (
    <div
      className="py-3 flex h-full w-full flex-col justify-between 
      items-center dark:bg-secondaryDark bg-secondaryLight rounded-md"
    >
      <div className="w-full h-full">
        <div
          className=" dark:text-white text-primaryDark mx-[5%] 
            p-2 rounded-md h-full overflow-y-auto custom-scroll"
        >
          <div
            className="text-center dark:bg-secondaryDark bg-secondaryLight my-2 px-2 py-1 border-dashed 
            border-white  border-[0.12rem] rounded-md text-xs 
            cursor-pointer hover:dark:bg-teritiaryDark hover:bg-teritiaryLight hover:bg-opacity-25 
            hover:dark:bg-opacity-25"
            onClick={handleAddBoard}
          >
            <PlusOutlined className="text-lg text-primaryLight" />
          </div>
          {boardListContent()}
        </div>
      </div>
    </div>
  );
};

export default DrawerContents;
