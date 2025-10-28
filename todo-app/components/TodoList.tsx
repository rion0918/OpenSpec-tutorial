"use client";

import { Todo } from "@/lib/types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
}

export function TodoList({
  todos,
  onToggle,
  onDelete,
  onMoveUp,
  onMoveDown,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          TODOがありません
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          上のフォームから最初のTODOを追加しましょう
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3" role="list" aria-label="TODO一覧">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          isFirst={index === 0}
          isLast={index === todos.length - 1}
        />
      ))}
    </ul>
  );
}
