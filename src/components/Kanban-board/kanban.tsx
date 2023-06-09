import { useEffect } from "react";
import Columns from "./columns";
import TaskInput from "../Tasks/taskInput";
import { MenuOutlined } from "@ant-design/icons";
import { useBoardStore } from "../../store/boardStore";
import { useTaskStore } from "../../store/taskStore";

const Kanban = ({
  selectedBoard,
  showDrawer,
}: {
  selectedBoard: any;
  showDrawer: () => void;
}) => {
  const deleteBoard = useBoardStore((store) => store.deleteBoard);
  const fetchTask = useTaskStore((store) => store.fetchTask);
  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen w-full overflow-x-hidden custom-scroll">
      <div className="w-full flex justify-between p-2">
        <MenuOutlined
          className="text-xl text-white hover:scale-105 cursor-pointer"
          onClick={showDrawer}
        />
        <div className="text-xl font-semibold text-white">
          {selectedBoard?.title?.toUpperCase() || ""}
        </div>
      </div>
      <div
        className="flex justify-center items-center md:items-start md:flex-row 
        flex-col flex-wrap overflow-y-auto"
      >
        {selectedBoard?.columns?.length ? (
          selectedBoard?.columns?.map((column, key) => {
            return (
              <Columns key={key} state={column} boardId={selectedBoard.id} />
            );
          })
        ) : (
          <div>No Columns available</div>
        )}
      </div>

      <TaskInput boardId={selectedBoard.id} />
    </div>
  );
};

export default Kanban;
