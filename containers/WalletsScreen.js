import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import WalletCard from "./WalletCard";
import {
  getMarketData,
  getMarketSevens,
  getBalance,
  getSoloData,
  getNetInfo
} from "../actions";
import { screenWidth, headerHeight } from "../constants/Layout";

function WalletsScreen({
  navigation,
  getMarketData,
  getSoloData,
  getMarketSevens,
  getBalance,
  marketData,
  soloData,
  wallets,
  baseCurrency,
  getNetInfo,
  netinfo,
  screenProps: { rootNavigation },
  // getMarketDataPending,
  // getSoloDataPending,
  // getMarketSevenPending
}) {
  useEffect(() => {
    if (netinfo || netinfo === null) {
      fetchData();
      fetchAllWalletBalances();
    }
  }, [netinfo]);

  useEffect(() => {
    fetchData();
    const getMarketDataInterval = setInterval(() => {
      fetchData();
    }, 30000);
    if (!netinfo) {
      clearInterval(getMarketDataInterval);
    }

    return () => {
      clearInterval(getMarketDataInterval);
    };
  }, [baseCurrency, wallets, netinfo]);

  const fetchData = () => {
    getMarketData(baseCurrency.value);
    getSoloData(baseCurrency.value);
    getMarketSevens();
  };

  const fetchAllWalletBalances = () => {
    for (let i = 0; i < wallets.length; i += 1) {
      getBalance(wallets[i].id, wallets[i].walletAddress);
    }
  };

  return (
    <View style={styles.container}>
      <Custom_Header
        center={<Custom_HeaderTitle text="Your Wallets" />}
        right={
          <Custom_HeaderButton
            onPress={() => {
              if (navigation) {
                navigation.navigate({
                  routeName: "SettingsScreen",
                  key: "SettingsScreen"
                });
              } else {
                rootNavigation.navigate({
                  routeName: "SettingsScreen",
                  key: "SettingsScreen"
                });
              }
            }}
            type="icon"
            icon="md-settings"
            iconColor={Colors.text}
          />
        }
      />
      <ScrollView>
        {wallets.length > 0 ? (
          <View style={styles.section}>
            {wallets.map((item, index) => {
              return (
                <View key={index} style={{ marginBottom: 20 }}>
                  <WalletCard
                    navigation={navigation ? navigation : rootNavigation}
                    baseCurrency={baseCurrency}
                    wallet={item}
                    key={index}
                    marketData={marketData}
                    soloData={soloData}
                  />
                </View>
              );
            })}
          </View>
        ) : (
          <View
            style={[
              styles.section,
              { justifyContent: "center", alignItems: "center" }
            ]}
          >
            <Custom_Text
              value="No Wallets Added"
              size={Fonts.size.large}
              color={Colors.text}
            />
          </View>
        )}
        {/* {netinfo ? (
            !marketData || !soloData ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <ActivityIndicator size="small" color={Colors.darkRed} />
              </View>
            ) : wallets.length > 0 ? (
              <View style={styles.section}>
                {wallets.map((item, index) => {
                  return (
                    <View key={index} style={{ marginBottom: 20 }}>
                      <WalletCard
                        navigation={navigation ? navigation : rootNavigation}
                        baseCurrency={baseCurrency}
                        wallet={item}
                        key={index}
                        marketData={marketData}
                        soloData={soloData}
                      />
                    </View>
                  );
                })}
              </View>
            ) : (
              <View
                style={[
                  styles.section,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <Custom_Text
                  value="No Wallets Added"
                  size={Fonts.size.large}
                  color={Colors.text}
                />
              </View>
            )
          ) : wallets.length > 0 ? (
            <View style={styles.section}>
              {wallets.map((item, index) => {
                return (
                  <View key={index} style={{ marginBottom: 20 }}>
                    <WalletCard
                      navigation={navigation ? navigation : rootNavigation}
                      baseCurrency={baseCurrency}
                      wallet={item}
                      key={index}
                      marketData={marketData}
                      soloData={soloData}
                    />
                  </View>
                );
              })}
            </View>
          ) : (
            <View
              style={[
                styles.section,
                { justifyContent: "center", alignItems: "center" },
              ]}
            >
              <Custom_Text
                value="No Wallets Added"
                size={Fonts.size.large}
                color={Colors.text}
              />
            </View>
          )} */}
        <View style={{ height: 100, width: screenWidth }} />
      </ScrollView>
      <Custom_IconButton
        icon="md-add"
        color={Colors.text}
        onPress={() => {
          if (navigation) {
            navigation.navigate({
              routeName: "AddWalletScreen",
              key: "AddWalletScreen"
            });
          } else {
            rootNavigation.navigate({
              routeName: "AddWalletScreen",
              key: "AddWalletScreen"
            });
          }
        }}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          paddingTop: 2,
          position: "absolute",
          right: 20,
          bottom: 30,
          zIndex: 3
        }}
      />
    </View>
    // </View>
  );
}

WalletsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    zIndex: 2
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20
  },
  footer: {
    flex: 1,
    position: "absolute",
    bottom: 0
  },
  gradient: {
    height: 100,
    width: screenWidth,
    zIndex: 1
  }
});

const mapStateToProps = ({
  marketData,
  wallets,
  baseCurrency,
  soloData,
  netinfo,
  getMarketDataPending,
  getSoloDataPending,
  getMarketSevenPending
}) => ({
  marketData,
  wallets,
  baseCurrency,
  soloData,
  netinfo,
  getMarketDataPending,
  getSoloDataPending,
  getMarketSevenPending
});

const mapDispatchToProps = dispatch => ({
  getMarketData: baseCurrency => dispatch(getMarketData(baseCurrency)),
  getSoloData: baseCurrency => dispatch(getSoloData(baseCurrency)),
  getMarketSevens: () => dispatch(getMarketSevens()),
  getBalance: (id, address) => dispatch(getBalance(id, address)),
  connectToRippleApi: () => dispatch(connectToRippleApi()),
  getNetInfo: status => dispatch(getNetInfo(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletsScreen);
