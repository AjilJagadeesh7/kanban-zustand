import React from "react";
import Columns from "./columns";
import TaskInput from "../Tasks/taskInput";
import { DeleteFilled } from "@ant-design/icons";
import { useBoardStore } from "../../store/boardStore";

const Kanban = ({ selectedBoard }: { selectedBoard: any }) => {
  const deleteBoard = useBoardStore((store) => store.deleteBoard);
  return (
    <div className="bg-gray-900 min-h-screen w-full overflow-x-hidden custom-scroll">
      <div className="w-full flex justify-between p-2">
        <div className="text-xl font-semibold text-white">
          {selectedBoard?.title?.toUpperCase() || ""}
        </div>
        <div
          className="flex items-center justify-center bg-red-800 rounded-md 
        p-1 hover:scale-110 cursor-pointer active:bg-red-900 select-none"
          onClick={() => deleteBoard(selectedBoard?.id)}
        >
          <DeleteFilled className="text-white" />
          <div className="text-center text-xs font-semibold text-white p-1">
            Delete
          </div>
        </div>
      </div>
      <div
        className="flex justify-center items-center md:items-start md:flex-row 
        flex-col flex-wrap overflow-y-auto"
      >
        {selectedBoard?.columns?.length ? (
          selectedBoard?.columns?.map((column) => {
            return <Columns state={column} />;
          })
        ) : (
          <div>No Columns available</div>
        )}
      </div>

      <TaskInput />
    </div>
  );
};

export default Kanban;
