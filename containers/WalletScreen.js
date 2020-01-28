import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import P from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import { headerHeight } from "../constants/Layout";
import WalletTab from "./WalletTab";
import WalletSoloTab from "./WalletSoloTab";
import WalletTokenizedAssetTab from "./WalletTokenizedAssetTab";
import DeleteWalletModal from "../components/shared/DeleteWalletModal";
import {
  deleteWallet,
  getBalance,
  getTransactions,
  activateWallet,
  clearTransactions,
  setWallet,
  resetWallet,
} from "../actions";

const propTypes = {
  wallet: P.shape({
    id: P.string,
    nickname: P.string,
    details: P.shape({}),
    balance: P.shape({}),
    walletAddress: P.string,
    rippleClassicAddress: P.string,
    transactions: P.array,
  }),
};

const defaultProps = {
  wallet: {
    id: "",
    nickname: "",
    details: {
      wallet: {
        id: "",
      },
    },
    balance: {
      xrp: "",
      solo: "",
      tokenizedAssets: "",
    },
    walletAddress: "",
    rippleClassicAddress: "",
    transactions: [],
  },
};

function WalletScreen({
  navigation,
  deleteWallet,
  getBalance,
  getTransactions,
  activateWallet,
  transactions,
  clearTransactions,
  defaultCurrency,
  wallet,
  setWallet,
  resetWallet,
  soloTransactions,
}) {
  const [tab, handleTabView] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionCount, setTransactionCount] = useState(5);
  const { walletAddress } = navigation.state.params;
  const { id, balance, nickname, rippleClassicAddress, trustline } = wallet;
  const { xrp, solo, tokenizedAssets } = balance;

  useEffect(() => {
    setWallet(walletAddress);
    if (walletAddress && walletAddress !== "") {
      fetchData();
    }
    getTransactions(walletAddress, transactionCount, "xrp");
    return () => {
      resetWallet();
    };
  }, [defaultCurrency, wallet]);

  const fetchData = () => {
    getBalance(walletAddress, walletAddress);
  };

  return (
    <View style={styles.container}>
      <Custom_Header
        left={
          <Custom_HeaderButton
            onPress={() => {
              clearTransactions();
              resetWallet();
              navigation.goBack();
            }}
            type="icon"
            icon="md-arrow-back"
            iconColor={Colors.text}
          />
        }
        center={<Custom_HeaderTitle text={nickname} />}
        right={
          <Menu
            onSelect={value => {
              if (value === 2) {
                setModalVisible(true);
              } else {
                navigation.navigate({
                  routeName: "ChangeWalletNicknameScreen",
                  key: "ChangeWalletNicknameScreen",
                  params: {
                    id: wallet.id,
                  },
                });
              }
            }}
          >
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
        color={Colors.background}
      />
      {/* <View> */}
      <View
        style={{
          flexDirection: "row",
          height: 50,
          backgroundColor: Colors.headerBackground,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleTabView(1);
          }}
          style={[
            {
              flex: 33.33,
              justifyContent: "center",
              alignItems: "center",
            },
            tab === 1
              ? {
                  borderBottomColor: Colors.text,
                  borderBottomWidth: 2,
                }
              : {},
          ]}
        >
          <Image source={Images.xrpSmall} height={24} width={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleTabView(2);
          }}
          style={[
            {
              flex: 33.33,
              justifyContent: "center",
              alignItems: "center",
            },
            tab === 2
              ? {
                  borderBottomColor: Colors.text,
                  borderBottomWidth: 2,
                }
              : {},
          ]}
        >
          <Image source={Images.soloSmall} height={24} width={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleTabView(3);
          }}
          style={[
            {
              flex: 33.33,
              justifyContent: "center",
              alignItems: "center",
            },
            tab === 3
              ? {
                  borderBottomColor: Colors.text,
                  borderBottomWidth: 2,
                }
              : {},
          ]}
        >
          <Image source={Images.tokenizedAsset} height={24} width={24} />
        </TouchableOpacity>
      </View>
      {tab === 1 && (
        <WalletTab
          navigation={navigation}
          currency={"XRP"}
          defaultCurrency={defaultCurrency}
          xrpBalance={xrp}
          activateWallet={activateWallet}
          walletAddress={walletAddress}
          wallet={wallet}
          transactions={transactions}
          setTransactionCount={setTransactionCount}
          transactionCount={transactionCount}
        />
      )}
      {tab === 2 && (
        <WalletSoloTab
          navigation={navigation}
          currency={"SOLO"}
          defaultCurrency={defaultCurrency}
          soloBalance={solo}
          walletAddress={walletAddress}
          wallet={wallet}
          transactions={soloTransactions}
          setTransactionCount={setTransactionCount}
          transactionCount={transactionCount}
          soloActive={trustline ? true : false}
          xrpActivate={xrp >= 21 ? true : false}
        />
      )}
      {tab === 3 && (
        <WalletTokenizedAssetTab
          navigation={navigation}
          tokenizedAssets={tokenizedAssets}
          defaultCurrency={defaultCurrency}
          walletAddress={walletAddress}
        />
      )}
      <DeleteWalletModal
        modalVisible={modalVisible}
        onPress={() => {
          deleteWallet(id);
          setModalVisible(false);
          clearTransactions();
          resetWallet();
          navigation.popToTop();
        }}
        onClose={() => setModalVisible(false)}
      />
    </View>
    // </View>
  );
}

WalletScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false,
};

WalletScreen.propTypes = propTypes;
WalletScreen.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
});

const mapStateToProps = ({
  transactions,
  soloTransactions,
  baseCurrency,
  wallet,
}) => {
  // const wallet = wallets.find(item => item.id === walletAddress);
  // console.log("=============", wallet);
  return {
    transactions,
    soloTransactions,
    defaultCurrency: baseCurrency,
    wallet,
    // wallet: wallets.find(item => item.id === walletAddress),
  };
};
const mapDispatchToProps = dispatch => ({
  deleteWallet: id => dispatch(deleteWallet(id)),
  getBalance: (id, address) => dispatch(getBalance(id, address)),
  getTransactions: (address, limit, walletType) =>
    dispatch(getTransactions(address, limit, walletType)),
  activateWallet: id => dispatch(activateWallet(id)),
  clearTransactions: () => dispatch(clearTransactions()),
  setWallet: walletAddress => dispatch(setWallet(walletAddress)),
  resetWallet: () => dispatch(resetWallet()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletScreen);
