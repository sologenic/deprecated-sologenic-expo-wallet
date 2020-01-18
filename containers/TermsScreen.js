import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { connect } from "react-redux";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Colors from "../constants/Colors";
import Custom_RadioButton from "../components/shared/Custom_RadioButton";
import { updateIsOrientationComplete } from "../actions";
import { borderWidth, screenWidth } from "../constants/Layout";
import Custom_Button from "../components/shared/Custom_Button";

function TermsScreen({ navigation, completeOrientation }) {
  handleOpenWithWebBrowser = url => {
    WebBrowser.openBrowserAsync(url);
  };
  const [isActive, setIsActive] = useState(false);
  return (
    <View style={styles.container}>
      <Custom_Header
        left={
          <Custom_HeaderButton
            onPress={() => {
              navigation.goBack();
            }}
            type="icon"
            icon="md-arrow-back"
            iconColor={Colors.text}
          />
        }
        center={<Custom_HeaderTitle text="Terms & Conditions" />}
        right={<View />}
      />
      <View
        style={{
          flex: 8,
          marginHorizontal: 15,
          borderBottomWidth: borderWidth,
          borderColor: Colors.borderColor,
        }}
      >
        <ScrollView>
          <View style={{ height: 15, width: screenWidth }} />
          <Custom_Text
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            style={{ marginBottom: 20 }}
          />
        </ScrollView>
      </View>
      <View
        style={{
          flex: 2,
          marginTop: 20,
          marginHorizontal: 15,
        }}
      >
        <Custom_Text
          value="I have read and agree to the terms and conditions of use as outlined above."
          style={{
            textAlign: "center",
            marginRight: 15,
            width: "80%",
            alignSelf: "center",
          }}
          size={14}
        />

        <Custom_RadioButton
          pressed={isActive}
          onPress={() => (!isActive ? setIsActive(true) : setIsActive(false))}
          style={{ position: "absolute", right: 0, top: 6 }}
        />
        <View style={{ alignItems: "flex-end" }}>
          <Custom_Button
            text="Next"
            onPress={() => completeOrientation(true)}
            color={isActive ? Colors.text : Colors.grayText}
            size={14}
            textStyle={{ letterSpacing: 0.24, color: Colors.darkRed }}
            style={{
              marginTop: 15,
              backgroundColor: isActive
                ? Colors.darkRed
                : Colors.headerBackground,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
            disabled={!isActive}
          />
        </View>
      </View>
    </View>
  );
}

TermsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
});

const mapDispatchToProps = dispatch => ({
  completeOrientation: isComplete =>
    dispatch(updateIsOrientationComplete(isComplete)),
});

export default connect(
  null,
  mapDispatchToProps,
)(TermsScreen);
