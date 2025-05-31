---
title: 'Node.js パフォーマンス最適化の実践テクニック'
description: 'Node.jsアプリケーションのパフォーマンスを向上させるための実用的なテクニックとツールを紹介します。'
pubDate: 2024-01-25
heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
tags: ['Node.js', 'Performance', 'Backend']
draft: false
---

# Node.js パフォーマンス最適化の実践テクニック

Node.jsアプリケーションのパフォーマンスを最大化するための実践的なテクニックを学びましょう。

## イベントループの最適化

```javascript
// 悪い例：同期処理でブロッキング
function badExample() {
  const data = fs.readFileSync('large-file.txt', 'utf8');
  return data.split('\n').length;
}

// 良い例：非同期処理
async function goodExample() {
  try {
    const data = await fs.promises.readFile('large-file.txt', 'utf8');
    return data.split('\n').length;
  } catch (error) {
    console.error('File read error:', error);
    throw error;
  }
}
```

## ストリーミング処理

大きなファイルの処理にはストリームを使用します。

```javascript
const fs = require('fs');
const readline = require('readline');

async function processLargeFile(filename) {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    // 行ごとの処理
    if (lineCount % 10000 === 0) {
      console.log(`Processed ${lineCount} lines`);
    }
  }
  
  return lineCount;
}
```

## メモリ使用量の最適化

```javascript
// WeakMap を使用してメモリリークを防ぐ
const cache = new WeakMap();

class DataProcessor {
  constructor(data) {
    this.data = data;
    cache.set(this, new Map());
  }
  
  getProcessedData(key) {
    const localCache = cache.get(this);
    if (localCache.has(key)) {
      return localCache.get(key);
    }
    
    const result = this.expensiveOperation(key);
    localCache.set(key, result);
    return result;
  }
  
  expensiveOperation(key) {
    // 重い処理
    return this.data.filter(item => item.type === key);
  }
}
```

## Worker Threads の活用

CPU集約的なタスクにはWorker Threadsを使用します。

```javascript
// main.js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // メインスレッド
  function runWorker(data) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: data
      });
      
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }
  
  // 使用例
  runWorker({ numbers: [1, 2, 3, 4, 5] })
    .then(result => console.log('Result:', result));
} else {
  // ワーカースレッド
  const { numbers } = workerData;
  const result = numbers.reduce((sum, num) => sum + num, 0);
  parentPort.postMessage(result);
}
```

## プロファイリングとモニタリング

```javascript
// パフォーマンス測定
console.time('operation');
await expensiveOperation();
console.timeEnd('operation');

// メモリ使用量の監視
function logMemoryUsage() {
  const used = process.memoryUsage();
  console.log('Memory Usage:');
  for (let key in used) {
    console.log(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
}

setInterval(logMemoryUsage, 5000);
```

これらのテクニックを適用することで、Node.jsアプリケーションのパフォーマンスを大幅に向上させることができます。