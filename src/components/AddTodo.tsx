import { memo, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

const AddTodo = ({ onAddTodo }: { onAddTodo: (todo: string) => void }) => {
  const [todo, setTodo] = useState("");
  const handleAddTodo = () => {
    if (todo.trim() === "") return;
    onAddTodo(todo);
    setTodo("");
  };
  return (
    <div className="flex items-center w-full mt-5">
      <input
        type="text"
        value={todo}
        className="border border-slate-300 rounded-md w-full h-12 outline-none p-3"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="ml-5" onClick={handleAddTodo}>
        <IoAddCircleOutline size={40} />
      </button>
    </div>
  );
};

export default memo(AddTodo);
