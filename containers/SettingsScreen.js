import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Colors from "../constants/Colors";
import Custom_NavButton from "../components/shared/Custom_NavButton";

const config = Constants.manifest.extra.config;

export default function SettingsScreen({ navigation }) {
  handleOpenWithWebBrowser = url => {
    WebBrowser.openBrowserAsync(url);
  };
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
        center={<Custom_HeaderTitle text="Settings" />}
        right={<View />}
      />
      <ScrollView>
        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <Custom_Text
            value="Security"
            style={{ marginLeft: 15, marginBottom: 10 }}
            isBold
          />
          <Custom_NavButton
            value="Change PIN"
            handleOnPress={() => {
              navigation.navigate({
                key: "ChangePinScreen",
                routeName: "ChangePinScreen",
              });
            }}
          />
          <Custom_NavButton
            value="Enable / Disable Face ID / Fingerprint"
            handleOnPress={() => {
              navigation.navigate({
                key: "ChangePinScreen",
                routeName: "ChangePinScreen",
              });
            }}
          />
        </View>
        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <Custom_Text
            value="Legal"
            style={{ marginLeft: 15, marginBottom: 10 }}
            isBold
          />
          <Custom_NavButton
            value="Terms & Conditions"
            handleOnPress={() => {
              handleOpenWithWebBrowser(config.termsUrl);
            }}
          />
          <Custom_NavButton
            value="Privacy Policy"
            handleOnPress={() => {
              handleOpenWithWebBrowser(config.privacyUrl);
            }}
          />
        </View>
        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <Custom_Text
            value="Support"
            style={{ marginLeft: 15, marginBottom: 10 }}
            isBold
          />
          <Custom_NavButton
            value="Contact Us"
            handleOnPress={() => {
              handleOpenWithWebBrowser(config.contactUsUrl);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

SettingsScreen.navigationOptions = {
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
