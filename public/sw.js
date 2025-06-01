const CACHE_NAME = 'tech-blog-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// キャッシュするファイル（重要なアセット）
const STATIC_ASSETS = [
  '/',
  '/blog/',
  '/search/',
  '/offline/',
  '/manifest.json'
];

// キャッシュ戦略：ネットワーク優先、フォールバックでキャッシュ
const NETWORK_FIRST = [
  '/blog/',
  '/search/',
  '/tags/',
  '/rss.xml'
];

// キャッシュ戦略：キャッシュ優先
const CACHE_FIRST = [
  '/favicon.ico',
  '/_astro/',
  '.css',
  '.js',
  '.woff2',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp'
];

self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 同一オリジンのリクエストのみ処理
  if (url.origin !== location.origin) {
    return;
  }

  // GET リクエストのみ処理
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    handleRequest(request)
  );
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // キャッシュ優先の戦略
  if (shouldCacheFirst(url.pathname)) {
    return cacheFirst(request);
  }
  
  // ネットワーク優先の戦略
  if (shouldNetworkFirst(url.pathname)) {
    return networkFirst(request);
  }
  
  // デフォルト：ネットワーク優先
  return networkFirst(request);
}

function shouldCacheFirst(pathname) {
  return CACHE_FIRST.some(pattern => 
    pathname.includes(pattern) || pathname.endsWith(pattern)
  );
}

function shouldNetworkFirst(pathname) {
  return NETWORK_FIRST.some(pattern => 
    pathname.startsWith(pattern)
  );
}

async function cacheFirst(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // バックグラウンドでキャッシュを更新
      updateCache(request, cache);
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log('Cache first failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // 成功したレスポンスをキャッシュ
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network first failed, trying cache:', error);
    
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // HTMLページの場合はオフラインページを返す
    if (request.headers.get('accept')?.includes('text/html')) {
      const offlineResponse = await cache.match('/offline/');
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    return new Response('Content not available offline', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

async function updateCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response);
    }
  } catch (error) {
    console.log('Background cache update failed:', error);
  }
}