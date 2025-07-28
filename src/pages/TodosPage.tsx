import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoFilter, TodoStats } from "../types/types";
import StatsCard from "../components/todo/StatsCard";
import AddTodoForm from "../components/todo/AddTodoForm";
import TodoItem from "../components/todo/TodoItem";

const FILTER_OPTIONS = [
  {
    value: TodoFilter.ALL,
    label: "সব",
    countKey: "total",
  },
  {
    value: TodoFilter.ACTIVE,
    label: "সক্রিয়",
    countKey: "pending",
  },
  {
    value: TodoFilter.COMPLETED,
    label: "সম্পন্ন",
    countKey: "completed",
  },
] as const;


// Main App Component
const TodosPage: React.FC = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted } =
    useTodos();

//   const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.ALL);

  const filteredTodos = todos.filter((todo) => {
    // if (filter === "active") return !todo.completed;
    // if (filter === "completed") return todo.completed;
    
    if (filter === TodoFilter.ACTIVE) return !todo.completed;
    if (filter === TodoFilter.COMPLETED) return todo.completed;
    return true;
  });

  const stats: TodoStats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    pending: todos.filter((todo) => !todo.completed).length,
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 Todo App</h1>
          <p className="text-gray-600">TypeScript + React + Tailwind CSS</p>
        </div>

        <StatsCard stats={stats} onClearCompleted={clearCompleted} />

        <AddTodoForm onAdd={addTodo} />
        <div className="flex gap-2 mb-6">
          {/* normal typescript */}
          {/* {(["all", "active", "completed"] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === filterOption
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {filterOption === "all"
                ? "সব"
                : filterOption === "active"
                ? "সক্রিয়"
                : "সম্পন্ন"}
              <span className="ml-2 px-2 py-1 bg-black bg-opacity-20 rounded text-xs">
                {filterOption === "all"
                  ? stats.total
                  : filterOption === "active"
                  ? stats.pending
                  : stats.completed}
              </span>
            </button>
          ))} */}
          {FILTER_OPTIONS.map(({ value, label, countKey }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === value
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {label}
              <span className="ml-2 px-2 py-1 bg-black bg-opacity-20 rounded text-xs">
                {stats[countKey]}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-gray-500 text-lg">
                {filter === "all"
                  ? "কোনো কাজ নেই!"
                  : filter === "active"
                  ? "কোনো সক্রিয় কাজ নেই!"
                  : "কোনো সম্পন্ন কাজ নেই!"}
              </p>
              {filter === "active" && stats.total > 0 && (
                <p className="text-sm text-gray-400 mt-2">সব কাজ সম্পন্ন! 🎊</p>
              )}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="font-semibold">💡 TypeScript এর সুবিধা:</p>
          <ul className="mt-2 space-y-1 text-left max-w-md mx-auto">
            <li>✅ Type safety এবং early error detection</li>
            <li>✅ Better IDE support এবং autocomplete</li>
            <li>✅ Self-documenting code</li>
            <li>✅ Easier refactoring এবং maintenance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
