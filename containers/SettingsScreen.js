import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Custom_RadioButton from "../components/shared/Custom_RadioButton";
import Custom_Modal from "../components/shared/Custom_Modal";
import Custom_TextInput from "../components/shared/Custom_TextInput";
import RecoveryPhrase from "../components/shared/RecoveryPhrase";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import { headerHeight } from "../constants/Layout";

export default function SettingsScreen({ navigation }) {
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
              icon="md-arrow-back"
              iconColor={Colors.text}
            />
          }
          center={<Custom_HeaderTitle text="Settings" />}
          right={<View/>}
        />
        <ScrollView>
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
    backgroundColor: Colors.background
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20
  }
});
