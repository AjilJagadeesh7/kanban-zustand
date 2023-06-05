import React from "react";
import Columns from "./columns";
import TaskInput from "../Tasks/taskInput";

const Kanban = ({ selectedBoard }: { selectedBoard: any }) => {
  return (
    <div
      className="bg-gray-900 min-h-screen flex justify-center items-center md:items-start
    md:flex-row flex-col w-full"
    >
      {selectedBoard?.columns?.length ? (
        selectedBoard?.columns?.map((column) => {
          return <Columns state={column} />;
        })
      ) : (
        <div>No Columns available</div>
      )}

      <TaskInput />
    </div>
  );
};

export default Kanban;
