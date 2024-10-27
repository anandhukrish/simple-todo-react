import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import { Todo } from "../App";
import { cn } from "../utils";
import { BiPencil } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { format } from "date-fns";

type TableRowProps = {
  todo: Todo;
  onStatusChange: (id: number, newStatus: "created" | "completed") => void;
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onDelete: (id: number) => void;
  index: number;
};

const TableRow = ({
  todo,
  onStatusChange,
  setSelectedTodo,
  setOpen,
  onDelete,
  index,
}: TableRowProps) => {
  const handleStatusChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: number) => {
      onStatusChange(id, e.target.checked ? "completed" : "created");
    },
    [onStatusChange]
  );

  const handleOpenTodo = useCallback(
    (todo: Todo) => {
      setSelectedTodo(todo);
      setOpen(true);
    },
    [setOpen, setSelectedTodo]
  );
  return (
    <tr>
      <td className="border-b border-r border-slate-400 p-1">
        <input
          type="checkbox"
          checked={todo.status === "completed"}
          onChange={(e) => handleStatusChange(e, todo.id)}
        />
      </td>
      <td className="border-b border-r border-slate-400 p-1">{index + 1}</td>
      <td className="text-base border-b border-r border-slate-400 p-1">
        {todo.name}
      </td>
      <td
        className={cn(
          "text-base border-b border-r border-slate-400 p-1",
          todo.status === "created" ? "text-blue-600" : "text-green-500"
        )}
      >
        {todo.status === "created" ? "In Progress" : "Completed"}
      </td>
      <td className="w-12 text-base border-b border-r border-slate-400 p-1">
        {format(todo.date, "dd/MM/yyyy")}
      </td>
      <td className="w-12 border-b  border-slate-400 p-1">
        <button onClick={() => handleOpenTodo(todo)}>
          <BiPencil size={22} className="text-blue-600" />
        </button>
        <button className="ml-2" onClick={() => onDelete(todo.id)}>
          <MdOutlineDeleteOutline size={22} className="text-red-600" />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
