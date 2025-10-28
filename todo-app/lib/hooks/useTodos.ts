'use client';

import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './useLocalStorage';
import { Todo, TodoState, SortMode, TodoFilters } from '../types/todo';

const DEFAULT_CATEGORIES = ['Personal', 'Work', 'Shopping', 'Uncategorized'];

const INITIAL_STATE: TodoState = {
  todos: [],
  categories: DEFAULT_CATEGORIES,
  tags: [],
};

/**
 * TODO管理のためのカスタムフック
 */
export function useTodos() {
  const [state, setState, error] = useLocalStorage<TodoState>('todoState', INITIAL_STATE);
  const [sortMode, setSortMode] = useLocalStorage<SortMode>('sortMode', 'manual');

  // TODO作成
  const createTodo = useCallback(
    (title: string, category: string, tags: string[]) => {
      const newTodo: Todo = {
        id: uuidv4(),
        title,
        completed: false,
        category: category || 'Uncategorized',
        tags,
        order: state.todos.length,
        createdAt: new Date().toISOString(),
      };

      setState((prev) => {
        const updatedCategories = prev.categories.includes(category)
          ? prev.categories
          : [...prev.categories, category];
        
        const newTags = tags.filter((tag) => !prev.tags.includes(tag));
        const updatedTags = [...prev.tags, ...newTags];

        return {
          todos: [...prev.todos, newTodo],
          categories: updatedCategories,
          tags: updatedTags,
        };
      });
    },
    [state.todos.length, setState]
  );

  // TODO削除
  const deleteTodo = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        todos: prev.todos.filter((todo) => todo.id !== id),
      }));
    },
    [setState]
  );

  // TODO完了状態切り替え
  const toggleTodo = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        todos: prev.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      }));
    },
    [setState]
  );

  // TODO並び替え（上へ移動）
  const moveTodoUp = useCallback(
    (id: string) => {
      setState((prev) => {
        const index = prev.todos.findIndex((todo) => todo.id === id);
        if (index <= 0) return prev;

        const newTodos = [...prev.todos];
        [newTodos[index - 1], newTodos[index]] = [newTodos[index], newTodos[index - 1]];
        
        // order値を更新
        return {
          ...prev,
          todos: newTodos.map((todo, i) => ({ ...todo, order: i })),
        };
      });
    },
    [setState]
  );

  // TODO並び替え（下へ移動）
  const moveTodoDown = useCallback(
    (id: string) => {
      setState((prev) => {
        const index = prev.todos.findIndex((todo) => todo.id === id);
        if (index < 0 || index >= prev.todos.length - 1) return prev;

        const newTodos = [...prev.todos];
        [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
        
        // order値を更新
        return {
          ...prev,
          todos: newTodos.map((todo, i) => ({ ...todo, order: i })),
        };
      });
    },
    [setState]
  );

  // TODO並び順変更（ドラッグ&ドロップ用）
  const reorderTodos = useCallback(
    (startIndex: number, endIndex: number) => {
      setState((prev) => {
        const newTodos = Array.from(prev.todos);
        const [removed] = newTodos.splice(startIndex, 1);
        newTodos.splice(endIndex, 0, removed);
        
        return {
          ...prev,
          todos: newTodos.map((todo, i) => ({ ...todo, order: i })),
        };
      });
    },
    [setState]
  );

  // ソート済みTODOリストを取得
  const getSortedTodos = useCallback(
    (todos: Todo[], mode: SortMode): Todo[] => {
      const sorted = [...todos];
      
      switch (mode) {
        case 'date-newest':
          return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        case 'date-oldest':
          return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        case 'status':
          return sorted.sort((a, b) => {
            if (a.completed === b.completed) return a.order - b.order;
            return a.completed ? 1 : -1;
          });
        case 'alphabetical':
          return sorted.sort((a, b) => a.title.localeCompare(b.title, 'ja'));
        case 'manual':
        default:
          return sorted.sort((a, b) => a.order - b.order);
      }
    },
    []
  );

  // フィルタリング済みTODOリストを取得
  const getFilteredTodos = useCallback(
    (todos: Todo[], filters: TodoFilters): Todo[] => {
      let filtered = todos;

      // カテゴリーフィルター
      if (filters.category) {
        filtered = filtered.filter((todo) => todo.category === filters.category);
      }

      // タグフィルター
      if (filters.tags.length > 0) {
        if (filters.tagFilterMode === 'and') {
          // ANDモード: すべてのタグを含む
          filtered = filtered.filter((todo) =>
            filters.tags.every((tag) => todo.tags.includes(tag))
          );
        } else {
          // ORモード: いずれかのタグを含む
          filtered = filtered.filter((todo) =>
            filters.tags.some((tag) => todo.tags.includes(tag))
          );
        }
      }

      return filtered;
    },
    []
  );

  return {
    // 状態
    todos: state.todos,
    categories: state.categories,
    tags: state.tags,
    sortMode,
    error,

    // アクション
    createTodo,
    deleteTodo,
    toggleTodo,
    moveTodoUp,
    moveTodoDown,
    reorderTodos,
    setSortMode,

    // ヘルパー関数
    getSortedTodos,
    getFilteredTodos,
  };
}
