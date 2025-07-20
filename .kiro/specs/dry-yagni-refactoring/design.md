# 設計書

## 概要

このドキュメントは、AstroブログプロジェクトをDRY（Don't Repeat Yourself）とYAGNI（You Aren't Gonna Need It）の原則に基づいてリファクタリングするための詳細な設計を示します。現在のコードベース分析により、以下の主要な問題が特定されました：

1. **重複したスタイルクラス**: タグと日付バッジのスタイルが複数箇所で重複
2. **分散したユーティリティ関数**: 関連する機能が異なるディレクトリに分散
3. **未使用の複雑な機能**: 過度に複雑なコンポーネント設計
4. **設定値の重複**: ハードコードされた値が複数箇所に存在

## アーキテクチャ

### リファクタリング後の構造

```
src/
├── components/
│   ├── ui/                    # 基本UIコンポーネント（新規）
│   │   ├── Button.astro
│   │   ├── Tag.astro
│   │   └── DateBadge.astro
│   ├── layout/                # レイアウト関連（新規）
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── MobileMenu.astro
│   └── blog/                  # ブログ固有（新規）
│       ├── ArticleCard.astro
│       └── RelatedArticles.astro
├── lib/
│   ├── utils/                 # 統合されたユーティリティ
│   │   ├── index.ts          # 統合エクスポート（新規）
│   │   ├── blog.ts           # ブログ関連ユーティリティ
│   │   ├── date.ts           # 日付関連ユーティリティ
│   │   ├── styles.ts         # スタイル関連ユーティリティ（新規）
│   │   └── validation.ts     # バリデーション（新規）
│   └── constants/            # 統合された設定（新規）
│       ├── index.ts
│       ├── site.ts
│       ├── ui.ts
│       └── blog.ts
├── styles/
│   ├── base.css              # 基本スタイル（リファクタリング）
│   └── components.css        # コンポーネントスタイル（簡素化）
└── types/
    ├── index.ts              # 統合エクスポート（新規）
    ├── blog.ts               # ブログ関連型
    └── ui.ts                 # UI関連型（新規）
```

## コンポーネントと インターフェース

### 1. 基本UIコンポーネントの統合

#### Tag コンポーネント
```typescript
interface TagProps {
  tag: string;
  href?: string;
  variant?: 'default' | 'colored';
  size?: 'sm' | 'md';
  interactive?: boolean;
}
```

#### DateBadge コンポーネント
```typescript
interface DateBadgeProps {
  date: string | Date;
  format?: 'short' | 'long' | 'iso';
  showIcon?: boolean;
  variant?: 'default' | 'compact';
}
```

#### Button コンポーネント
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}
```

### 2. レイアウトコンポーネントの最適化

#### Header コンポーネント
- ナビゲーションロジックの統合
- レスポンシブ対応の簡素化
- テーマ切り替えの統合

#### Footer コンポーネント
- 設定値の外部化
- ソーシャルリンクの統合

### 3. ブログ固有コンポーネント

#### ArticleCard コンポーネント
- compact/grid レイアウトの統合
- 共通スタイルの適用
- プロパティの簡素化

## データモデル

### 統合された型定義

```typescript
// types/index.ts - 統合エクスポート
export * from './blog';
export * from './ui';

// types/ui.ts - UI関連型
export interface BaseComponentProps {
  class?: string;
  id?: string;
}

export interface InteractiveProps extends BaseComponentProps {
  disabled?: boolean;
  onClick?: () => void;
}

export type Variant = 'primary' | 'secondary' | 'ghost';
export type Size = 'sm' | 'md' | 'lg';

// types/blog.ts - ブログ関連型（既存を整理）
export interface BlogPost extends CollectionEntry<'blog'> {}

export interface ArticleData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  slug: string;
  content?: string;
}
```

### 設定の統合

```typescript
// lib/constants/index.ts
export * from './site';
export * from './ui';
export * from './blog';

// lib/constants/ui.ts
export const UI_CONSTANTS = {
  COLORS: {
    TAG_VARIANTS: [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      // ... 他の色
    ],
    BUTTON_VARIANTS: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      ghost: 'text-gray-700 hover:bg-gray-100'
    }
  },
  SIZES: {
    BUTTON: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }
  }
} as const;
```

## エラーハンドリング

### バリデーション関数の統合

```typescript
// lib/utils/validation.ts
export function validateArticleData(data: unknown): ArticleData {
  // 型安全なバリデーション
}

export function validateTagName(tag: string): boolean {
  return tag.length > 0 && tag.length <= 50;
}
```

### エラー境界の実装

```typescript
// lib/utils/error.ts
export function handleComponentError(error: Error, componentName: string): void {
  console.error(`Error in ${componentName}:`, error);
  // エラーレポーティング
}
```

## テスト戦略

### 1. ユニットテスト
- ユーティリティ関数のテスト
- コンポーネントのプロパティテスト
- 型定義の検証

### 2. 統合テスト
- コンポーネント間の連携テスト
- スタイルの一貫性テスト
- レスポンシブ対応テスト

### 3. パフォーマンステスト
- バンドルサイズの測定
- レンダリング速度の測定
- 未使用コードの検出

## 実装フェーズ

### フェーズ1: 基盤整備
1. 統合された型定義の作成
2. 設定ファイルの統合
3. ユーティリティ関数の整理

### フェーズ2: コンポーネント統合
1. 基本UIコンポーネントの作成
2. 既存コンポーネントのリファクタリング
3. スタイルの統合

### フェーズ3: 最適化
1. 未使用コードの削除
2. パフォーマンス最適化
3. テストの追加

### フェーズ4: 検証
1. 機能テスト
2. パフォーマンステスト
3. コードレビュー

## パフォーマンス最適化

### バンドルサイズの削減
- 未使用インポートの削除
- Tree-shakingの最適化
- 動的インポートの活用

### レンダリング最適化
- 不要なre-renderの削除
- メモ化の適用
- 遅延読み込みの実装

### CSS最適化
- 重複スタイルの統合
- 未使用CSSの削除
- クリティカルCSSの分離

## 移行戦略

### 段階的移行
1. 新しいコンポーネントの作成
2. 既存コンポーネントの段階的置換
3. 古いコンポーネントの削除

### 後方互換性
- 既存のAPIの維持
- 段階的な非推奨化
- 移行ガイドの提供

## 品質保証

### コード品質
- ESLintルールの強化
- Prettierの設定統一
- TypeScript strict modeの有効化

### ドキュメント
- コンポーネントのドキュメント化
- 使用例の提供
- 移行ガイドの作成

## セキュリティ考慮事項

### XSS対策
- ユーザー入力のサニタイズ
- HTMLエスケープの確認
- CSPヘッダーの設定

### 依存関係管理
- 脆弱性のあるパッケージの更新
- 未使用依存関係の削除
- セキュリティ監査の実施