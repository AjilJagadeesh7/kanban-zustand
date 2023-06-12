/* eslint-disable react/prop-types */
import { useTaskStore } from "../../store/taskStore";
import { shallow } from "zustand/shallow";
import Task from "../Tasks/task";
import { useInputModalStore } from "../../store/inputStore";

const Columns = ({ state }: { state: string; boardId: string }) => {
  const tasks = useTaskStore(
    (store) =>
      store?.tasks?.filter(
        (task) => task?.state?.toLowerCase() === state?.toLowerCase()
      ),
    shallow
  );
  const draggedTask = useTaskStore((store) => store.draggedTask);
  const moveTask = useTaskStore((store) => store.moveTask);
  const setDraggedTask = useTaskStore((store) => store.setDraggedTask, shallow);
  const modal = useInputModalStore((state) => state, shallow);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        setDraggedTask(null);
        draggedTask && moveTask(draggedTask, state);
      }}
      className="bg-secondaryLight dark:bg-secondaryDark min-h-[20rem] text-white w-[70%] md:w-[33%] 
      max-w-[20rem] mx-2 rounded-[4px] p-2 my-10 shadow-xl drop-shadow-lg"
    >
      <div className="flex justify-between bg-teritiaryLight dark:bg-teritiaryDark rounded-md p-2 items-center">
        <p className="text-xs font-medium my-2">{state}</p>
        <div
          className="rounded-md text-center h-8 py-1.5 px-3 bg-indigo-800 hover:bg-indigo-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-gray-100
        font-medium  cursor-pointer text-sm"
          onClick={() => {
            modal.selectState(state);
            modal.toggleModal();
          }}
        >
          Add Task
        </div>
      </div>
      {tasks?.map((task, key) => {
        return (
          <Task
            id={task.id}
            serial={key}
            key={key}
            title={task.title}
            state={task.state}
            date={task.date}
          />
        );
      })}
    </div>
  );
};

export default Columns;
