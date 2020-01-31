import React, { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Platform, StatusBar, StyleSheet, View, Image } from "react-native";
import { connect } from "react-redux";
import { MenuProvider } from "react-native-popup-menu";
import { createAppContainer } from "react-navigation";
import NetInfo from "@react-native-community/netinfo";

import MainStack from "../navigation/MainStack";
import OrientationStack from "../navigation/OrientationStack";
import Fonts from "../constants/Fonts";
import { connectToRippleApi, getNetInfo } from "../actions";
import images, { imagesArray } from "../constants/Images";
import colors from "../constants/Colors";
const App = createAppContainer(MainStack);
const Orientation = createAppContainer(OrientationStack);

const RootContainer = ({
  skipLoadingScreen,
  isOrientationComplete,
  authSetupComplete,
  isAuthenticated,
  getNetInfo,
  connectToRippleApi,
}) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const setup = async () => {
    await loadResourcesAsync();
    await setLoadingComplete(true);
    const unsubscribe = await NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      getNetInfo(state.isConnected);
    });
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    await connectToRippleApi();
  };

  useEffect(() => {
    setup();
  }, []);

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Image source={images.splashLogo} /> */}
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
  }
  
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
      <Orientation />
    </View>
  );
}

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

const mapDispatchToProps = dispatch => ({
  connectToRippleApi: () => dispatch(connectToRippleApi()),
  getNetInfo: status => dispatch(getNetInfo(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
