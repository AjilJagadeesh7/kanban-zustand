import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthContainer = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="container rounded-md m-10 shadow-lg drop-shadow-lg flex flex-col">
      <div className="md:self-end bg-white md:w-[75%] xl:w-[50%] w-full rounded-md h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthContainer;
