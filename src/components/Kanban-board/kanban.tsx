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
    <div className="dark:bg-primaryDark bg-primaryLight min-h-screen w-full overflow-x-hidden custom-scroll">
      <div className="w-full flex items-center justify-between p-2 bg-teritiaryLight dark:bg-teritiaryDark">
        <MenuOutlined
          className="text-md p-3 text-secondaryDark dark:text-white hover:scale-105 cursor-pointer bg-secondaryLight bg-opacity-70 dark:bg-black 
          dark:bg-opacity-25 rounded-full"
          onClick={showDrawer}
        />
        <div className="text-xl font-semibold text-white select-none">
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
          <div className="text-white">Select a board</div>
        )}
      </div>

      <TaskInput boardId={selectedBoard.id} />
    </div>
  );
};

export default Kanban;
