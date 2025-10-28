export interface Todo {
  id: string; // UUID
  title: string; // TODOタイトル
  completed: boolean; // 完了状態
  category: string; // カテゴリー名
  tags: string[]; // タグの配列
  order: number; // 並び順(0から開始)
  createdAt: string; // ISO 8601形式
}

export interface TodoState {
  todos: Todo[];
  categories: string[]; // 利用可能なカテゴリーリスト
  tags: string[]; // 利用可能なタグリスト
}

export type SortMode = 'manual' | 'date-newest' | 'date-oldest' | 'status' | 'alphabetical';

export type FilterMode = 'and' | 'or';

export interface TodoFilters {
  category: string | null;
  tags: string[];
  tagFilterMode: FilterMode;
}
