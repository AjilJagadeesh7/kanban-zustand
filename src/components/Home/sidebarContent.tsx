import { Avatar, Button } from "antd";
import React, { useEffect, useState } from "react";
import { User, useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../../store/boardStore";
import { shallow } from "zustand/shallow";
import { PlusOutlined } from "@ant-design/icons";
import CustomSpinner from "../Reusable/customSpinner";

const SidebarContent = ({
  handleAddBoard,
}: {
  handleAddBoard: () => Promise<void>;
}) => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);

  const { display } = useAuthStore((store) => store.user as User);
  const signOut = useAuthStore((store) => store.signOut);
  const fetchBoards = useBoardStore((store) => store.fetchBoards, shallow);
  const boardsList = useBoardStore((store) => store.kanbanBoards, shallow);
  const setSelectedBoard = useBoardStore((store) => store.setSelectedBoards);
  const boardsLoading = useBoardStore((store) => store.isLoading);

  useEffect(() => {
    const handleResize = () => {
      const isScreenMdOrLess = window.matchMedia("(min-width: 770px)").matches;
      setIsVisible(isScreenMdOrLess);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isVisible) {
      fetchBoards();
    }
  }, [isVisible, boardsList.length]);

  const handleSignOut = async () => {
    try {
      signOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const boardsContent = () => {
    if (boardsLoading) {
      return (
        <div className="flex w-full justify-center items-center h-[90%]">
          <CustomSpinner />
        </div>
      );
    }
    const loadedBoards = boardsList.length ? (
      boardsList.map((boards, key) => (
        <div
          className="dark:bg-primaryDark my-2 p-2 rounded-md text-xs"
          key={key}
          onClick={() => setSelectedBoard(boards?.id)}
        >
          {boards?.title}
        </div>
      ))
    ) : (
      <div className="text-sm text-center">Add more boards...</div>
    );

    return loadedBoards;
  };

  return (
    <div
      className="py-10 hidden md:flex h-full w-[30vw] lg:w-[20vw] xl:w-[15vw] flex-col justify-between 
      items-center dark:bg-secondaryDark bg-secondaryLight"
    >
      <div className="w-full h-full">
        <div
          className="dark:text-white text-primaryDark
            dark:bg-teritiaryDark bg-secondaryLight p-2 rounded-md shadow-xl 
            drop-shadow-xl mx-[5%] text-center font-medium text-sm mb-2 flex-flex-col"
        >
          <Avatar size={50} />
          <div className="mt-2">{display}</div>
        </div>
        <div
          className="dark:bg-teritiaryDark dark:text-white mx-[5%] 
            p-2 rounded-md shadow-xl drop-shadow-xl h-[80%] overflow-y-auto 
            custom-scroll"
        >
          <div
            className="text-center dark:bg-primaryDark my-2 px-2 py-1 border-dashed 
            dark:border-white border-primaryDark border rounded-md text-xs 
            cursor-pointer hover:scale-105"
            onClick={handleAddBoard}
          >
            <PlusOutlined className="text-lg dark:text-primaryLight" />
          </div>

          {boardsContent()}
        </div>
      </div>
      <Button className="" type="primary" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
};

export default SidebarContent;
