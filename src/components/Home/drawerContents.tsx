import { Button } from "antd";
import React from "react";
import { User, useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const DrawerContents = () => {
  const signOut = useAuthStore((store) => store.signOut);
  const { display, email } = useAuthStore((store) => store.user as User);
  const navigate = useNavigate();
  const boardsList = [];
  const handleSignOut = async () => {
    try {
      signOut();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
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
          <div className="dark:bg-primaryDark my-2 p-2 text-center rounded-md text-xs cursor-pointer">
            Add a board
          </div>
        </div>
      </div>
      <Button className="" type="primary" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
};

export default DrawerContents;
