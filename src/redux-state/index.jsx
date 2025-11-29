import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";

import onboardingReducer from "./onboarding/reducer";
import commonReducer from "./common/reducer";
import mySaga from "./sagas";

// Step 1: Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const migrations = {
  0: (state) => ({
    ...state,
  }),
  1: (state) => ({
    ...state,
    onboarding: {
      login: false,
      createAccountLoading: false,
      signInloading: false,
      token: null,
      user: null,
    },
  }),
};

// Combine your reducers
const combinedReducer = combineReducers({
  onboarding: onboardingReducer,
  common: commonReducer,
});

const persistConfig = {
  key: "root",
  blacklist: [],
  migrate: createMigrate(migrations, { debug: false }),
  storage,
  version: 0,
};
const rootReducer = persistReducer(persistConfig, combinedReducer);
// Step 2: Set up the store with sagaMiddleware and other middlewares

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
        ],
      },
    }).concat(sagaMiddleware),
  reducer: rootReducer,
});

// Step 3: Create the persistor
export const persistor = persistStore(store);

export default store;
// Step 4: Run the saga
sagaMiddleware.run(mySaga);
