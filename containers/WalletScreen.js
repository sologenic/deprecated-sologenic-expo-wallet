import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from 'react-redux';

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
import { deleteWallet, getBalance, getTransactions } from "../actions"

function WalletScreen({ navigation, deleteWallet, getBalance, getTransactions }) {
  const [tab, handleTabView] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    defaultCurrency,
    wallet,
  } = navigation.state.params;
  const {
    id,
    balance,
    nickname,
    walletAddress,
    rippleClassicAddress,
    trustline,
  } = wallet;
  const { xrp, solo, tokenizedAssets } = balance;

  useEffect(() => {
    getBalance(id, walletAddress);
    getTransactions(walletAddress);
  }, [])

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
                  }
                });
              }
            }}
          >
            <MenuTrigger
              children={
                <View style={{ paddingHorizontal: 15 }}>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={30}
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
                  marginTop: headerHeight
                }
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
                  marginVertical: 2
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
            backgroundColor: Colors.headerBackground
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
                alignItems: "center"
              },
              tab === 1
                ? {
                    borderBottomColor: Colors.text,
                    borderBottomWidth: 2
                  }
                : {}
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
                alignItems: "center"
              },
              tab === 2
                ? {
                    borderBottomColor: Colors.text,
                    borderBottomWidth: 2
                  }
                : {}
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
                alignItems: "center"
              },
              tab === 3
                ? {
                    borderBottomColor: Colors.text,
                    borderBottomWidth: 2
                  }
                : {}
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
            activate={xrp >= 21 ? true : false}
            walletAddress={walletAddress}
            wallet={wallet}
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
            activate={trustline ? true : false}
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
            navigation.navigate({
              routeName: "WalletsScreen",
              key: "WalletsScreen",
            });
          }}
          onClose={() => setModalVisible(false)}
        />
      </View>
    // </View>
  );
}

WalletScreen.navigationOptions = {
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
  }
});

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => ({
  deleteWallet: id => dispatch(deleteWallet(id)),
  getBalance: (id, address) => dispatch(getBalance(id, address)),
  getTransactions: address => dispatch(getTransactions(address)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletScreen);