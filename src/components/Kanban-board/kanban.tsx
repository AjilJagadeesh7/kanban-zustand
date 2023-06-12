import { useEffect } from "react";
import Columns from "./columns";
import TaskInput from "../Tasks/taskInput";
import { useTaskStore } from "../../store/taskStore";

const Kanban = ({
  selectedBoard,
  showDrawer,
}: {
  selectedBoard: any;
  showDrawer: () => void;
}) => {
  const fetchTask = useTaskStore((store) => store.fetchTask);
  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="dark:bg-primaryDark bg-primaryLight h-full w-full overflow-x-hidden custom-scroll">
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
          <div className="text-white">Select a board</div>
        )}
      </div>

      <TaskInput boardId={selectedBoard.id} />
    </div>
  );
};

export default Kanban;
