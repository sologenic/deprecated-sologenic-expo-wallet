import React, { useState, useEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { connect } from "react-redux";

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
  testTodoReset,
} from "../actions";


function WalletsScreen({
  navigation,
  getMarketData,
  getMarketSevens,
  marketData,
  wallets,
}) {

  useEffect(() => {
    getMarketData();
    getMarketSevens();
    // return () => {
    //   testTodoReset();
    // }
  }, []);
  console.log("wallets", wallets)
  return (
    <View style={styles.container}>
      <Custom_Header
        left={<View />}
        center={<Custom_HeaderTitle text="Your Wallets" />}
        right={
          <Custom_HeaderButton
            onPress={() => {
              navigation.navigate({
                routeName: "SettingsScreen",
                key: "SettingsScreen"
              });
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
            {wallets.map(item => {
              return (
                <View style={{ marginBottom: 20  }}>
                  <WalletCard
                    navigation={navigation}
                    // nickname={item.nickname}
                    // details={item.details}
                    // balance={item.balance}
                    // transactions={item.transactions}
                    defaultCurrency="usd"
                    // walletAddress={item.walletAddress}
                    // rippleClassicAddress={item.rippleClassicAddress}
                    wallet={item}
                  />
                </View>
              )
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
        {/* <View style={styles.section}>
          <WalletCard
            navigation={navigation}
            nickname="Elegant Dinosaur"
            totalBalance="$5.04"
            tokenizedAssets={0}
            defaultCurrency="usd"
          />
        </View> */}
      </ScrollView>
      <View style={styles.footer}>
        <Custom_IconButton
          icon="md-add"
          color={Colors.text}
          onPress={() => {
            navigation.navigate({
              routeName: "AddWalletScreen",
              key: "AddWalletScreen"
            });
          }}
        />
      </View>
    </View>
  );
}

WalletsScreen.navigationOptions = {
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
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginHorizontal: 20,
    marginVertical: 50
  }
});

const mapStateToProps = ({
  marketData,
  wallets,
}) => ({
  marketData,
  wallets,
});

const mapDispatchToProps = dispatch => ({
  getMarketData: () => dispatch(getMarketData()),
  getMarketSevens: () => dispatch(getMarketSevens()),
  testTodoReset: () => dispatch(testTodoReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletsScreen);
