import React, { useState } from "react";
import Kanban from "../kanban-board/kanban";
import { Button, Drawer, Space } from "antd";
import { User, useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import DrawerContents from "./drawerContents";

const Home = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [selectedBoard, setSelectedBoard] = useState<string>("");

  const signOut = useAuthStore((store) => store.signOut);
  const { display, email } = useAuthStore((store) => store.user as User);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      signOut();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  const boardsList = [];
  const fillerText =
    "No boards selected. Enhance your productivity by selecting or creating a board.";

  return (
    <div className="w-full h-full flex">
      <div
        className="absolute md:hidden w-10 h-10 bg-white bottom-2 left-2"
        onClick={showDrawer}
      ></div>
      <div
        className="py-10 hidden md:flex h-full w-[30vw] lg:w-[20vw] xl:w-[15vw] flex-col justify-between 
      items-center dark:bg-secondaryDark bg-secondaryLight"
      >
        <div className="w-full h-full">
          <p
            className="dark:text-white text-primaryDark
            dark:bg-teritiaryDark bg-secondaryLight p-2 rounded-md shadow-xl 
            drop-shadow-xl mx-[5%] text-center font-medium text-sm"
          >
            {display}
          </p>
          <div
            className="dark:bg-teritiaryDark dark:text-white mx-[5%] 
            p-2 rounded-md shadow-xl drop-shadow-xl h-[80%] overflow-y-auto custom-scroll"
          >
            {boardsList.map((boards, key) => {
              return (
                <div
                  className="dark:bg-primaryDark my-2 p-2 rounded-md text-xs"
                  key={key}
                >
                  {boards}
                </div>
              );
            })}
            <div className="text-center dark:bg-primaryDark my-2 p-2 rounded-md text-xs cursor-pointer">
              Add a board
            </div>
          </div>
        </div>
        <Button className="" type="primary" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
      {selectedBoard ? (
        <Kanban selectedBoard={selectedBoard} />
      ) : (
        <div className="dark:text-white px-10 text-primaryDark w-full flex justify-center flex-col text-center">
          <p className="text-lg font-semibold">{fillerText}</p>
          <p className="text-sm mt-2">
            Get started on your tasks and stay organized!
          </p>
        </div>
      )}
      <Drawer
        title={<div className="dark:text-white">{display}</div>}
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
        <DrawerContents />
      </Drawer>
    </div>
  );
};

export default Home;
