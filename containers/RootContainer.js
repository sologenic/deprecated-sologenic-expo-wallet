import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { MenuProvider } from "react-native-popup-menu";
import { createAppContainer } from "react-navigation";

import MainStack from "../navigation/MainStack";
import OrientationStack from "../navigation/OrientationStack";
import Fonts from "../constants/Fonts";
import { imagesArray } from "../constants/Images";
const App = createAppContainer(MainStack);
const Orientation = createAppContainer(OrientationStack);

const RootContainer = ({
  skipLoadingScreen,
  isOrientationComplete,
  authSetupComplete,
  isAuthenticated,
}) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const setup = async () => {
    await loadResourcesAsync();
    await setLoadingComplete(true);
  };
  useEffect(() => {
    setup();
    // return () => {
    //   cleanup
    // };
  }, []);

  if (!isLoadingComplete && !skipLoadingScreen) {
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
    if (isOrientationComplete) {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
          <MenuProvider>
            <App screenProps={{ authSetupComplete, isAuthenticated }} />
          </MenuProvider>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
        <Orientation />
      </View>
    );
  }
};

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync(imagesArray),
    Font.loadAsync(Fonts.fonts),
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
    // backgroundColor: "#fff",
  },
});

const mapStateToProps = ({
  isOrientationComplete,
  isAuthenticated,
  authSetupComplete,
}) => ({
  isOrientationComplete,
  isAuthenticated,
  authSetupComplete,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
