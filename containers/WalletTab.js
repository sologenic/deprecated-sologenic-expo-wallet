import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from "react-native";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Custom_Modal from "../components/shared/Custom_Modal";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

export default function WalletTab({
  navigation,
  balance,
  currency,
  xrpBalance,
  soloBalance,
  defaultCurrency
}) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.section}>
          <Custom_Text
            value="Your Balance:"
            size={Fonts.size.medium}
            color={Colors.lightGray}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={{ paddingRight: 10 }}>
              <Custom_Text value={xrpBalance} size={Fonts.size.h3} isBold />
            </View>
            <View>
              <Custom_Text value={currency} size={Fonts.size.h4} />
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={{ paddingRight: 5 }}>
              <Custom_Text value={`$${5.04}`} size={Fonts.size.medium} />
            </View>
            <View>
              <Custom_Text
                value={defaultCurrency.toUpperCase()}
                size={Fonts.size.medium}
              />
            </View>
          </View>
        </View>
        <View style={styles.marketInfoContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={{ paddingRight: 15 }}>
              <Custom_Text
                value="Market Price:"
                size={Fonts.size.medium}
                color={Colors.lightGray}
              />
              <Custom_Text value={`$${5.04}`} size={Fonts.size.medium} />
            </View>
            <View>
              <Custom_Text
                value={`${-0.61}%`}
                size={Fonts.size.small}
                color={Colors.errorBackground}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.leftButtonContainer}>
            <Custom_Button
              text="RECEIVE"
              onPress={() => {
                console.log("Press RECEIVE");
              }}
              size={Fonts.size.large}
              style={{
                height: 40,
                backgroundColor: Colors.headerBackground,
                borderWidth: 0.5,
                borderColor: Colors.text
              }}
            />
          </View>
          <View style={styles.rightButtonContainer}>
            <Custom_Button
              text="SEND"
              onPress={() => {
                console.log("Press SEND");
              }}
              size={Fonts.size.large}
              style={{ height: 40 }}
            />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: "center" }}>
        <View style={styles.walletAddressContainer}>
          <Custom_Text
            value="Wallet Address"
            size={Fonts.size.small}
            color={Colors.grayText}
          />
          <Custom_Text
            value="r4K9RYkqsaDvdPeAeAMDXfjjIH76vUI6gdi47Uh"
            size={Fonts.size.small}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ paddingVertical: 2.5 }}>
            <Custom_IconButton
              onPress={() => {}}
              icon="content-copy"
              size={Fonts.size.normal}
              style={{ height: 20, width: 20, borderRadius: 0, backgroundColor: "transparent" }}
            />
          </View>
          <View style={{ paddingVertical: 2.5 }}>
            <Custom_IconButton
              onPress={() => {}}
              icon="qrcode"
              size={Fonts.size.normal}
              style={{ height: 20, width: 20, borderRadius: 0, backgroundColor: "transparent" }}
            />
          </View>
        </View>
      </View>
      <View style={{ marginLeft: 38 }}>
        <Custom_Text value="Recent Transactions" size={Fonts.size.small} isBold/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
    justifyContent: "center",
    alignItems: "center"
  },
  section: {
    marginTop: 20
  },
  marketInfoContainer: {
    marginVertical: 24
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 24,
    marginHorizontal: 24
  },
  leftButtonContainer: {
    flex: 1,
    marginRight: 10
  },
  rightButtonContainer: {
    flex: 1,
    marginLeft: 10
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
  }
});
