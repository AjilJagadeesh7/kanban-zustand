import React from "react";
import Columns from "./columns";
import TaskInput from "../Tasks/taskInput";

const Kanban = () => {
  return (
    <div
      className="bg-gray-900 min-h-screen flex justify-center items-center md:items-start
    md:flex-row flex-col"
    >
      <Columns state={"PLANNED"} />
      <Columns state={"ONGOING"} />
      <Columns state={"DONE"} />
      <TaskInput />
    </div>
  );
};

export default Kanban;