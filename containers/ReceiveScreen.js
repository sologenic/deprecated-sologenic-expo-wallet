import React, { useState, useEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import { generateQRCode } from "../utils";

export default function ReceiveScreen({ navigation }) {
  const {
    balance,
    currency,
    // defaultCurrency,
    walletAddress,
  } = navigation.state.params;
  const uri = generateQRCode(walletAddress);
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
        center={
          <Custom_HeaderTitle text={`Receive ${currency.toUpperCase()}`} />
        }
        right={<View />}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 33,
        }}
      >
        <View style={{ paddingRight: 10 }}>
          <Image source={Images[currency]} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ paddingRight: 7.5 }}>
            <Custom_Text value={`${balance}`} size={Fonts.size.h5} isBold />
          </View>
          <View>
            <Custom_Text
              value={`${currency.toUpperCase()}`}
              size={Fonts.size.h5}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
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
              onPress={() => {}}
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          marginVertical: 33,
          marginHorizontal: 33,
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingRight: 5,
            paddingTop: 2,
          }}
        >
          <AntDesign
            name="exclamationcircle"
            size={Fonts.size.small}
            color={Colors.text}
          />
        </View>
        <View
          style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
        >
          <Custom_Text
            value={`Sending ${currency.toUpperCase()} to any other address than the one shown will result in your ${currency.toUpperCase()} to be lost forever. Please make sure you double check the copied address.`}
            size={Fonts.size.small}
          />
        </View>
      </View>
    </View>
  );
}

ReceiveScreen.navigationOptions = {
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
