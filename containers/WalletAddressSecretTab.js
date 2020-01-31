import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_TextInput from "../components/shared/Custom_TextInput";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { addNewWallet, getTrustlines, getTrustlinesReset } from "../actions";
import {
  isValidRippleAddress,
  isValidSecret,
  getXAddressFromRippleClassicAddress,
  checkWalletExists,
  encrypt,
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
  getTrustlinesWithAddNewWallet,
  getTrustlinesError,
  wallets,
  getTrustlinesSuccess,
  getTrustlinesReset,
  getTrustlinesPending,
}) {
  const [addressValue, onChangeAddress] = useState("");
  const [secretValue, onChangeSecret] = useState("");
  const [nicknameValue, onChangeNickname] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [completed, handleIsCompleted] = useState(false);
  const [existingWalletError, setExistingWalletError] = useState(false);

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
    if (getTrustlinesError) {
      setErrorModalVisible(true);
    }
    if (getTrustlinesSuccess) {
      setImportSuccessfulModalVisible(true);
    }
  }, [getTrustlinesError, getTrustlinesSuccess, getTrustlinesPending]);

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
      <Custom_Text value="Note: You will need to enter your password every time you want to make a transaction." style={{ marginHorizontal: 40, marginTop: 5  }} size={10} />
      <View style={[styles.addWalletContainer, { marginTop: 70 }]}>
        <Custom_Button
          text="Add Wallet"
          onPress={() => {
            const result = handleValidation(addressValue, secretValue);
            if (!result) {
              setErrorModalVisible(true);
            } else {
              // const walletAddress = getXAddressFromRippleClassicAddress(addressValue);
              const walletAddress = addressValue;
              const walletAlreadyExists = checkWalletExists(
                walletAddress,
                wallets,
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
                  passphrase,
                );
                const secureNewWallet = {
                  wallet: {},
                };
                getTrustlinesWithAddNewWallet({
                  walletAddress: rippleClassicAddress,
                  rippleClassicAddress,
                  nickname: nicknameValue ? nicknameValue : "",
                  details: secureNewWallet,
                  encrypted,
                  salt,
                });
                // getTrustlinesWithAddNewWallet(
                //   walletAddress,
                //   rippleClassicAddress,
                //   nicknameValue ? nicknameValue : "",
                //   "",
                //   {
                //     secret: secretValue,
                //   },
                // );
              } else {
                setExistingWalletError(true);
              }
              // setImportSuccessfulModalVisible(true);
            }
          }}
          style={{
            height: 40,
            width: 100,
            backgroundColor: !completed
              ? Colors.headerBackground
              : Colors.darkRed,
          }}
          color={!completed ? Colors.grayText : Colors.text}
          isPending={getTrustlinesPending}
          disabled={!completed}
        />
      </View>
      <ErrorModal
        value="You have entered an invalid wallet address and secret combination. Please check your details and try again. Your XRP wallet needs at least 21 XRP."
        modalVisible={errorModalVisible}
        onClose={() => {
          getTrustlinesReset();
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
      <ImportSuccessfulModal
        modalVisible={importSuccessfulModalVisible}
        onPress={() => {
          getTrustlinesReset();
          setImportSuccessfulModalVisible(false);
          navigation.navigate({
            routeName: "WalletsScreen",
            key: "WalletsScreen",
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addWalletContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = ({
  getTrustlinesSuccess,
  getTrustlinesPending,
  getTrustlinesError,
  getTrustlinesErrorStr,
  wallets,
}) => ({
  getTrustlinesError,
  getTrustlinesErrorStr,
  wallets,
  getTrustlinesSuccess,
  getTrustlinesPending,
});

const mapDispatchToProps = dispatch => ({
  getTrustlinesWithAddNewWallet: ({
    walletAddress,
    rippleClassicAddress,
    nickname,
    details,
    salt,
    encrypted,
  }) =>
    dispatch(
      getTrustlines({
        walletAddress,
        rippleClassicAddress,
        nickname,
        details,
        salt,
        encrypted,
      }),
    ),
  getTrustlinesReset: () => dispatch(getTrustlinesReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletAddressSecretTab);
