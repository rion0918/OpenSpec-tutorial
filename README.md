# OpenSpec-tutorial

OpenSpec の導入手順を示すチュートリアルプロジェクトです。

## OpenSpec とは

OpenSpec は、ソフトウェア開発における変更提案から実装、アーカイブまでを構造化されたワークフローで管理するツールです。

- **提案の作成**: 新機能や変更内容を明確に文書化
- **仕様の定義**: 要件を Given/When/Then 形式で記述
- **タスクの追跡**: 実装の進捗を可視化
- **変更のアーカイブ**: 完了した作業を履歴として保存

## インストール

### 1. OpenSpec のインストール

```bash
npm install -g openspec
```

または

```bash
pnpm add -g openspec
```

または

```bash
yarn global add openspec
```

### 2. インストールの確認

```bash
openspec --version
```

バージョンが表示されればインストール成功です。

## 基本的な使い方

### 1. 変更提案の作成

```bash
openspec init <変更名>
```

これにより以下のファイルが自動生成されます:

- `openspec/changes/<変更名>/proposal.md` - 変更提案書
- `openspec/changes/<変更名>/design.md` - 設計ドキュメント
- `openspec/changes/<変更名>/tasks.md` - タスク一覧

### 2. 仕様の作成 (オプション)

```bash
openspec spec create <変更名>/<機能名>
```

`openspec/changes/<変更名>/specs/<機能名>/spec.md` に要件仕様を記述できます。

### 3. 提案の検証

```bash
openspec validate <変更名>
```

または厳密なチェック:

```bash
openspec validate <変更名> --strict
```

### 4. 実装とタスク管理

`tasks.md` に従って実装を進め、完了したタスクは `[x]` でマークします:

```markdown
- [x] 完了したタスク
- [ ] 未完了のタスク
```

### 5. 変更のアーカイブ

実装が完了したら:

```bash
openspec archive <変更名>
```

新規プロジェクトで既存の仕様がない場合:

```bash
openspec archive <変更名> --skip-specs --yes
```

アーカイブされた変更は `openspec/changes/archive/` に移動します。

## よく使うコマンド

```bash
# アクティブな変更の一覧
openspec list

# 変更の詳細表示
openspec show <変更名>

# アーカイブの一覧
ls -la openspec/changes/archive/

# タスクの進捗確認
cat openspec/changes/<変更名>/tasks.md
```

## プロジェクト構造

```
.
├── openspec/
│   ├── project.md           # プロジェクト全体の概要
│   ├── AGENTS.md            # AIエージェント向けの指示
│   ├── changes/             # アクティブな変更提案
│   │   └── archive/         # アーカイブされた変更
│   └── specs/               # プロジェクト全体の仕様
└── README.md
```

## 参考リンク

- [OpenSpec 公式ドキュメント](https://openspec.dev/)
- [OpenSpec GitHub](https://github.com/openspec-dev/openspec)
