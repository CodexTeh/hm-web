const { VITE_PUSHER_CLUSTER, VITE_PUSHER_KEY } = process.env;

let pusherInstance = null;
let isDisconnected = false;
let pusherModulePromise = null;

/**
 * Lazy-load pusher-js module
 * This ensures pusher-js is only loaded when needed (after login)
 */
const loadPusher = async () => {
  if (!pusherModulePromise) {
    pusherModulePromise = import('pusher-js');
  }
  const Pusher = (await pusherModulePromise).default;
  return Pusher;
};

/**
 * Get or create Pusher instance
 * This allows reconnection after disconnection for bfcache
 * Lazy-loads pusher-js only when called (after login)
 */
const getPusher = async () => {
  if (!pusherInstance || isDisconnected) {
    const Pusher = await loadPusher();
    pusherInstance = new Pusher(VITE_PUSHER_KEY, {
      cluster: VITE_PUSHER_CLUSTER,
      // Enable automatic reconnection
      enabledTransports: ['ws', 'wss'],
    });
    isDisconnected = false;
  }
  return pusherInstance;
};

/**
 * Disconnect Pusher to allow bfcache
 * This is called when the page is about to be hidden
 */
const disconnectPusher = () => {
  if (pusherInstance && !isDisconnected) {
    try {
      // Unsubscribe from all channels first
      pusherInstance.allChannels().forEach(channel => {
        pusherInstance.unsubscribe(channel.name);
      });
      // Disconnect the WebSocket connection
      pusherInstance.disconnect();
      isDisconnected = true;
    } catch (error) {
      console.warn('Error disconnecting Pusher:', error);
    }
  }
};

/**
 * Reconnect Pusher when page becomes visible again
 */
const reconnectPusher = async () => {
  if (isDisconnected) {
    // Create a new instance (old one cannot be reused after disconnect)
    pusherInstance = null;
    isDisconnected = false;
  }
  return getPusher();
};

// Handle page visibility and navigation events for bfcache
if (typeof window !== 'undefined') {
  // Disconnect when page is about to be hidden (navigation away)
  // This allows the page to enter bfcache
  window.addEventListener('pagehide', (event) => {
    // Disconnect on all pagehide events to ensure bfcache eligibility
    // The persisted flag indicates if the page might be restored from bfcache
    disconnectPusher();
  });

  // Reconnect when page is restored from bfcache
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      // Page was restored from bfcache
      // Pusher will reconnect automatically when components subscribe
      reconnectPusher();
    }
  });
}

// Note: pusher-js is now lazy-loaded and only imported when getPusher() is called
// This ensures it's only loaded after login when real-time features are needed
export { disconnectPusher, reconnectPusher, getPusher };
