import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Custom_RadioButton from "../components/shared/Custom_RadioButton";
import Custom_Modal from "../components/shared/Custom_Modal";
import Custom_TextInput from "../components/shared/Custom_TextInput";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";

export default function AddWalletScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Custom_Header
        left={
          <Custom_HeaderButton
            onPress={() => {
              console.log("Press!!");
              navigation.goBack();
            }}
            type="icon"
            icon="md-close"
            iconColor={Colors.text}
          />
        }
        center={<View />}
        right={<View />}
        color="transparent"
      />
      <View style={styles.footer}>
        <View style={styles.iconButtonContainer}>
          <Custom_IconButton
            icon="md-add"
            color={Colors.text}
            text="Create New Wallet"
            onPress={() => {
              navigation.navigate({
                routeName: "CreateNewWalletScreen",
                key: "CreateNewWalletScreen",
              });
            }}
            style={{ paddingTop: 2 }}
          />
        </View>
        <View style={styles.iconButtonContainer}>
          <Custom_IconButton
            icon="md-download"
            color={Colors.text}
            text="I Already Have A Wallet"
            onPress={() => {
              navigation.navigate({
                routeName: "ImportExistingWalletScreen",
                key: "ImportExistingWalletScreen",
              });
            }}
          />
        </View>
        <View style={styles.closeButtonContainer}>
          <Custom_IconButton
            icon="ios-arrow-down"
            color={Colors.text}
            style={{ height: 48, width: 48, borderRadius: 24, paddingTop: 4 }}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
}

AddWalletScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkerGray,
  },
  iconButtonContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  closeButtonContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginVertical: 10,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginHorizontal: 20,
    marginVertical: 50,
  },
});
