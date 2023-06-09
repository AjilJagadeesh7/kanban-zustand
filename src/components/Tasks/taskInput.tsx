import { useTaskStore } from "../../store/taskStore";
import { shallow } from "zustand/shallow";
import { useState } from "react";
import { Button, Input, Modal } from "antd";
import { useInputModalStore } from "../../store/inputStore";
import { CloseOutlined } from "@ant-design/icons";

const TaskInput = ({ boardId }: { boardId: string }) => {
  const [input, setInput] = useState<string>("");

  const addTask = useTaskStore((store) => store.addTask, shallow);
  const modal = useInputModalStore((store) => store, shallow);

  const handleAddTask = () => {
    if (input) {
      addTask(input, modal.state);
      setInput("");
      modal.toggleModal();
      //show success alert
    } else {
      //show error alert
    }
  };
  const handleModalClosing = () => {
    input && setInput("");
    modal.toggleModal();
  };

  return (
    <Modal
      closable={false}
      open={modal.show}
      centered
      onCancel={handleModalClosing}
      footer={null}
    >
      <div className="bg-primaryLight dark:bg-secondaryDark p-2 rounded-md flex flex-col gap-5">
        <div className="flex w-full px-3 justify-between">
          <div className="text-lg font-semibold dark:text-white self-center">
            CREATE {modal.state.toUpperCase()} TASK
          </div>
          <div>
            <CloseOutlined
              className="hover:scale-110"
              onClick={handleModalClosing}
            />
          </div>
        </div>
        <div className="px-3">
          <Input
            value={input}
            placeholder="Enter your task title"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
          />
          <Button
            className="mt-5 border-none bg-indigo-800 hover:bg-indigo-700 dark:bg-blue-700 dark:hover:bg-blue-700 text-white"
            onClick={handleAddTask}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskInput;

//
