import React from "react";
import Kanban from "../kanban-board/kanban";
import { Button } from "antd";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const signOut = useAuthStore((store) => store.signOut);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      signOut();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="w-full h-full">
      <Button type="primary" onClick={handleSignOut}>
        Signout
      </Button>
      <Kanban />
    </div>
  );
};

export default Home;
