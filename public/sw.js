// Service Worker for Browser Caching
const CACHE_NAME = 'hm-awani-v1';
const API_CACHE_NAME = 'hm-awani-api-v1';
const STATIC_CACHE_NAME = 'hm-awani-static-v1';

// Cache duration in milliseconds
const CACHE_DURATION = {
  STATIC: 7 * 24 * 60 * 60 * 1000, // 7 days
  API: 5 * 60 * 1000, // 5 minutes
  IMAGES: 30 * 24 * 60 * 60 * 1000, // 30 days
};

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[Service Worker] Failed to cache some static assets:', err);
      });
    })
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return (
              name !== CACHE_NAME &&
              name !== API_CACHE_NAME &&
              name !== STATIC_CACHE_NAME
            );
          })
          .map((name) => {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  return self.clients.claim(); // Take control of all pages immediately
});

// Helper function to check if response is stale
function isStale(cachedResponse, maxAge) {
  if (!cachedResponse) return true;
  const cachedDate = cachedResponse.headers.get('sw-cached-date');
  if (!cachedDate) return true;
  const age = Date.now() - parseInt(cachedDate, 10);
  return age > maxAge;
}

// Helper function to clone response with cache metadata
function addCacheMetadata(response, maxAge) {
  const headers = new Headers(response.headers);
  headers.set('sw-cached-date', Date.now().toString());
  headers.set('sw-max-age', maxAge.toString());
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers,
  });
}

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const requestUrl = request.url;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip blob URLs - these are temporary and can't be cached by service workers
  // Check the URL string directly before parsing to avoid issues
  if (requestUrl.startsWith('blob:')) {
    return;
  }

  // Skip data URLs - these are inline data and don't need caching
  if (requestUrl.startsWith('data:')) {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!requestUrl.startsWith('http://') && !requestUrl.startsWith('https://')) {
    return;
  }

  // Now safe to create URL object for further processing
  let url;
  try {
    url = new URL(requestUrl);
  } catch (e) {
    // Invalid URL, skip it
    return;
  }

  // Skip external API requests - let browser handle them to avoid CORS issues
  // Only intercept same-origin requests for caching
  const isSameOrigin = url.hostname === self.location.hostname || 
                       url.hostname === 'localhost' || 
                       url.hostname === '127.0.0.1';
  
  // External API requests - don't intercept at all, let browser handle CORS
  // Service workers can't cache responses that fail due to CORS anyway
  if (!isSameOrigin && (url.pathname.includes('/api/') || 
      url.searchParams.has('barcode') ||
      url.searchParams.has('page') ||
      url.searchParams.has('category'))) {
    // Don't intercept - let the request pass through normally
    return;
  }

  // Same-origin API requests - Cache First with Network Fallback
  if (isSameOrigin && (url.pathname.includes('/api/') || 
      url.searchParams.has('barcode') ||
      url.searchParams.has('page') ||
      url.searchParams.has('category'))) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Image requests - Cache First with Network Fallback (only same-origin or CORS-enabled)
  if (request.destination === 'image' || 
      /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname)) {
    // Only intercept same-origin images or let external images pass through
    if (isSameOrigin) {
      event.respondWith(handleImageRequest(request));
    }
    // For external images, let browser handle (they might have CORS)
    return;
  }

  // Static assets - only cache same-origin
  if (isSameOrigin) {
    event.respondWith(handleStaticRequest(request));
  }
  // For external static assets, let browser handle
});

// Handle same-origin API requests
async function handleApiRequest(request) {
  const cache = await caches.open(API_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  // Check if cached response is still fresh
  if (cachedResponse && !isStale(cachedResponse, CACHE_DURATION.API)) {
    console.log('[Service Worker] Serving API from cache:', request.url);
    return cachedResponse;
  }

  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Only cache successful responses
    if (networkResponse.ok) {
      const responseToCache = addCacheMetadata(networkResponse.clone(), CACHE_DURATION.API);
      await cache.put(request, responseToCache);
      console.log('[Service Worker] Cached API response:', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Network error, trying cache:', error);
    
    // If network fails and we have cached data (even if stale), return it
    if (cachedResponse) {
      console.log('[Service Worker] Serving stale API from cache:', request.url);
      return cachedResponse;
    }
    
    // Return offline response if no cache available
    return new Response(
      JSON.stringify({ 
        error: 'Offline', 
        message: 'No internet connection and no cached data available' 
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// Handle image requests
async function handleImageRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse && !isStale(cachedResponse, CACHE_DURATION.IMAGES)) {
    console.log('[Service Worker] Serving image from cache:', request.url);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const responseToCache = addCacheMetadata(networkResponse.clone(), CACHE_DURATION.IMAGES);
      await cache.put(request, responseToCache);
      console.log('[Service Worker] Cached image:', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    if (cachedResponse) {
      console.log('[Service Worker] Serving stale image from cache:', request.url);
      return cachedResponse;
    }
    
    // Return placeholder or error image
    return new Response('Image not available offline', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

// Handle static asset requests
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse && !isStale(cachedResponse, CACHE_DURATION.STATIC)) {
    console.log('[Service Worker] Serving static asset from cache:', request.url);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const responseToCache = addCacheMetadata(networkResponse.clone(), CACHE_DURATION.STATIC);
      await cache.put(request, responseToCache);
      console.log('[Service Worker] Cached static asset:', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    if (cachedResponse) {
      console.log('[Service Worker] Serving stale static asset from cache:', request.url);
      return cachedResponse;
    }
    
    // Return offline page or error
    return new Response('Asset not available offline', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

// Message event - handle cache management from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => caches.delete(name))
        );
      })
    );
  }
  
  if (event.data && event.data.type === 'CLEAR_API_CACHE') {
    event.waitUntil(caches.delete(API_CACHE_NAME));
  }
});

