import React from "react";
import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import Rehydration from "./reducers/Rehydration";

import reducer from "./reducers";
import rootSaga from "./sagas";
import RootContainer from "./containers/RootContainer";

// const persistedState = createFilter('root', [
//   'updateIsOrientationComplete',
// ]);

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
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootContainer />
      </PersistGate>
    </Provider>
  );
}
