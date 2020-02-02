import React, { useEffect } from "react";
import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import SplashScreen from "react-native-splash-screen";
import * as Sentry from '@sentry/react-native';

import reducer from "./reducers";
import rootSaga from "./sagas";
import RootContainer from "./containers/RootContainer";
import ErrorBoundary from "./containers/ErrorBoundary";
// const persistedState = createFilter('root', [
//   'updateIsOrientationComplete',
// ]);

Sentry.init({ 
  dsn: 'https://6890bc8315f34207a0f891f774602ea9@sentry.io/2143718', 
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
    "isOrientationComplete",
    "isPinCreated",
    "pin",
    "baseCurrency",
    "authSetupComplete",
    "unlockMethod",
    "wallets",
    "marketData",
    "soloData",
  ],
  // transforms: [persistedUserState],
  // blacklist: ["isAuthenticated"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const setUpStore = () => {
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);
  // let persistor = persistStore(store).purge();
  return { store, persistor };
};

const sagaMiddleware = createSagaMiddleware();

const { store, persistor } = setUpStore();

// persist store

sagaMiddleware.run(rootSaga);

export default function App(props) {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={{ ...store, persistor }}>
        <PersistGate loading={null} persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
