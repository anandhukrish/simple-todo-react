import React, { Dispatch, FormEvent, useState } from "react";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import { Todo } from "../App";

type EditBodyProps = {
  editData: Todo | null;
  onOpen: Dispatch<React.SetStateAction<boolean>>;
  onUpdateTodo: (id: number, updatedTodo: Todo) => void;
};

const EditBody = ({
  editData = {} as Todo,
  onOpen,
  onUpdateTodo,
}: EditBodyProps) => {
  const [todo, setTodo] = useState(editData?.name);
  const [status, setStatus] = useState(editData?.status);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editData?.id && todo && status) {
      onUpdateTodo(editData?.id, { ...editData, name: todo, status });
    }
    onOpen(false);
  };
  console.log(editData);
  return (
    <div className="bg-black/20  w-full h-full absolute z-10 top-0 left-0">
      <div className="w-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-black p-5 bg-white z-20">
        <div className="relative">
          <div className=" py-3 ">
            <h1>Edit Todo</h1>
            <button
              className="absolute right-0 top-0"
              onClick={() => onOpen(false)}
            >
              <CgClose />
            </button>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className="w-full rounded-md h-12 border border-slate-300"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
            </div>
            <div>
              <select
                name=""
                id=""
                className="w-full h-12 rounded-md px-2 border border-slate-300"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "created" | "completed")
                }
              >
                <option value="created">Created</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-5 bg-blue-500 text-white py-2 px-3 rounded-full"
            >
              Edit Todo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
type EditModalProps = {
  editData: Todo | null;
  onOpen: Dispatch<React.SetStateAction<boolean>>;
  onUpdateTodo: (id: number, updatedTodo: Todo) => void;
};

const EditModal = ({ editData, onOpen, onUpdateTodo }: EditModalProps) => {
  return createPortal(
    <EditBody
      editData={editData}
      onOpen={onOpen}
      onUpdateTodo={onUpdateTodo}
    />,
    document.body
  );
};

export default EditModal;
