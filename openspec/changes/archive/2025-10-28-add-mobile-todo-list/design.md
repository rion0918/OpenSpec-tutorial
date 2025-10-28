# Design: Add Mobile Todo List

## Architecture Overview

Next.js App Router 構造を使用したクライアントサイドレンダリング(CSR)アプリケーションとして実装します。状態管理は React Hooks を使用し、データ永続化にはブラウザのローカルストレージ API を利用します。

## Component Structure

```
app/
  ├── page.tsx                 # メインTODOリストページ
  ├── layout.tsx               # グローバルレイアウト
  └── globals.css              # グローバルスタイル
components/
  ├── TodoList.tsx             # TODOリストコンテナ
  ├── TodoItem.tsx             # 個別TODOアイテム
  ├── TodoForm.tsx             # TODO追加フォーム
  ├── CategoryFilter.tsx       # カテゴリーフィルター
  └── TagFilter.tsx            # タグフィルター
lib/
  ├── hooks/
  │   ├── useTodos.ts          # TODOデータ管理カスタムフック
  │   └── useLocalStorage.ts   # ローカルストレージ操作フック
  └── types/
      └── todo.ts              # TypeScript型定義
```

## Data Model

```typescript
interface Todo {
  id: string; // UUID
  title: string; // TODOタイトル
  completed: boolean; // 完了状態
  category: string; // カテゴリー名
  tags: string[]; // タグの配列
  order: number; // 並び順(0から開始)
  createdAt: string; // ISO 8601形式
}

interface TodoState {
  todos: Todo[];
  categories: string[]; // 利用可能なカテゴリーリスト
  tags: string[]; // 利用可能なタグリスト
}
```

## Storage Strategy

### Local Storage Key Structure

- `todos`: 全 TODO アイテムの JSON 配列
- `categories`: カテゴリーの JSON 配列
- `tags`: タグの JSON 配列

### Data Operations

1. **初期ロード**: useEffect 内で localStorage.getItem()を呼び出し
2. **データ更新**: 状態変更時に localStorage.setItem()で自動保存
3. **エラーハンドリング**: try-catch で QuotaExceededError を捕捉

## Mobile UI/UX Considerations

### Responsive Design

- モバイルファースト設計: 320px 幅から対応
- タッチターゲットサイズ: 最小 44x44px
- スワイプジェスチャー: 削除操作をサポート

### Performance

- 仮想スクロール: 100 件以上の TODO で有効化(react-window を検討)
- デバウンス: 並び替え時の保存処理を 300ms 遅延

### Accessibility

- セマンティック HTML 使用(button, list, checkbox)
- ARIA ラベルの適切な設定
- キーボードナビゲーション対応

## Sorting Implementation

### Approach 1: Simple Button-Based (初期実装推奨)

- 各 TODO アイテムに上下移動ボタン
- order 値を更新して再ソート
- 実装がシンプルで軽量

### Approach 2: Drag and Drop (将来の拡張)

- react-beautiful-dnd ライブラリ使用
- より直感的な UX
- モバイルでのタッチ操作に対応

## Technology Decisions

### Framework & Libraries

- **Next.js 14+**: App Router とサーバーコンポーネント活用
- **TypeScript**: 型安全性の確保
- **Tailwind CSS**: モバイル最適化のためのユーティリティファースト
- **UUID**: 一意な TODO ID の生成

### State Management

- React useState/useReducer で十分(Redux は不要)
- カスタムフックでロジックをカプセル化

### Testing Strategy (将来)

- Jest + React Testing Library
- LocalStorage のモック化
- コンポーネント単体テスト

## Security Considerations

- XSS 対策: React のデフォルトエスケープに依存
- LocalStorage 制約: ユーザー入力のサニタイズ
- 機密データは保存しない(将来の機能として注意)

## Future Extensibility

- PWA 対応でオフライン機能強化
- IndexedDB への移行でより大容量対応
- バックエンド同期 API の追加
- TODO アイテムの編集機能
- リマインダー機能
