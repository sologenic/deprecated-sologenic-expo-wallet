import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  RefreshControl,
  Clipboard,
} from "react-native";
import { connect } from "react-redux";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import TransactionCard from "./TransactionCard";
import ActivationSuccessfulModal from "../components/shared/ActivationSuccessfulModal";
import ActivationSoloModal from "../components/shared/ActivatingSoloModal";
import WalletAddressModal from "../components/shared/WalletAddressModal";
import {
  createTrustline,
  getMoreTransactions,
  pullToRefreshBalance,
  createTrustlineReset,
} from "../actions";
import { headerHeight } from "../constants/Layout";
import CopiedModal from "../components/shared/CopiedModal";
import { formatBalance } from "../utils";

function WalletSoloTab({
  navigation,
  currency,
  soloBalance,
  walletAddress,
  soloActive,
  createTrustlineSuccess,
  createTrustlinePending,
  createTrustline,
  createTrustlineReset,
  wallet,
  // defaultCurrency,
  // marketData,
  // marketSevens,
  soloData,
  baseCurrency,
  getTransactionsPending,
  getMoreTransactions,
  getMoreTransactionsPending,
  setTransactionCount,
  transactions,
  transactionCount,
  pullToRefreshBalance,
  pullToRefreshBalancePending,
}) {
  const [activateModalVisible, setActivateModalVisible] = useState(false);
  const [
    activateSuccessfulModalVisible,
    setActivateSuccessfulModalVisible,
  ] = useState(false);
  const [copiedModalVisible, setCopiedModalVisible] = useState(false);
  const [walletAddressModalVisible, setWalletAddressModalVisible] = useState(
    false,
  );
  useEffect(() => {
    if (createTrustlineSuccess) {
      setActivateModalVisible(false);
      setActivateSuccessfulModalVisible(true);
    }
    if (createTrustlinePending) {
      setActivateModalVisible(true);
    }
    return () => {
      setActivateModalVisible(false);
      setActivateSuccessfulModalVisible(false);
    };
  }, [createTrustlineSuccess, createTrustlinePending, isActive]);

  // useEffect(() => {
  //   if (isActive && !isWalletActive) {
  //     setIsWalletActive(true);
  //   }
  // }, [wallet]);

  const { id, isActive, salt, encrypted, details } = wallet;
  const { publicKey } = details.wallet;

  const soloMarketPrice = soloData[baseCurrency.value];
  // const priceChange = getPriceChange(marketData.last, marketData.open);
  // const priceColor = getPriceColor(priceChange);

  const writeToClipboard = async address => {
    await Clipboard.setString(address);
    setCopiedModalVisible(true);
    setTimeout(() => setCopiedModalVisible(false), 2500);
  };

  if (!soloActive) {
    return (
      <ScrollView>
        <View>
          <View style={styles.container}>
            <View style={{ marginTop: 50, marginHorizontal: 45 }}>
              {isActive ? (
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
                  Click below to activate your SOLO wallet. It could take up to
                  10 seconds
                </Text>
              ) : (
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
                  In order to activate your SOLO wallet, you must first send at
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
              )}
            </View>
            <View style={{ marginTop: 8, marginBottom: 30 }}>
              <Custom_Button
                text="Activate"
                onPress={() => {
                  setActivateModalVisible(true);
                  createTrustline({
                    address: walletAddress,
                    id,
                    passphrase: "test",
                    salt,
                    encrypted,
                    publicKey,
                  });
                }}
                style={{
                  height: 40,
                  width: 100,
                  backgroundColor: !isActive
                    ? Colors.headerBackground
                    : Colors.darkRed,
                  borderColor: !isActive ? Colors.grayText : Colors.darkRed,
                  borderWidth: !isActive ? 1 : 0,
                }}
                color={!isActive ? Colors.grayText : Colors.text}
                disabled={!isActive}
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
                style={{ marginBottom: 3 }}
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
        <WalletAddressModal
          data={walletAddress}
          modalVisible={walletAddressModalVisible}
          onClose={() => setWalletAddressModalVisible(false)}
        />
        <ActivationSoloModal
          modalVisible={activateModalVisible}
          onClose={() => setActivateModalVisible(false)}
        />
        <ActivationSuccessfulModal
          modalVisible={activateSuccessfulModalVisible}
          // onClose={() => setActivateSuccessfulModalVisible(false)}
          currency="solo"
          onPress={() => {
            setActivateSuccessfulModalVisible(false);
            createTrustlineReset();
          }}
        />
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={pullToRefreshBalancePending}
            onRefresh={() => {
              pullToRefreshBalance(id, walletAddress);
              getMoreTransactions(walletAddress, transactionCount, "solo");
            }}
            progressViewOffset={headerHeight + 100}
          />
        }
      >
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
                    value={`${formatBalance(soloBalance)}`}
                    size={Fonts.size.h3}
                    isBold
                  />
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
                  alignItems: "center",
                }}
              >
                {/* <View style={{ paddingRight: 5 }}>
                <Custom_Text value={`$${5.04}`} size={Fonts.size.medium} />
              </View>
              <View>
                <Custom_Text
                  value={defaultCurrency.toUpperCase()}
                  size={Fonts.size.medium}
                />
              </View> */}
              </View>
            </View>
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
                    style={{ textAlign: "center" }}
                  />
                  <Custom_Text
                    value={`${baseCurrency.symbol} ${soloMarketPrice}`}
                    size={Fonts.size.medium}
                    style={{ textAlign: "center" }}
                  />
                </View>
                <View>
                  {/* <Custom_Text
                  value={`${-0.61}%`}
                  size={Fonts.size.small}
                  color={Colors.errorBackground}
                /> */}
                </View>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.leftButtonContainer}>
                <Custom_Button
                  text="RECEIVE"
                  onPress={() => {
                    navigation.navigate({
                      routeName: "ReceiveScreen",
                      key: "ReceiveScreen",
                      params: {
                        navigation,
                        balance: soloBalance,
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
                    navigation.navigate({
                      routeName: "SendScreen",
                      key: "SendScreen",
                      params: {
                        navigation,
                        balance: soloBalance,
                        currency: currency.toLowerCase(),
                        walletAddress,
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
          {/* <View style={{ marginLeft: 38, marginBottom: 5 }}>
          <Custom_Text
            value="Recent Transactions"
            size={Fonts.size.small}
            isBold
          />
        </View>
        <View>
          <TransactionCard currency="xrp" amount="1000.00" />
        </View> */}
          <View style={{ marginLeft: 38, marginBottom: 5 }}>
            <Custom_Text
              value="Recent Transactions"
              size={Fonts.size.small}
              isBold
            />
          </View>
          <View>
            {!transactions || (transactions && transactions.length === 0) ? (
              <View style={{ marginTop: 10 }}>
                <Custom_Text
                  value="No recent transactions"
                  style={{ textAlign: "center" }}
                />
              </View>
            ) : !getTransactionsPending && transactions ? (
              <View>
                {transactions.map((item, index) => {
                  if (item.type === "payment") {
                    return (
                      <TransactionCard
                        key={`${item.address}${index}`}
                        transaction={item}
                        walletAddress={id}
                      />
                    );
                  }
                })}
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  {/* transactions.length < transactionsLength */}
                  <TouchableOpacity
                    text="Load More"
                    onPress={() => {
                      // set default tab to wallet tab and reset to default on goBack() event
                      getMoreTransactions(
                        walletAddress,
                        transactionCount + 10,
                        "solo",
                      );
                      setTransactionCount(transactionCount + 10);
                    }}
                  >
                    {getMoreTransactionsPending ? (
                      <ActivityIndicator size="small" color={Colors.grayText} />
                    ) : (
                      <Custom_Text value="Load More" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ marginTop: 15 }}>
                <ActivityIndicator size="small" color={Colors.grayText} />
              </View>
            )}
          </View>
        </View>
        <WalletAddressModal
          data={walletAddress}
          modalVisible={walletAddressModalVisible}
          onClose={() => setWalletAddressModalVisible(false)}
        />
      </ScrollView>
      <CopiedModal showModal={copiedModalVisible} />
    </View>
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

const mapStateToProps = ({
  createTrustlineSuccess,
  createTrustlinePending,
  marketData,
  marketSevens,
  baseCurrency,
  getTransactionsPending,
  transactionsLength,
  getMoreTransactionsPending,
  getBalancePending,
  pullToRefreshBalancePending,
  soloData,
}) => ({
  createTrustlineSuccess,
  createTrustlinePending,
  marketData,
  marketSevens,
  baseCurrency,
  getTransactionsPending,
  transactionsLength,
  getMoreTransactionsPending,
  getBalancePending,
  pullToRefreshBalancePending,
  soloData,
});
const mapDispatchToProps = dispatch => ({
  createTrustline: ({ address, id, passphrase, salt, encrypted, publicKey }) =>
    dispatch(
      createTrustline({ address, id, passphrase, salt, encrypted, publicKey }),
    ),
  getMoreTransactions: (address, limit, walletType) =>
    dispatch(getMoreTransactions(address, limit, walletType)),
  pullToRefreshBalance: (id, address) =>
    dispatch(pullToRefreshBalance(id, address)),
  createTrustlineReset: () => dispatch(createTrustlineReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletSoloTab);
