// CRITICAL: Ensure React is imported and available before any React-dependent code
// Import React first to ensure react-vendor chunk loads before other vendor chunks
import React from 'react';
import ReactDOM from 'react-dom/client';

// Ensure React is available globally for vendor chunks that might need it
if (typeof window !== 'undefined' && !window.React) {
  window.React = React;
}

// Import React-dependent packages after React is loaded
import { createBrowserRouter, RouterProvider } from 'react-router';

// State-management
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'redux-state/index';
import { AppRoutes } from './routes/routes';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { registerServiceWorker, setupOnlineStatusListener } from './helpers/cacheUtils';

const router = createBrowserRouter(AppRoutes);

const App = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    // <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    // </React.StrictMode>
  );

  // Register service worker for browser caching
  if (process.env.NODE_ENV === 'production') {
    registerServiceWorker().catch((error) => {
      console.error('Failed to register service worker:', error);
    });
  }

  // Setup online/offline status listeners
  setupOnlineStatusListener(
    () => {
      console.log('Application is back online');
    },
    () => {
      console.log('Application is offline');
    }
  );

  reportWebVitals();
};

export default App;