import React from "react";

type FilterTodoProps = {
  getFilterTodo: React.Dispatch<
    React.SetStateAction<{
      name: string;
      status: "all" | "created" | "completed";
    }>
  >;
  filter: {
    name: string;
    status: "all" | "created" | "completed";
  };
};

const FilterTodo = ({ getFilterTodo, filter }: FilterTodoProps) => {
  return (
    <div className="flex py-5 gap-4 justify-center">
      <span className="text-base text-black font-bold">Filter</span>
      <input
        type="text"
        placeholder="enter name"
        className="border border-slate-400 p-2 rounded-md"
        value={filter.name}
        onChange={(e) =>
          getFilterTodo((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />
      <select
        className="border border-slate-400 p-2 rounded-md"
        value={filter.status}
        onChange={(e) =>
          getFilterTodo((prev) => ({
            ...prev,
            status: e.target.value as typeof filter.status,
          }))
        }
      >
        <option value="all">All</option>
        <option value="created">Created</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default FilterTodo;
