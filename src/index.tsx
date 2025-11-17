// CRITICAL: Import React FIRST to ensure it's available before any other code
// This ensures React is loaded and available before any vendor chunks execute
import React from 'react';
import ReactDOM from 'react-dom/client';

// Make React available globally to prevent useSyncExternalStore errors
if (typeof window !== 'undefined') {
  window.React = React;
}

import MyApp from './App';

// React entry point
MyApp();
