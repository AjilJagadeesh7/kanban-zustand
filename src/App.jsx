import Columns from "./components/columns";
import TaskInput from "./components/taskInput";

function App() {
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
}

export default App;
