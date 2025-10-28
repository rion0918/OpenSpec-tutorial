"use client";

import { useState, FormEvent } from "react";

interface TodoFormProps {
  categories: string[];
  tags: string[];
  onSubmit: (title: string, category: string, tags: string[]) => void;
}

export function TodoForm({
  categories,
  tags: availableTags,
  onSubmit,
}: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("タイトルは必須です");
      return;
    }

    const finalCategory = customCategory.trim() || category || "Uncategorized";
    onSubmit(title.trim(), finalCategory, selectedTags);

    // フォームをリセット
    setTitle("");
    setCategory("");
    setCustomCategory("");
    setSelectedTags([]);
    setTagInput("");
    setError("");
  };

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !selectedTags.includes(trimmedTag)) {
      setSelectedTags([...selectedTags, trimmedTag]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag(tagInput);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* タイトル入力 */}
      <div className="mb-4">
        <label
          htmlFor="todo-title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          TODOタイトル *
        </label>
        <input
          id="todo-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          placeholder="例: 買い物に行く"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          autoComplete="off"
        />
      </div>

      {/* カテゴリー選択 */}
      <div className="mb-4">
        <label
          htmlFor="todo-category"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          カテゴリー
        </label>
        <select
          id="todo-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">カテゴリーを選択</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* カスタムカテゴリー */}
      <div className="mb-4">
        <label
          htmlFor="custom-category"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          または新しいカテゴリー
        </label>
        <input
          id="custom-category"
          type="text"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          placeholder="例: Fitness"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          autoComplete="off"
        />
      </div>

      {/* タグ入力 */}
      <div className="mb-4">
        <label
          htmlFor="todo-tags"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          タグ
        </label>
        <input
          id="todo-tags"
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="タグを入力してEnter"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          autoComplete="off"
          list="available-tags"
        />
        <datalist id="available-tags">
          {availableTags.map((tag) => (
            <option key={tag} value={tag} />
          ))}
        </datalist>

        {/* 選択されたタグ */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                  aria-label={`${tag}タグを削除`}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        TODOを追加
      </button>
    </form>
  );
}
