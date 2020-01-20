import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Custom_Text from "../components/shared/Custom_Text";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";

export default function WalletCard({
  navigation,
  // nickname,
  // totalBalance,
  // tokenizedAssets,
  // balance,
  // details,
  defaultCurrency,
  // walletAddress,
  // rippleClassicAddress,
  wallet,
  baseCurrency,
}) {
  const { nickname, balance } = wallet;
  const { xrp, solo, tokenizedAssets } = balance;
  const totalBalance = 0;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate({
            routeName: "WalletScreen",
            key: "WalletName",
            params: {
              navigation,
              wallet,
              // totalBalance,
              // tokenizedAssets,
              defaultCurrency,
              xrpBalance: "21.00",
              soloBalance: "0.00",
              nickname,
            },
          });
        }}
        activeOpacity={0.5}
        style={styles.upperStyle}
      >
        <View
          style={{ flexDirection: "row", marginHorizontal: 12, marginTop: 15 }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: Colors.lighterGray,
                height: 24,
                width: 24,
                borderRadius: 12,
              }}
            />
          </View>
          <View
            style={{
              flex: 8,
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: 12,
            }}
          >
            <Custom_Text value={nickname} size={Fonts.size.medium} isBold />
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons name="ios-arrow-forward" size={16} color={Colors.text} />
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <View
            style={{
              flex: 1,
              paddingLeft: 47,
            }}
          >
            <Custom_Text
              value="Total Balance:"
              size={Fonts.size.small}
              color={Colors.lighterGray}
              isBold
            />
            <Custom_Text
              value="Toknized Assets:"
              size={Fonts.size.small}
              color={Colors.lighterGray}
              isBold
            />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginRight: 5, flexDirection: "row" }}>
                <Custom_Text
                  // value={`${baseCurrency.symbol}`}
                  value={`$`}
                  size={Fonts.size.small}
                  isBold
                />
                <Custom_Text
                  value={`${totalBalance}`}
                  size={Fonts.size.small}
                  isBold
                />
              </View>
              <View>
                <Custom_Text
                  // value={`${baseCurrency.label}`}
                  value={`${defaultCurrency}`}
                  size={Fonts.size.small}
                  color={Colors.lighterGray}
                  isBold
                />
              </View>
            </View>
            <Custom_Text
              value={`${tokenizedAssets}`}
              size={Fonts.size.small}
              isBold
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.lowerStyle}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image source={Images.xrp} />
            <View style={{ flexDirection: "row", paddingTop: 5 }}>
              <View style={{ marginRight: 5 }}>
                <Custom_Text value={`${xrp}`} size={Fonts.size.normal} isBold />
              </View>
              <View>
                <Custom_Text
                  value="XRP"
                  size={Fonts.size.normal}
                  color={Colors.lighterGray}
                  isBold
                />
              </View>
            </View>
          </View>
          <View
            style={{ width: 1, height: 88, backgroundColor: Colors.gray }}
          />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image source={Images.solo} />
            <View style={{ flexDirection: "row", paddingTop: 5 }}>
              <View style={{ marginRight: 5 }}>
                <Custom_Text
                  value={`${solo}`}
                  size={Fonts.size.normal}
                  isBold
                />
              </View>
              <View>
                <Custom_Text
                  value="SOLO"
                  size={Fonts.size.normal}
                  color={Colors.lighterGray}
                  isBold
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 176,
  },
  upperStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 88,
    backgroundColor: Colors.gray,
  },
  lowerStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 88,
    backgroundColor: Colors.headerBackground,
    justifyContent: "center",
  },
});
