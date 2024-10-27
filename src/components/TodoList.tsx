import React, { useState } from "react";
import { Todo } from "../App";
import EditModal from "./EditModal";
import TableRow from "./TableRow";

type TodoListProps = {
  todos: Todo[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, newName: Todo) => void;
  onStatusChange: (id: number, newStatus: "created" | "completed") => void;
};

const TodoList = ({
  todos,
  onDelete,
  onUpdate,
  onStatusChange,
}: TodoListProps) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [open, setOpen] = useState(false);

  let content: React.ReactNode;
  if (todos.length <= 0) {
    content = (
      <tr>
        <td colSpan={5} className="text-center pt-5">
          <span>No todos found.</span>
        </td>
      </tr>
    );
  } else {
    content = todos.map((todo, i) => (
      <TableRow
        onStatusChange={onStatusChange}
        todo={todo}
        key={todo.id}
        setSelectedTodo={setSelectedTodo}
        setOpen={setOpen}
        onDelete={onDelete}
        index={i}
      />
    ));
  }
  return (
    <table className="mx-auto mt-5">
      <thead>
        <tr>
          <th className="w-[30px] text-start border border-l-[0] border-slate-400"></th>
          <th className="w-[30px] text-start border border-l-[0] border-slate-400">
            id
          </th>
          <th className="w-[200px] text-start border border-slate-400">Name</th>
          <th className="w-[180px] text-start border border-slate-400">
            Status
          </th>
          <th className="w-[200px] text-start border border-slate-400">Date</th>
          <th className="w-[200px] text-start border border-slate-400 border-r-[0]">
            Action
          </th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
      {open && (
        <EditModal
          editData={selectedTodo}
          onOpen={setOpen}
          onUpdateTodo={onUpdate}
        />
      )}
    </table>
  );
};

export default TodoList;
