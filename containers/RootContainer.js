import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
  Text
} from "react-native";
import { MenuProvider } from "react-native-popup-menu";
// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import createSagaMiddleware from "redux-saga";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore, persistReducer } from "redux-persist";

import AppNavigator from "../navigation/AppNavigator";
import Fonts from "../constants/Fonts";
import { imagesArray } from "../constants/Images";
// import AppNavigator from "../navigation/AppNavigator";
// import Fonts from "./constants/Fonts";
// import { imagesArray } from "./constants/Images";
// import reducer from "./reducers";
// import rootSaga from "./sagas";

export default function RootContainer(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const setup = async () => {
    await loadResourcesAsync();
    await setLoadingComplete(true);
  }
  useEffect(() => {
    setup();
    // return () => {
    //   cleanup
    // };
  }, [])

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      // <AppLoading
      //   startAsync={loadResourcesAsync}
      //   onError={handleLoadingError}
      //   onFinish={() => handleFinishLoading(setLoadingComplete)}
      // />
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <MenuProvider>
          <AppNavigator />
        </MenuProvider>
      </View>
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
