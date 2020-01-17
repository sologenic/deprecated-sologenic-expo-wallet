import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Clipboard
} from "react-native";
import { connect } from "react-redux";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_TextInput from "../components/shared/Custom_TextInput";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { addNewWallet, getTrustlines } from "../actions";
import {
  isValidRippleAddress,
  isValidSecret,
  getXAddressFromRippleClassicAddress
} from "../utils";
import ImportSuccessfulModal from "../components/shared/ImportSuccessfulModal";

function WalletAddressSecretTab({
  navigation,
  importSuccessfulModalVisible,
  setImportSuccessfulModalVisible,
  addNewWallet,
  getTrustlinesWithAddNewWallet
}) {
  const [addressValue, onChangeAddress] = useState("");
  const [secretValue, onChangeSecret] = useState("");
  const [nicknameValue, onChangeNickname] = useState("");
  const [completed, handleIsCompleted] = useState(false);

  useEffect(() => {
    if (
      addressValue &&
      addressValue.length > 0 &&
      secretValue &&
      secretValue.length > 0
    ) {
      handleIsCompleted(true);
    } else {
      handleIsCompleted(false);
    }
  }, [addressValue, secretValue]);

  const handleValidation = (addressValue, secretValue) => {
    const validationResultAddress = isValidRippleAddress(addressValue);
    const validationResultSecret = isValidSecret(secretValue);
    return validationResultAddress && validationResultSecret;
  };

  return (
    <View>
      <View style={{ marginTop: 50, marginBottom: 10 }}>
        <Custom_TextInput
          value={addressValue}
          onChangeText={text => {
            onChangeAddress(text);
          }}
          label="Account Address"
          keyboardType="default"
          returnKeyType="done"
        />
      </View>
      <View style={{ marginTop: 5, marginBottom: 10 }}>
        <Custom_TextInput
          value={secretValue}
          onChangeText={text => {
            onChangeSecret(text);
          }}
          label="Account Secrent"
          keyboardType="default"
          returnKeyType="done"
        />
      </View>
      <View style={{ marginTop: 5 }}>
        <Custom_TextInput
          value={nicknameValue}
          onChangeText={text => {
            onChangeNickname(text);
          }}
          label="Account Nickname"
          keyboardType="default"
          returnKeyType="done"
        />
        <View style={{ marginLeft: 30 }}>
          <Custom_Text
            value="Optional"
            size={Fonts.size.normal}
            color={Colors.freshGreen}
          />
        </View>
      </View>
      <View style={[styles.addWalletContainer, { marginTop: 70 }]}>
        <Custom_Button
          text="Add Wallet"
          onPress={() => {
            console.log("Press Add Wallet");
            const result = handleValidation(addressValue, secretValue);
            if (!result) {
              console.log("error");
            } else {
              // const walletAddress = getXAddressFromRippleClassicAddress(addressValue);
              const walletAddress = addressValue;
              const rippleClassicAddress = addressValue;
              getTrustlinesWithAddNewWallet(
                walletAddress,
                rippleClassicAddress,
                nicknameValue ? nicknameValue : "",
                "",
                {
                  secret: secretValue
                },
              );
              setImportSuccessfulModalVisible(true);
            }
          }}
          style={{
            height: 40,
            width: 100,
            backgroundColor: !completed
              ? Colors.headerBackground
              : Colors.darkRed
          }}
          color={!completed ? Colors.grayText : Colors.text}
          disabled={!completed}
        />
      </View>
      <ImportSuccessfulModal
        modalVisible={importSuccessfulModalVisible}
        // onClose={() => setImportSuccessfulModalVisible(false)}
        onPress={() => {
          setImportSuccessfulModalVisible(false);
          navigation.navigate({
            routeName: "WalletsScreen",
            key: "WalletsScreen"
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addWalletContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => ({
  addNewWallet: (newWallet, nickname, walletAddress, rippleClassicAddress) =>
    dispatch(
      addNewWallet(newWallet, nickname, walletAddress, rippleClassicAddress)
    ),
  getTrustlinesWithAddNewWallet: (
    walletAddress,
    rippleClassicAddress,
    nickname,
    mnemonic,
    details
  ) =>
    dispatch(
      getTrustlines(
        walletAddress,
        rippleClassicAddress,
        nickname,
        mnemonic,
        details
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletAddressSecretTab);
