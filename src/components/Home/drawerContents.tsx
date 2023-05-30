import { Button } from "antd";
import React, { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../../store/boardStore";
import { shallow } from "zustand/shallow";
import { PlusOutlined } from "@ant-design/icons";

const DrawerContents = ({
  handleAddBoard,
}: {
  handleAddBoard: () => Promise<void>;
}) => {
  const signOut = useAuthStore((store) => store.signOut);
  const navigate = useNavigate();
  const fetchBoards = useBoardStore((store) => store.fetchBoards, shallow);
  const boardsList = useBoardStore((store) => store.kanbanBoards, shallow);
  const boardsLoading = useBoardStore((store) => store.isLoading);

  useEffect(() => {
    fetchBoards();
  }, [boardsList.length]);

  const handleSignOut = async () => {
    try {
      signOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  if (boardsLoading) {
    return <>Loading...</>;
  }
  return (
    <div
      className="py-3 flex h-full w-full flex-col justify-between 
      items-center dark:bg-secondaryDark bg-secondaryLight"
    >
      <div className="w-full h-full">
        <div
          className="dark:bg-teritiaryDark dark:text-white mx-[5%] 
            p-2 rounded-md shadow-xl drop-shadow-xl h-[80%] overflow-y-auto custom-scroll"
        >
          <div
            className="text-center dark:bg-primaryDark my-2 px-2 py-1 border-dashed 
            dark:border-white border-primaryDark border rounded-md text-xs 
            cursor-pointer hover:scale-105"
            onClick={handleAddBoard}
          >
            <PlusOutlined className="text-lg dark:text-primaryLight" />
          </div>
          {boardsList.length > 0 ? (
            boardsList.map((boards, key) => {
              return (
                <div
                  className="dark:bg-primaryDark my-2 p-2 rounded-md text-xs"
                  key={key}
                >
                  {boards?.title}
                </div>
              );
            })
          ) : (
            <>Add more boards</>
          )}
        </div>
      </div>
      <Button className="" type="primary" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
};

export default DrawerContents;
