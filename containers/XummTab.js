import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

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
import GoToXummModal from "../components/shared/GoToXummModal";
import colors from "../constants/Colors";

function XummTab({
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
  // const [addressValue, onChangeAddress] = useState("");
  // const [secretValue, onChangeSecret] = useState("");
  const [nicknameValue, onChangeNickname] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [completed, handleIsCompleted] = useState(false);
  const [existingWalletError, setExistingWalletError] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false);
  const [goToXummModalVisible, setGoToXummModal] = useState(false);

  useEffect(() => {
    if (
      passphrase &&
      passphrase.length > 0
    ) {
      handleIsCompleted(true);
    } else {
      handleIsCompleted(false);
    }
  }, [passphrase]);

  // useEffect(() => {
  //   console.log("HEREEEEE importingWalletSuccess", importingWalletSuccess)
  //   if (importingWalletSuccess) {
  //     setImportSuccessfulModalVisible(true);
  //   }
  //   if (importingWalletError) {
  //     setErrorModalVisible(true);
  //   }
  // }, [importingWalletSuccess, importingWalletError, importingWalletPending]);

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
      <Custom_Text
        value="Add a wallet from the XUMM app."
        style={{ marginHorizontal: 40, marginTop: 30, marginBottom: 10 }}
        size={Fonts.size.small}
        isBold
      />
      <View style={{ marginVertical: 20, justifyContent: "center", alignItems: "center" }}>
        <View 
          style={{ 
            borderColor: Colors.xummBlue,
            borderWidth: 4,
            borderRadius: 8,
            height: 50,
            width: 55,
            backgroundColor: Colors.ricePaper,
          }}
        >
          <View 
            style={{
              position: "absolute",
              top: 10,
              left: 8
            }}
          >
            <FontAwesome
              name="close"
              size={20}
              color={Colors.xummBlue}
            />
          </View>
          <View
            style={{
              position: "absolute",
              top: 10,
              left: 21
            }}
          >
            <FontAwesome
              name="check"
              size={20}
              color={Colors.xummBlue}
            />
          </View>
        </View>
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
            setGoToXummModal(true);
            // if (isValidXAddress(addressValue)) {
            //   setXAddressError(true);
            // } else {
            //   const result = handleValidation(addressValue, secretValue);
            //   if (!result) {
            //     setErrorModalVisible(true);
            //   } else {
            //     // const walletAddress = getXAddressFromRippleClassicAddress(addressValue);
            //     const walletAddress = addressValue;
            //     const walletAlreadyExists = checkWalletExists(
            //       walletAddress,
            //       wallets
            //     );
            //     if (!walletAlreadyExists) {
            //       const rippleClassicAddress = addressValue;
            //       const salt = Math.random()
            //         .toString(36)
            //         .slice(2);
            //       const encrypted = encrypt(
            //         secretValue,
            //         salt,
            //         rippleClassicAddress,
            //         passphrase
            //       );
            //       const secureNewWallet = {
            //         wallet: {}
            //       };
            //       addNewWalletWithTrustline({
            //         walletAddress: rippleClassicAddress,
            //         rippleClassicAddress,
            //         nickname: nicknameValue ? nicknameValue : "",
            //         details: secureNewWallet,
            //         encrypted,
            //         salt,
            //       });
            //     } else {
            //       setExistingWalletError(true);
            //     }
            //   }
            // }
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
      <GoToXummModal
        modalVisible={goToXummModalVisible}
        deepLink="exp://expo.io"
        onPress={() => {
          setGoToXummModal(false);
          setImportSuccessfulModalVisible(true);
        }}
      />
      {/* <ErrorModal
        value="You have entered an invalid wallet address and secret combination. Please check your details and try again."
        modalVisible={errorModalVisible}
        onClose={() => {
          importingWalletReset();
          setErrorModalVisible(false);
        }}
      /> */}
      <ErrorModal
        value="You have already imported this wallet."
        modalVisible={existingWalletError}
        onClose={() => {
          setExistingWalletError(false);
        }}
      />
      <ErrorModal
        value="You failed to import this wallet. This request has expired."
        modalVisible={timeoutError}
        onClose={() => {
          // setXAddressError(false);
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
)(XummTab);
