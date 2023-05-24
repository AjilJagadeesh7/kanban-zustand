import { Form, Modal } from "react-bootstrap";
import { useInputModalStore, useTaskStore } from "../store/store";
import { shallow } from "zustand/shallow";
import { useEffect, useRef } from "react";
import moment from "moment";

const TaskInput = () => {
  const addTask = useTaskStore((store) => store.addTask, shallow);
  const modal = useInputModalStore((store) => store, shallow);
  const inputRef = useRef(null);

  useEffect(() => {
    if (modal.show) {
      inputRef.current.focus();
    }
  }, [modal.show]);

  const handleAddTask = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      addTask(inputValue, modal.state, moment());
      inputRef.current.value = "";
      modal.toggleModal();
      //show success alert
    } else {
      //show error alert
    }
  };

  return (
    <Modal centered show={modal.show} onHide={() => modal.toggleModal()}>
      <Modal.Body
        className="bg-gray-700 text-gray-200 flex flex-col 
      items-center "
      >
        <div className="flex justify-between w-full bg-gray-600 p-2 mb-2 rounded-md">
          <div className="font-medium">
            Create {modal.state.toLowerCase()} task
          </div>
          <div
            className="cursor-pointer hover:bg-red-700 bg-red-800 p-1 text-xs font-medium rounded-md"
            onClick={() => modal.toggleModal()}
          >
            Close
          </div>
        </div>
        <Form.Control
          className="my-2"
          ref={inputRef}
          placeholder="Enter your task title"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <div
          className="mt-2 py-1 px-4 bg-blue-700 rounded-md font-medium text-center 
          w-full hover:bg-blue-600 cursor-pointer"
          onClick={handleAddTask}
        >
          Add Task
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TaskInput;

//
