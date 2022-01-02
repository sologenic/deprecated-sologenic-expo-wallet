import React, { useEffect } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

import Custom_Text from "../components/shared/Custom_Text";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import { formatWalletTotalBalance, formatBalance } from "../utils";
import { getBalance } from "../actions";

function WalletCard({
  navigation,
  wallet,
  baseCurrency,
  marketData,
  soloData,
  getBalance,
}) {
  const { nickname, balance, walletAddress, id, trustline } = wallet;
  const { xrp, solo, tokenizedAssets } = balance;
  const soloMarketPrice = soloData ? soloData[baseCurrency.value] : "";
  const xrpBalanceInFiat =
    marketData && marketData.last ? xrp * marketData.last : "";
  const soloBalanceInFiat = soloMarketPrice ? solo * soloMarketPrice : "";
  const totalBalance =
    xrp === 0 && solo === 0
      ? 0
      : xrpBalanceInFiat
      ? formatWalletTotalBalance(xrpBalanceInFiat + soloBalanceInFiat)
      : "";
  useEffect(() => {
    fetchBalance();
    const getBalanceInterval = setInterval(() => {
      fetchBalance();
    }, 10000);

    return () => {
      clearInterval(getBalanceInterval);
    };
  }, []);

  const fetchBalance = () => {
    getBalance(id, walletAddress);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate({
            routeName: "WalletScreen",
            key: "WalletName",
            params: {
              navigation,
              walletAddress,
              nickname,
            },
          });
        }}
        activeOpacity={0.5}
        style={styles.upperStyle}
      >
        <View style={{ position: "absolute", left: 15, top: 18 }}>
          <View
            style={{
              backgroundColor: Colors.lighterGray,
              height: 12,
              width: 12,
              borderRadius: 6,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginLeft: 40, marginTop: 15 }}>
          <View
            style={{
              flex: 10,
              justifyContent: "center",
              alignItems: "flex-start",
              // paddingLeft: 5,
            }}
          >
            <Custom_Text
              value={nickname}
              size={Fonts.size.medium}
              numberOfLines={1}
              isBold
            />
          </View>
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 2 }}
          >
            <Ionicons name="ios-arrow-forward" size={16} color={Colors.text} />
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 40 }}>
          {/* <View style={{ flex: 1 }} /> */}
          <View
            style={{
              flex: 6,
            }}
          >
            <Custom_Text
              value="Total Balance:"
              size={Fonts.size.small}
              color={Colors.lighterGray}
              isBold
            />
            <Custom_Text
              value="Tokenized Assets:"
              size={Fonts.size.small}
              color={Colors.lighterGray}
              isBold
            />
          </View>
          <View style={{ flex: 6 }}>
            {totalBalance || totalBalance === 0 ? (
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 5, flexDirection: "row" }}>
                  <Custom_Text
                    value={`${baseCurrency.symbol}`}
                    numberOfLines={1}
                    size={Fonts.size.small}
                    isBold
                  />
                  <Custom_Text
                    value={`${
                      totalBalance === 0
                        ? totalBalance.toFixed(2)
                        : String(totalBalance)
                    }`}
                    size={Fonts.size.small}
                    numberOfLines={1}
                    isBold
                  />
                </View>
                <View>
                  <Custom_Text
                    value={`${baseCurrency.label}`}
                    size={Fonts.size.small}
                    color={Colors.lighterGray}
                    isBold
                  />
                </View>
              </View>
            ) : (
              <View>
                <Custom_Text
                  value="Your device is offline"
                  size={Fonts.size.small}
                  numberOfLines={1}
                  isBold
                />
              </View>
            )}
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
            <Image source={Images.xrp} style={{ marginBottom: 5 }} />
            {/* <Image source={Images.xrp} /> */}
            {xrp === 0 ? (
              <Custom_Text value="Not activated" size={Fonts.size.normal} />
            ) : (
              <View style={{ flexDirection: "row", paddingTop: 5 }}>
                <View style={{ marginRight: 5 }}>
                  <Custom_Text
                    value={`${formatBalance(xrp)}`}
                    size={Fonts.size.normal}
                    isBold
                  />
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
            )}
            {/* {wallet.isActive ? (
              <View style={{ flexDirection: "row", paddingTop: 5 }}>
                <View style={{ marginRight: 5 }}>
                  <Custom_Text
                    value={`${xrp}`}
                    size={Fonts.size.normal}
                    isBold
                  />
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
            ) : (
              <View style={{ paddingTop: 5 }}>
                <Custom_Text value="Not activated" />
              </View>
            )} */}
          </View>
          <View
            style={{ width: 1, height: 88, backgroundColor: Colors.gray }}
          />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image source={Images.solo} style={{ marginBottom: 5 }} />
            {!trustline ? (
              <Custom_Text value="Not activated" size={Fonts.size.normal} />
            ) : (
              <View style={{ flexDirection: "row", paddingTop: 5 }}>
                <View style={{ marginRight: 5 }}>
                  <Custom_Text
                    value={`${formatBalance(solo)}`}
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
            )}
            {/* {wallet.trustline ? (
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
            ) : (
              <View style={{ paddingTop: 5 }}>
                <Custom_Text value="Not activated" />
              </View>
            )} */}
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

const mapDispatchToProps = dispatch => ({
  getBalance: (id, address) => dispatch(getBalance(id, address)),
});

export default connect(
  null,
  mapDispatchToProps,
)(WalletCard);
