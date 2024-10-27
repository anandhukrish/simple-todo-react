import { useCallback, useEffect, useMemo, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import FilterTodo from "./components/FilterTodo";

export type Todo = {
  name: string;
  status: "created" | "completed";
  date: Date;
  id: number;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(
    () => JSON.parse(localStorage.getItem("todos")!) || []
  );

  const [filter, setFilter] = useState<{
    name: string;
    status: "all" | "created" | "completed";
  }>({ name: "", status: "all" });

  const filteredTodos = useMemo(() => {
    if (filter.status === "all") {
      return todos.filter((todo) =>
        todo.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    } else {
      return todos.filter(
        (todo) =>
          todo.name.toLowerCase().includes(filter.name.toLowerCase()) &&
          todo.status === filter.status
      );
    }
  }, [filter.name, filter.status, todos]);

  const handleAddTodo = useCallback((todo: string) => {
    const newTodo: Todo = {
      name: todo,
      status: "created",
      date: new Date(),
      id: Math.round(Math.random() * 10000),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDeleteTodo = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const handleEditTodo = useCallback((id: number, editTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? editTodo : todo))
    );
  }, []);

  const handleStatusChange = useCallback(
    (id: number, newStatus: "created" | "completed") => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, status: newStatus } : todo
        )
      );
    },
    []
  );

  return (
    <div className="container mx-auto">
      <AddTodo onAddTodo={handleAddTodo} />
      <FilterTodo getFilterTodo={setFilter} filter={filter} />
      <div>
        <TodoList
          todos={filteredTodos}
          onDelete={handleDeleteTodo}
          onStatusChange={handleStatusChange}
          onUpdate={handleEditTodo}
        />
      </div>
    </div>
  );
}

export default App;
