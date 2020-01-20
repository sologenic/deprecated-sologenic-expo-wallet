import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { connect } from "react-redux";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import TransactionCard from "./TransactionCard";
import Why21XRPModal from "../components/shared/Why21XrpModal";
import ActivationSuccessfulModal from "../components/shared/ActivationSuccessfulModal";
import WalletAddressModal from "../components/shared/WalletAddressModal";
import { getPriceChange, getPriceColor, getAddress } from "../utils";
import SevenChart from "../components/shared/SevenChart";

function WalletTab({
  navigation,
  balance,
  currency,
  xrpBalance,
  defaultCurrency,
  walletAddress,
  activate,
  marketData,
  marketSevens,
  wallet,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [activateModalVisible, setActivateModalVisible] = useState(false);
  const [walletAddressModalVisible, setWalletAddressModalVisible] = useState(
    false,
  );
  const priceChange = getPriceChange(marketData.last, marketData.open);
  const priceColor = getPriceColor(priceChange);

  const { id } = wallet;
  console.log("HERE id", id);
  const { privateKey, publicKey } = wallet.details.wallet;
  const keypair = {
    privateKey,
    publicKey,
  };
  console.log("xrp", xrpBalance);
  if (!activate) {
    return (
      <ScrollView>
        <View>
          <View style={styles.container}>
            <View style={{ marginTop: 50, marginHorizontal: 45 }}>
              <Text
                style={{
                  fontFamily: "DMSans",
                  color: Colors.text,
                  fontSize: Fonts.size.small,
                  textAlign: "center",
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                In order to activate your XRP wallet, you must first send at
                least
                <Text> </Text>
                <Text
                  style={{
                    fontFamily: "DMSansBold",
                    color: Colors.text,
                    fontSize: Fonts.size.small,
                    textAlign: "center",
                  }}
                >
                  21 XRP
                </Text>
                <Text> </Text>
                to this address
              </Text>
            </View>
            <View style={{ marginTop: 8, marginBottom: 30 }}>
              <Custom_Button
                text="Activate"
                onPress={() => {
                  console.log("Press Activate");
                  // setActivateModalVisible(true);
                  navigation.navigate({
                    routeName: "ActivateWalletScreen",
                    key: "ActivateWalletScreen",
                    params: {
                      currency: currency.toLowerCase(),
                      walletAddress,
                    },
                  });
                }}
                style={{ height: 40, width: 100 }}
              />
            </View>
            <View>
              <Custom_IconButton
                icon="questioncircle"
                color={Colors.grayText}
                text="Why 21 XRP"
                textSize={Fonts.size.small}
                size={13}
                style={{
                  height: 12,
                  width: 12,
                  backgroundColor: "#FFF",
                }}
                textStyle={{
                  paddingRight: 5,
                }}
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                zIndex: 50,
                opacity: 0.3,
              }}
            >
              <View style={[styles.buttonsContainer, { marginTop: 50 }]}>
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
                      borderColor: Colors.text,
                    }}
                    disabled
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
                    disabled
                  />
                </View>
              </View>
            </View>
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
              <View style={{ paddingVertical: 2.5 }}>
                <Custom_IconButton
                  onPress={() => {
                    setWalletAddressModalVisible(true);
                  }}
                  icon="qrcode"
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
        <Why21XRPModal
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <ActivationSuccessfulModal
          modalVisible={activateModalVisible}
          onClose={() => setActivateModalVisible(false)}
          currency="xrp"
        />
        <WalletAddressModal
          data={walletAddress}
          modalVisible={walletAddressModalVisible}
          onClose={() => setWalletAddressModalVisible(false)}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView>
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
                alignItems: "center",
              }}
            >
              <View style={{ paddingRight: 10 }}>
                <Custom_Text
                  value={`${xrpBalance}`}
                  size={Fonts.size.h3}
                  isBold
                />
              </View>
              <View>
                <Custom_Text value={currency} size={Fonts.size.h4} />
              </View>
            </View>
          </View>
          {/* <View>
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
          </View> */}
          <View style={styles.marketInfoContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ paddingRight: 15 }}>
                <Custom_Text
                  value="Market Price:"
                  size={Fonts.size.medium}
                  color={Colors.lightGray}
                />
                <Custom_Text
                  value={`${defaultCurrency.symbol} ${marketData.last}`}
                  size={Fonts.size.medium}
                />
              </View>
              <View>
                <SevenChart marketSevens={marketSevens} color={priceColor} />
                <Custom_Text
                  value={`${priceChange}`}
                  size={Fonts.size.small}
                  // color={Colors.errorBackground}
                  color={priceColor}
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
                  navigation.navigate({
                    routeName: "ReceiveScreen",
                    key: "ReceiveScreen",
                    params: {
                      navigation,
                      balance: xrpBalance,
                      currency: currency.toLowerCase(),
                      walletAddress,
                    },
                  });
                }}
                size={Fonts.size.large}
                style={{
                  height: 40,
                  backgroundColor: Colors.headerBackground,
                  borderWidth: 0.5,
                  borderColor: Colors.text,
                }}
              />
            </View>
            <View style={styles.rightButtonContainer}>
              <Custom_Button
                text="SEND"
                onPress={() => {
                  console.log("Press SEND");
                  navigation.navigate({
                    routeName: "SendScreen",
                    key: "SendScreen",
                    params: {
                      navigation,
                      balance: xrpBalance,
                      currency: currency.toLowerCase(),
                      walletAddress,
                      keypair,
                      id,
                      wallet,
                    },
                  });
                }}
                size={Fonts.size.large}
                style={{ height: 40 }}
              />
            </View>
          </View>
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
            <View style={{ paddingVertical: 2.5 }}>
              <Custom_IconButton
                onPress={() => {
                  setWalletAddressModalVisible(true);
                }}
                icon="qrcode"
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
        <View style={{ marginLeft: 38, marginBottom: 5 }}>
          <Custom_Text
            value="Recent Transactions"
            size={Fonts.size.small}
            isBold
          />
        </View>
        <View>
          <TransactionCard currency="xrp" amount="1000.00" />
        </View>
      </View>
      <WalletAddressModal
        data={walletAddress}
        modalVisible={walletAddressModalVisible}
        onClose={() => setWalletAddressModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginTop: 20,
  },
  marketInfoContainer: {
    marginVertical: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 24,
    marginHorizontal: 24,
  },
  leftButtonContainer: {
    flex: 1,
    marginRight: 10,
  },
  rightButtonContainer: {
    flex: 1,
    marginLeft: 10,
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

const mapStateToProps = ({ marketData, marketSevens, baseCurrency }, props) => {
  return {
    marketData,
    marketSevens: marketSevens ? marketSevens[`xrp${baseCurrency.value}`] : {},
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletTab);
