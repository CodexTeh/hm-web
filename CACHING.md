# Browser Caching Implementation

This project includes a comprehensive browser caching solution using Service Workers and the Cache API.

## Features

### 1. Service Worker Caching
- **Static Assets**: HTML, CSS, JS files cached for 7 days (same-origin only)
- **Images**: Product images and icons cached for 30 days (same-origin only)
- **API Responses**: Same-origin API calls cached for 5 minutes
- **Offline Support**: App works offline with cached data
- **External APIs**: Not intercepted by service worker to avoid CORS issues (browser's native HTTP cache still applies)

### 2. Caching Strategies

#### API Requests (Cache First with Network Fallback)
- First checks cache for recent data (within 5 minutes)
- Falls back to network if cache is stale or unavailable
- Returns cached data (even if stale) when offline

#### Images (Cache First with Network Fallback)
- Images cached for 30 days
- Serves from cache when available
- Falls back to network for new images

#### Static Assets (Cache First with Network Fallback)
- HTML, CSS, JS files cached for 7 days
- Ensures fast page loads on repeat visits

## Files

- `public/sw.js` - Service Worker implementation
- `src/helpers/cacheUtils.js` - Cache utility functions

## Usage

### Automatic Caching
The service worker automatically caches all GET requests. No changes needed to existing API code.

### Manual Cache Management

```javascript
import { 
  clearAllCaches, 
  clearApiCache, 
  getCacheSize, 
  formatBytes 
} from './helpers/cacheUtils';

// Clear all caches
await clearAllCaches();

// Clear only API cache
await clearApiCache();

// Get cache size
const size = await getCacheSize();
console.log('Cache size:', formatBytes(size));
```

### Service Worker Registration
The service worker is automatically registered in production mode via `App.jsx`.

## Cache Configuration

You can modify cache durations in `public/sw.js`:

```javascript
const CACHE_DURATION = {
  STATIC: 7 * 24 * 60 * 60 * 1000, // 7 days
  API: 5 * 60 * 1000, // 5 minutes
  IMAGES: 30 * 24 * 60 * 60 * 1000, // 30 days
};
```

## Development vs Production

- **Development**: Service worker is NOT registered (to avoid caching issues during development)
- **Production**: Service worker is automatically registered

## Testing

1. Build the project: `npm run build`
2. Serve the build: `npm run preview`
3. Open browser DevTools → Application → Service Workers
4. Check cache storage in DevTools → Application → Cache Storage

## Cache Invalidation

The service worker automatically:
- Cleans up old caches on activation
- Updates cache when new service worker version is available
- Respects cache expiration times

## Browser Support

Service Workers are supported in:
- Chrome 40+
- Firefox 44+
- Safari 11.1+
- Edge 17+

## Notes

- Service worker only works over HTTPS (or localhost for development)
- Cache is automatically managed - no manual cleanup needed
- API cache is separate from static asset cache for better control
- **External API requests are NOT intercepted** by the service worker to avoid CORS issues
  - External APIs (like `api.hmawani.com`) will use the browser's native HTTP cache
  - Only same-origin requests are cached by the service worker
  - This prevents CORS errors while still benefiting from browser caching

