"use client";

import { Todo } from "@/lib/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
}: TodoItemProps) {
  const handleDelete = () => {
    if (window.confirm("このTODOを削除しますか?")) {
      onDelete(todo.id);
    }
  };

  const categoryColors: Record<string, string> = {
    Personal: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Work: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    Shopping:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Uncategorized:
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  };

  const categoryColor =
    categoryColors[todo.category] || categoryColors.Uncategorized;

  return (
    <li className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-3">
      <div className="flex items-start gap-3">
        {/* チェックボックス */}
        <button
          onClick={() => onToggle(todo.id)}
          className="flex-shrink-0 mt-1 w-6 h-6 rounded border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-colors hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={
            todo.completed ? "TODOを未完了にする" : "TODOを完了にする"
          }
        >
          {todo.completed && (
            <svg
              className="w-4 h-4 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* コンテンツ */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-base font-medium ${
              todo.completed
                ? "line-through opacity-60"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {todo.title}
          </h3>

          {/* カテゴリーとタグ */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}
            >
              {todo.category}
            </span>
            {todo.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 作成日時 */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {new Date(todo.createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col gap-1">
          {/* 上へ移動 */}
          {onMoveUp && (
            <button
              onClick={() => onMoveUp(todo.id)}
              disabled={isFirst}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="上へ移動"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          )}

          {/* 下へ移動 */}
          {onMoveDown && (
            <button
              onClick={() => onMoveDown(todo.id)}
              disabled={isLast}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="下へ移動"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}

          {/* 削除 */}
          <button
            onClick={handleDelete}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            aria-label="削除"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
