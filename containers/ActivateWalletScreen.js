import React, { useState, useEffect } from "react";
import {
  Image,
  Platform,
  Clipboard,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import { headerHeight } from "../constants/Layout";
import { generateQRCode } from "../utils";

export default function ActivateWalletScreen({ navigation }) {
  const { currency, walletAddress } = navigation.state.params;
  const uri = generateQRCode(walletAddress);
  const writeToClipboard = async address => {
    await Clipboard.setString(address);
  };
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
        center={
          <Custom_HeaderTitle
            text={`Activate ${currency.toUpperCase()} Wallet`}
          />
        }
        right={
          <Menu onSelect={value => alert(`Selected number: ${value}`)}>
            <MenuTrigger
              children={
                <View style={{ paddingHorizontal: 15 }}>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={24}
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
                  marginTop: headerHeight,
                },
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
                  marginVertical: 2,
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 36,
          backgroundColor: Colors.headerBackground,
        }}
      >
        <Text
          style={{
            fontFamily: "DMSans",
            color: Colors.text,
            fontSize: Fonts.size.small,
            // textAlign: "center"
          }}
          // numberOfLines={2}
          ellipsizeMode="tail"
        >
          Send
          <Text> </Text>
          <Text
            style={{
              fontFamily: "DMSansBold",
              color: Colors.text,
              fontSize: Fonts.size.small,
              textAlign: "center",
            }}
          >
            at least 21 XRP
          </Text>
          <Text> </Text>
          to below address to activate
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        <Image
          source={{ uri }}
          style={{
            width: 200,
            height: 200,
            backgroundColor: Colors.headerBackground,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.walletAddressContainer}>
          <Custom_Text
            value="Wallet Address"
            size={Fonts.size.small}
            color={Colors.grayText}
          />
          <Custom_Text value={walletAddress} size={Fonts.size.small} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ paddingVertical: 2.5 }}>
            <Custom_IconButton
              onPress={() => writeToClipboard(walletAddress)}
              icon="content-copy"
              size={Fonts.size.normal}
              style={{
                height: 20,
                width: 20,
                borderRadius: 0,
                backgroundColor: "transparent",
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

ActivateWalletScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  walletAddressContainer: {
    flex: 9,
    borderRadius: 26,
    borderColor: Colors.headerBackground,
    borderWidth: 1,
    height: 52,
    paddingHorizontal: 26,
    justifyContent: "center",
    marginLeft: 24,
    marginRight: 12,
    marginVertical: 24,
  },
});
