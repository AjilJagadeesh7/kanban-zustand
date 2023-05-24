import moment from "moment";
import { useTaskStore } from "../store/store";
import { shallow } from "zustand/shallow";
import { ReactComponent as TrashLogo } from "../assets/trash.svg";

/* eslint-disable react/prop-types */
const Task = ({ id, title, state, date, serial }) => {
  const deleteTask = useTaskStore((store) => store.deleteTask, shallow);
  const setDraggedTask = useTaskStore((store) => store.setDraggedTask, shallow);
  return (
    <div
      draggable
      onDragStart={() => setDraggedTask(id)}
      className="my-3 bg-gray-700 rounded-[4px] min-h-[5rem] flex flex-col 
      justify-between text-gray-300 p-2"
    >
      <div className="font-medium text-sm">
        {serial + 1}. {title}
      </div>

      <div className="text-[10.5px] text-gray-400 font-medium">
        {moment(date).format("DD-MMM-YY")}
      </div>
      <div className="flex justify-between items-center mt-2">
        <div
          className="w-5 h-5 cursor-pointer hover:scale-110"
          onClick={() => deleteTask(id)}
        >
          <TrashLogo />
        </div>
        <div
          className={`font-medium text-sm rounded 
        ${
          state === "PLANNED"
            ? "bg-blue-800"
            : state === "ONGOING"
            ? "bg-green-800"
            : "bg-red-800"
        } 
        p-1`}
        >
          {state.toLowerCase()}
        </div>
      </div>
    </div>
  );
};

export default Task;
