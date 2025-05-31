---
title: 'TypeScript Utility Types 実践活用ガイド'
description: 'TypeScriptの組み込みUtility Typesを使いこなして、より型安全で保守性の高いコードを書く方法を解説します。'
pubDate: 2024-01-15
heroImage: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&h=400&fit=crop'
tags: ['TypeScript', 'Types', 'Utility Types']
draft: false
---

# TypeScript Utility Types 実践活用ガイド

TypeScriptの組み込みUtility Typesを活用することで、より柔軟で型安全なコードを書くことができます。

## Pick と Omit

既存の型から特定のプロパティを選択または除外します。

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// 特定のプロパティのみを選択
type UserPublic = Pick<User, 'id' | 'name' | 'email'>;
// { id: number; name: string; email: string; }

// 特定のプロパティを除外
type UserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
// { name: string; email: string; password: string; }
```

## Partial と Required

すべてのプロパティをオプショナルまたは必須にします。

```typescript
interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

// すべてオプショナル
type PartialConfig = Partial<Config>;
// { apiUrl?: string; timeout?: number; retries?: number; }

// 一部のプロパティのみ必須
type MinimalConfig = Required<Pick<Config, 'apiUrl'>> & Partial<Config>;
// { apiUrl: string; timeout?: number; retries?: number; }

function createConfig(config: PartialConfig): Config {
  return {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
    ...config
  };
}
```

## Record

キーと値の型を指定してオブジェクト型を作成します。

```typescript
type Status = 'pending' | 'approved' | 'rejected';
type StatusInfo = {
  label: string;
  color: string;
};

const statusMap: Record<Status, StatusInfo> = {
  pending: { label: 'Pending', color: 'yellow' },
  approved: { label: 'Approved', color: 'green' },
  rejected: { label: 'Rejected', color: 'red' }
};

// 動的なキーを持つオブジェクト
type CacheStorage = Record<string, any>;
const cache: CacheStorage = {};
```

## Exclude と Extract

Union型から特定の型を除外または抽出します。

```typescript
type EventType = 'click' | 'focus' | 'blur' | 'submit' | 'change';

// 特定の型を除外
type MouseEventType = Exclude<EventType, 'focus' | 'blur'>;
// 'click' | 'submit' | 'change'

// 特定の型のみを抽出
type FormEventType = Extract<EventType, 'submit' | 'change'>;
// 'submit' | 'change'
```

## ReturnType と Parameters

関数の戻り値の型や引数の型を取得します。

```typescript
function createUser(name: string, email: string) {
  return {
    id: Math.random(),
    name,
    email,
    createdAt: new Date()
  };
}

// 関数の戻り値の型を取得
type User = ReturnType<typeof createUser>;
// { id: number; name: string; email: string; createdAt: Date; }

// 関数の引数の型を取得
type CreateUserParams = Parameters<typeof createUser>;
// [string, string]

// 引数の型を個別に取得
type UserName = Parameters<typeof createUser>[0]; // string
type UserEmail = Parameters<typeof createUser>[1]; // string
```

## 高度な活用例

```typescript
// APIレスポンスの型定義
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// ジェネリック関数でUtility Typesを活用
async function updateEntity<T, K extends keyof T>(
  id: string,
  updates: Partial<Pick<T, K>>
): Promise<ApiResponse<T>> {
  // 実装...
  return {} as ApiResponse<T>;
}

// 使用例
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

// 名前と価格のみ更新可能
updateEntity<Product, 'name' | 'price'>('1', {
  name: 'New Name',
  price: 100
});
```

## カスタムUtility Typesの作成

```typescript
// DeepPartial: ネストしたオブジェクトもPartialにする
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// NonNullable: nullとundefinedを除外
type NonNullableKeys<T> = {
  [K in keyof T]: T[K] extends null | undefined ? never : K;
}[keyof T];

type NonNullableObject<T> = Pick<T, NonNullableKeys<T>>;

interface UserWithOptionals {
  name: string;
  email?: string;
  avatar?: string;
  settings: {
    theme?: string;
    notifications?: boolean;
  };
}

type DeepPartialUser = DeepPartial<UserWithOptionals>;
type RequiredUser = NonNullableObject<UserWithOptionals>;
```

Utility Typesを活用することで、型の再利用性が高まり、より安全で保守性の高いTypeScriptコードを書くことができます。