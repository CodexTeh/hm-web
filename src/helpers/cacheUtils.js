/**
 * Browser Cache Utilities
 * Provides helper functions for managing browser cache
 */

// Cache duration constants (in milliseconds)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
  VERY_LONG: 7 * 24 * 60 * 60 * 1000, // 7 days
};

/**
 * Check if service worker is supported
 */
export const isServiceWorkerSupported = () => {
  return 'serviceWorker' in navigator;
};

/**
 * Register service worker
 */
export const registerServiceWorker = async () => {
  if (!isServiceWorkerSupported()) {
    console.warn('Service Workers are not supported in this browser');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('Service Worker registered successfully:', registration);

    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('New service worker available. Refresh to update.');
        }
      });
    });

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

/**
 * Unregister service worker
 */
export const unregisterServiceWorker = async () => {
  if (!isServiceWorkerSupported()) return;

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const success = await registration.unregister();
      if (success) {
        console.log('Service Worker unregistered successfully');
      }
    }
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
  }
};

/**
 * Clear all caches
 */
export const clearAllCaches = async () => {
  if (!isServiceWorkerSupported()) return;

  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
    console.log('All caches cleared');
    
    // Notify service worker to clear its caches
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
    }
  } catch (error) {
    console.error('Failed to clear caches:', error);
  }
};

/**
 * Clear API cache only
 */
export const clearApiCache = async () => {
  if (!isServiceWorkerSupported()) return;

  try {
    await caches.delete('hm-awani-api-v1');
    console.log('API cache cleared');
    
    // Notify service worker
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_API_CACHE' });
    }
  } catch (error) {
    console.error('Failed to clear API cache:', error);
  }
};

/**
 * Get cache size (approximate)
 */
export const getCacheSize = async () => {
  if (!isServiceWorkerSupported()) return 0;

  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      
      for (const key of keys) {
        const response = await cache.match(key);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
    }

    return totalSize;
  } catch (error) {
    console.error('Failed to calculate cache size:', error);
    return 0;
  }
};

/**
 * Format bytes to human readable format
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Check if app is online
 */
export const isOnline = () => {
  return navigator.onLine;
};

/**
 * Add online/offline event listeners
 */
export const setupOnlineStatusListener = (onOnline, onOffline) => {
  window.addEventListener('online', () => {
    console.log('App is online');
    if (onOnline) onOnline();
  });

  window.addEventListener('offline', () => {
    console.log('App is offline');
    if (onOffline) onOffline();
  });
};

/**
 * Prefetch and cache URLs
 */
export const prefetchUrls = async (urls) => {
  if (!isServiceWorkerSupported()) return;

  try {
    const cache = await caches.open('hm-awani-api-v1');
    await Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((response) => {
            if (response.ok) {
              return cache.put(url, response);
            }
          })
          .catch((error) => {
            console.warn(`Failed to prefetch ${url}:`, error);
          })
      )
    );
    console.log('Prefetched URLs:', urls);
  } catch (error) {
    console.error('Failed to prefetch URLs:', error);
  }
};

