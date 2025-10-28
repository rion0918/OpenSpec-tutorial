"use client";

import { useState } from "react";
import { useTodos } from "@/lib/hooks/useTodos";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { TodoFilters } from "@/lib/types/todo";

export default function Home() {
  const {
    todos,
    categories,
    tags,
    sortMode,
    error,
    createTodo,
    deleteTodo,
    toggleTodo,
    moveTodoUp,
    moveTodoDown,
    setSortMode,
    getSortedTodos,
    getFilteredTodos,
  } = useTodos();

  const [filters, setFilters] = useState<TodoFilters>({
    category: null,
    tags: [],
    tagFilterMode: "and",
  });

  // フィルタリングとソートを適用
  const filteredTodos = getFilteredTodos(todos, filters);
  const displayTodos = getSortedTodos(filteredTodos, sortMode);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            📝 My TODO List
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {todos.length}件のTODO ({todos.filter((t) => t.completed).length}
            件完了)
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* エラー表示 */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
            <p className="font-medium">エラー</p>
            <p className="text-sm mt-1">{error.message}</p>
          </div>
        )}

        {/* TODO追加フォーム */}
        <TodoForm categories={categories} tags={tags} onSubmit={createTodo} />

        {/* ソートモード選択 */}
        <div className="mb-4">
          <label
            htmlFor="sort-mode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            並び替え
          </label>
          <select
            id="sort-mode"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as typeof sortMode)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="manual">手動並び替え</option>
            <option value="date-newest">新しい順</option>
            <option value="date-oldest">古い順</option>
            <option value="status">完了状態</option>
            <option value="alphabetical">アルファベット順</option>
          </select>
        </div>

        {/* TODOリスト */}
        <TodoList
          todos={displayTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onMoveUp={sortMode === "manual" ? moveTodoUp : undefined}
          onMoveDown={sortMode === "manual" ? moveTodoDown : undefined}
        />
      </main>
    </div>
  );
}
