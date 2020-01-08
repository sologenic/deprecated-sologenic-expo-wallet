import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
export default function LinksScreen() {
  const [pressed, handlePressDots] = useState(false);
  return (
    <View style={styles.container}>
      {/* <MenuProvider> */}
        <Custom_Header
          left={
            <Custom_HeaderButton
              onPress={() => {
                console.log("Press!!");
              }}
              type="icon"
              icon="md-arrow-back"
              iconColor={Colors.text}
            />
          }
          center={<Custom_HeaderTitle text="Your Recovery Phrase" />}
          right={
            <Menu onSelect={value => alert(`Selected number: ${value}`)}>
              <MenuTrigger
                children={
                  <View style={{ paddingHorizontal: 15 }}>
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={30}
                      color={Colors.text}
                    />
                  </View>
                }
              />
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    width: 170,
                    backgroundColor: Colors.background,
                    borderWidth: 0.5,
                    borderColor: Colors.grayText,
                    padding: 5,
                    marginTop: headerHeight
                  }
                }}
              >
                <MenuOption value={1}>
                  <Custom_Text
                    value="Change Wallet Nickname"
                    size={Fonts.size.small}
                    color={Colors.text}
                  />
                </MenuOption>
                <View
                  style={{
                    height: 0.4,
                    backgroundColor: Colors.grayText,
                    marginHorizontal: 3,
                    marginVertical: 2
                  }}
                />
                <MenuOption value={2}>
                  <Custom_Text
                    value="Delete Wallet"
                    size={Fonts.size.small}
                    color={Colors.text}
                  />
                </MenuOption>
              </MenuOptions>
            </Menu>
          }
        />
        <ScrollView>
          {/* <View style={styles.section}>
            <Custom_Text
              value="To ensure that you have compiled with the steps as instructed, please enter the missing info of your given Recovery"
              size={Fonts.size.normal}
              color={Colors.text}
            />
          </View> */}
          <View style={styles.section}>
            <Custom_Text
              value="The sequence of words below is your Recovery Phrase. You need this to regain access to your XRP. You should never share this with anyone"
              size={Fonts.size.normal}
              color={Colors.text}
            />
          </View>
          <View style={styles.section}>
            <RecoveryPhrase
              phrase={[
                "tree", "disco", "eleven", "night", "treehouse", "cone",
                "trash", "ticket", "lamb", "part", "pickles", "nice",
              ]}
            />
          </View>
          <View style={[styles.section, { justifyContent: "center", alignItems: "center" }]}>
            <View style={{ flexDirection: "row" }}>
              <Custom_Button
                text="Copy"
                onPress={() => {
                  console.log("Press Next");
                }}
                style={{ height: 40, width: 80, backgroundColor: 'transparent' }}
                icon="content-copy"
                isBold={false}
              />
              <Custom_Button
                text="Share"
                onPress={() => {
                  console.log("Press Next");
                }}
                style={{ height: 40, width: 80, backgroundColor: 'transparent' }}
                icon="md-share"
                isBold={false}
              />
            </View>
            <View style={{ flexDirection: "row"}}>
              <Custom_Button
                text="Print"
                onPress={() => {
                  console.log("Press Next");
                }}
                style={{ height: 40, width: 80, backgroundColor: 'transparent' }}
                icon="ios-print"
                color={Colors.text}
                isBold={false}
              />
              <Custom_Button
                text="Show QR"
                onPress={() => {
                  console.log("Press Next");
                }}
                style={{ height: 40, width: 80, backgroundColor: 'transparent' }}
                icon="qrcode"
                color={Colors.text}
                isBold={false}
              />
            </View>
          </View>
          <View style={[styles.section, { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 60, }]}>
            <View style={{ flex: 8.5 }}>
              <Custom_Text 
                value="I have written down my passphrase, and I understand that without it I will not have access to my wallet sshould I lose it." 
                size={Fonts.size.normal}
              />
            </View>
            <View style={{ flex: 1.5, alignItems: "flex-end", }}>
              <Custom_RadioButton
                pressed={pressed}
                onPress={() =>
                  !pressed ? handlePressDots(true) : handlePressDots(false)
                }
              />
            </View>
          </View>
          <View style={[styles.section, { alignItems: "flex-end" }]}>
            <Custom_Button
              text="Next"
              onPress={() => {
                console.log("Press Next");
              }}
              style={{ height: 40, width: 80 }}
              icon="ios-arrow-forward"
              disabled={!pressed}
            />
          </View>
        </ScrollView>
      {/* </MenuProvider> */}
    </View>
  );
}

LinksScreen.navigationOptions = {
  header: null
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
