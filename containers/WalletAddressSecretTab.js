import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_TextInput from "../components/shared/Custom_TextInput";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import {
  addNewWallet,
  getTrustlines,
  getTrustlinesReset,
  addNewWalletWithTrustline,
  importingWalletReset
} from "../actions";
import {
  isValidRippleAddress,
  isValidSecret,
  getXAddressFromRippleClassicAddress,
  checkWalletExists,
  encrypt,
  isValidRippleAddressWithSecret,
  isValidXAddress,
} from "../utils";
import ImportSuccessfulModal from "../components/shared/ImportSuccessfulModal";
import ErrorModal from "../components/shared/ErrorModal";
import colors from "../constants/Colors";

function WalletAddressSecretTab({
  navigation,
  importSuccessfulModalVisible,
  setImportSuccessfulModalVisible,
  errorModalVisible,
  setErrorModalVisible,
  wallets,
  importingWalletSuccess,
  importingWalletError, 
  importingWalletPending,
  addNewWalletWithTrustline,
  importingWalletReset,
}) {
  const [addressValue, onChangeAddress] = useState("");
  const [secretValue, onChangeSecret] = useState("");
  const [nicknameValue, onChangeNickname] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [completed, handleIsCompleted] = useState(false);
  const [existingWalletError, setExistingWalletError] = useState(false);
  const [xAddressError, setXAddressError] = useState(false);

  useEffect(() => {
    if (
      addressValue &&
      addressValue.length > 0 &&
      secretValue &&
      secretValue.length > 0 &&
      passphrase &&
      passphrase.length > 0
    ) {
      handleIsCompleted(true);
    } else {
      handleIsCompleted(false);
    }
  }, [addressValue, secretValue, passphrase]);

  useEffect(() => {
    console.log("HEREEEEE importingWalletSuccess", importingWalletSuccess)
    if (importingWalletSuccess) {
      setImportSuccessfulModalVisible(true);
    }
    if (importingWalletError) {
      setErrorModalVisible(true);
    }
  }, [importingWalletSuccess, importingWalletError, importingWalletPending]);

  const handleValidation = (addressValue, secretValue) => {
    const validationResultAddress = isValidRippleAddress(addressValue);
    const validationResultSecret = isValidSecret(secretValue);
    if (validationResultAddress && validationResultSecret) {
      return isValidRippleAddressWithSecret(addressValue, secretValue);
    } else {
      return false;
    }
    // return validationResultAddress && validationResultSecret;
  };

  return (
    <View>
      <View style={{ marginTop: 50, marginBottom: 10 }}>
        <Custom_TextInput
          value={addressValue}
          onChangeText={text => {
            onChangeAddress(text);
          }}
          label="Wallet Address"
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
          label="Wallet Secret"
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
          label="Wallet Nickname"
          keyboardType="default"
          returnKeyType="done"
          placeholder="Optional"
          placeholderTextColor={colors.grayText}
        />
      </View>
      <View style={{ marginTop: 15 }}>
        <Custom_TextInput
          value={passphrase}
          onChangeText={text => {
            setPassphrase(text);
          }}
          label="Wallet Password"
          keyboardType="default"
          returnKeyType="done"
          placeholder="Enter new password"
          placeholderTextColor={colors.grayText}
          secureTextEntry
        />
      </View>
      <Custom_Text
        value="Note: You will need this password to make transactions with this wallet. Please, write down the password and store it in a safe place, if you lose it, there is no way to recover it."
        style={{ marginHorizontal: 40, marginTop: 5 }}
        size={10}
      />
      <View style={[styles.addWalletContainer, { marginTop: 70 }]}>
        <Custom_Button
          text="Add Wallet"
          onPress={() => {
            // if (addressValue.startsWith("X")) {
            if (isValidXAddress(addressValue)) {
              setXAddressError(true);
            } else {
              const result = handleValidation(addressValue, secretValue);
              if (!result) {
                setErrorModalVisible(true);
              } else {
                // const walletAddress = getXAddressFromRippleClassicAddress(addressValue);
                const walletAddress = addressValue;
                const walletAlreadyExists = checkWalletExists(
                  walletAddress,
                  wallets
                );
                if (!walletAlreadyExists) {
                  const rippleClassicAddress = addressValue;
                  const salt = Math.random()
                    .toString(36)
                    .slice(2);
                  const encrypted = encrypt(
                    secretValue,
                    salt,
                    rippleClassicAddress,
                    passphrase
                  );
                  const secureNewWallet = {
                    wallet: {}
                  };
                  addNewWalletWithTrustline({
                    walletAddress: rippleClassicAddress,
                    rippleClassicAddress,
                    nickname: nicknameValue ? nicknameValue : "",
                    details: secureNewWallet,
                    encrypted,
                    salt,
                  });
                } else {
                  setExistingWalletError(true);
                }
              }
            }
          }}
          style={{
            height: 40,
            width: 120,
            backgroundColor: !completed
              ? Colors.headerBackground
              : Colors.darkRed
          }}
          color={!completed ? Colors.grayText : Colors.text}
          isPending={importingWalletPending}
          disabled={importingWalletPending || !completed}
        />
      </View>
      <ErrorModal
        value="You have entered an invalid wallet address and secret combination. Please check your details and try again."
        modalVisible={errorModalVisible}
        onClose={() => {
          importingWalletReset();
          setErrorModalVisible(false);
        }}
      />
      <ErrorModal
        value="You have already imported this wallet."
        modalVisible={existingWalletError}
        onClose={() => {
          setExistingWalletError(false);
        }}
      />
      <ErrorModal
        value="We noticed you're using an X-Address format. We currently only support Legacy Addresses. Please use your Classic XRP Address instead."
        modalVisible={xAddressError}
        onClose={() => {
          setXAddressError(false);
        }}
      />
      <ImportSuccessfulModal
        modalVisible={importSuccessfulModalVisible}
        onPress={() => {
          importingWalletReset();
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

const mapStateToProps = ({
  getTrustlinesSuccess,
  getTrustlinesPending,
  getTrustlinesError,
  getTrustlinesErrorStr,
  wallets,
  importingWalletSuccess,
  importingWalletError, 
  importingWalletPending,
}) => ({
  getTrustlinesError,
  getTrustlinesErrorStr,
  wallets,
  getTrustlinesSuccess,
  getTrustlinesPending,
  importingWalletSuccess,
  importingWalletError, 
  importingWalletPending,

});

const mapDispatchToProps = dispatch => ({
  addNewWalletWithTrustline: ({
    walletAddress,
    rippleClassicAddress,
    nickname,
    details,
    encrypted,
    salt,
  }) => dispatch(addNewWalletWithTrustline({
    walletAddress,
    rippleClassicAddress,
    nickname,
    details,
    encrypted,
    salt,
  })),
  importingWalletReset: () => dispatch(importingWalletReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletAddressSecretTab);
