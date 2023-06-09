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
                className="dark:bg-teritiaryDark my-2 py-3 px-2 rounded-md
                cursor-pointer flex justify-between items-center"
                key={key}
              >
                <div
                  className="text-xs font-semibold"
                  onClick={() => {
                    setSelectedBoards(boards);
                  }}
                >
                  {boards?.title}
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
      items-center bg-secondaryDark rounded-md"
    >
      <div className="w-full h-full">
        <div
          className=" dark:text-white mx-[5%] 
            p-2 rounded-md h-full overflow-y-auto custom-scroll"
        >
          <div
            className="text-center dark:bg-secondaryDark my-2 px-2 py-1 border-dashed 
            dark:border-white border-primaryDark border-[0.12rem] rounded-md text-xs 
            cursor-pointer hover:dark:bg-teritiaryDark hover:dark:bg-opacity-25"
            onClick={handleAddBoard}
          >
            <PlusOutlined className="text-lg dark:text-primaryLight" />
          </div>
          {boardListContent()}
        </div>
      </div>
    </div>
  );
};

export default DrawerContents;
