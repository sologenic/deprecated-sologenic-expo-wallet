import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MenuProvider } from "react-native-popup-menu";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";

import AppNavigator from "./navigation/AppNavigator";
import Fonts from "./constants/Fonts";
import { imagesArray } from "./constants/Images";
import reducer from "./reducers";
import rootSaga from "./sagas";

//set up redux-persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["test"]
  // blacklist: ['test']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const setUpStore = () => {
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);
  return { store, persistor };
};

const sagaMiddleware = createSagaMiddleware();

const { store, persistor } = setUpStore();

sagaMiddleware.run(rootSaga);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppLoading
            startAsync={loadResourcesAsync}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(setLoadingComplete)}
          />
        </PersistGate>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <MenuProvider>
              <AppNavigator />
            </MenuProvider>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync(imagesArray),
    Font.loadAsync(Fonts.fonts)
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
