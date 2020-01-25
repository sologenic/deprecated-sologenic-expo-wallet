import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Clipboard,
} from "react-native";
import { connect } from "react-redux";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_TextInput from "../components/shared/Custom_TextInput";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import {
  countWords,
  getWalletFromMnemonic,
  getRippleClassicAddressFromXAddress,
  checkWalletExists,
  checkMnemoicExists,
} from "../utils";
import ErrorModal from "../components/shared/ErrorModal";
import { addNewWallet, getTrustlines, getTrustlinesReset } from "../actions";
import ImportSuccessfulModal from "../components/shared/ImportSuccessfulModal";

function PassphraseTab({
  navigation,
  errorModalVisible,
  setErrorModalVisible,
  importSuccessfulModalVisible,
  setImportSuccessfulModalVisible,
  wallets,
  getTrustlinesReset,
  getTrustlinesWithAddNewWallet,
  // getTrustlinesError,
  // getTrustlinesErrorStr,
  // getTrustlinesSuccess,
  // getTrustlinesPending,
}) {
  const [textValue, onChangeText] = useState("");
  const [completed, handleIsCompleted] = useState(false);
  const [nicknameValue, onChangeNickname] = useState("");
  const [existingWalletError, setExistingWalletError] = useState(false);

  const getContentFromClipboard = async () => {
    const content = await Clipboard.getString();
    await onChangeText(content);
  };

  // const handlePressAddWallet = () => {
  //   console.log("Press Add Wallet");
  //   const result = countWords(textValue);
  //   if (!result) {
  //     setErrorModalVisible(true);
  //   } else {
  //     const importedWallet = getWalletFromMnemonic(textValue);
  //     const walletAddress = importedWallet.getAddress();
  //     const rippleClassicAddress = getRippleClassicAddressFromXAddress(walletAddress);
  //     addNewWallet(
  //       {
  //         mnemonic: textValue,
  //         wallet: importedWallet,
  //       },
  //       nicknameValue ? nicknameValue : "",
  //       walletAddress,
  //       rippleClassicAddress,
  //       trustline,
  //     );
  //     setImportSuccessfulModalVisible(true);
  //   }
  // }

  useEffect(() => {
    const result = countWords(textValue);
    if (textValue) {
      handleIsCompleted(true);
    } else {
      handleIsCompleted(false);
    }
  }, [textValue]);

  // useEffect(() => {
  //   if (getTrustlinesError) {
  //     setErrorModalVisible(true);
  //   }
  // }, [getTrustlinesError]);

  return (
    <View>
      <View
        style={[
          styles.section,
          { marginHorizontal: 40, marginTop: 30, marginBottom: 10 },
        ]}
      >
        <Custom_Text
          value="Enter the 12 word passphrase that was given to you when you created your account."
          size={Fonts.size.small}
          isBold
        />
      </View>
      <View
        style={[
          styles.section,
          { marginHorizontal: 40, marginTop: 10, marginBottom: 10 },
        ]}
      >
        <Custom_Text
          value="You should have written it down in a safe place upon creation as prompted."
          size={Fonts.size.small}
        />
      </View>
      <View style={styles.passphraseTextInputContainer}>
        <View>
          <Custom_Text
            value="Passphrase"
            size={Fonts.size.small}
            color={Colors.lightGray}
          />
        </View>
        <View style={styles.passphraseTextInput}>
          <TextInput
            value={textValue}
            onChangeText={text => {
              onChangeText(text);
            }}
            multiline={true}
            numberOfLines={2}
            keyboardType="default"
            autoCapitalize="none"
            returnKeyType="done"
            blurOnSubmit={true}
            style={{
              fontFamily: "Titillium",
              fontSize: Fonts.size.medium,
              color: Colors.text,
              height: 60,
              marginBottom: 5,
            }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            marginVertical: 5,
          }}
        >
          <TouchableOpacity onPress={getContentFromClipboard}>
            <Custom_Text
              value="Paste"
              size={Fonts.size.small}
              color={Colors.freshGreen}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginBottom: 30 }}>
        <Custom_TextInput
          value={nicknameValue}
          onChangeText={text => {
            onChangeNickname(text);
          }}
          label="Account Nickname"
          keyboardType="default"
          returnKeyType="done"
        />
        <View style={{ marginLeft: 30, marginTop: 5 }}>
          <Custom_Text
            value="Optional"
            size={Fonts.size.normal}
            color={Colors.grayText}
          />
        </View>
      </View>
      <View style={styles.addWalletContainer}>
        <Custom_Button
          text="Add Wallet"
          onPress={() => {
            const result = countWords(textValue);
            if (!result) {
              setErrorModalVisible(true);
            } else {
              const importedWallet = getWalletFromMnemonic(
                textValue.toLowerCase(),
              );
              if (importedWallet) {
                const walletAddress = importedWallet.getAddress();
                const walletAlreadyExists = checkMnemoicExists(
                  textValue.toLowerCase(),
                  wallets,
                );
                console.log(walletAlreadyExists);
                if (!walletAlreadyExists) {
                  const rippleClassicAddress = getRippleClassicAddressFromXAddress(
                    walletAddress,
                  );
                  getTrustlinesWithAddNewWallet(
                    rippleClassicAddress,
                    rippleClassicAddress,
                    nicknameValue ? nicknameValue : "",
                    textValue,
                    importedWallet,
                  );
                } else {
                  setExistingWalletError(true);
                }

                // move to useEffect
                // setImportSuccessfulModalVisible(true);
              } else {
                setErrorModalVisible(true);
              }
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
          disabled={!completed}
        />
      </View>
      <ErrorModal
        value="You have entered an invalid mnemonic passphrase. It should consist of 12 words, each separated by a space. Please check your phrase and try again."
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
  section: {
    justifyContent: "center",
    alignItems: "center",
  },
  passphraseTextInputContainer: {
    marginHorizontal: 40,
    marginTop: 30,
    marginBottom: 30,
  },
  passphraseTextInput: {
    borderBottomColor: Colors.text,
    borderBottomWidth: 1,
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
  getTrustlinesSuccess,
  getTrustlinesPending,
  wallets,
});
const mapDispatchToProps = dispatch => ({
  addNewWallet: (newWallet, nickname, walletAddress, rippleClassicAddress) =>
    dispatch(
      addNewWallet(newWallet, nickname, walletAddress, rippleClassicAddress),
    ),
  getTrustlinesWithAddNewWallet: (
    walletAddress,
    rippleClassicAddress,
    nickname,
    mnemonic,
    details,
  ) =>
    dispatch(
      getTrustlines(
        walletAddress,
        rippleClassicAddress,
        nickname,
        mnemonic,
        details,
      ),
    ),
  getTrustlinesReset: () => dispatch(getTrustlinesReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassphraseTab);
