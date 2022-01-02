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
  encrypt,
} from "../utils";
import ErrorModal from "../components/shared/ErrorModal";
import { getTrustlines, getTrustlinesReset } from "../actions";
import ImportSuccessfulModal from "../components/shared/ImportSuccessfulModal";
import colors from "../constants/Colors";

function PassphraseTab({
  navigation,
  errorModalVisible,
  setErrorModalVisible,
  importSuccessfulModalVisible,
  setImportSuccessfulModalVisible,
  wallets,
  getTrustlinesReset,
  getTrustlinesWithAddNewWallet,
  getTrustlinesError,
  getTrustlinesErrorStr,
  getTrustlinesSuccess,
  getTrustlinesPending,
}) {
  const [textValue, onChangeText] = useState("");
  const [completed, handleIsCompleted] = useState(false);
  const [nicknameValue, onChangeNickname] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [existingWalletError, setExistingWalletError] = useState(false);
  const getContentFromClipboard = async () => {
    const content = await Clipboard.getString();
    await onChangeText(content);
  };

  useEffect(() => {
    const result = countWords(textValue);
    if (
      textValue &&
      textValue.length > 0 &&
      passphrase &&
      passphrase.length > 0
    ) {
      handleIsCompleted(true);
    } else {
      handleIsCompleted(false);
    }
  }, [textValue, passphrase]);

  useEffect(() => {
    if (getTrustlinesError) {
      setErrorModalVisible(true);
    }
    if (getTrustlinesSuccess) {
      setImportSuccessfulModalVisible(true);
    }
  }, [getTrustlinesSuccess, getTrustlinesError, getTrustlinesPending]);

  return (
    <View>
      {/* <ScrollView> */}
      <View
        style={[
          styles.section,
          { marginHorizontal: 40, marginTop: 30, marginBottom: 10 },
        ]}
      >
        <Custom_Text
          value="Enter the 12 recovery words that were given to you when you created your account."
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
            value="Recovery Words"
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
      <View style={{ marginBottom: 15 }}>
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
      <View style={{}}>
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
        style={{ marginHorizontal: 40, marginTop: 5, marginBottom: 30 }}
        size={10}
      />
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
                const rippleClassicAddress = getRippleClassicAddressFromXAddress(
                  walletAddress,
                );
                const walletAlreadyExists = checkWalletExists(
                  rippleClassicAddress,
                  wallets,
                );

                if (!walletAlreadyExists) {
                  const salt = Math.random()
                    .toString(36)
                    .slice(2);
                  const encrypted = encrypt(
                    importedWallet.privateKey,
                    salt,
                    rippleClassicAddress,
                    passphrase,
                  );
                  const secureNewWallet = {
                    wallet: {
                      publicKey: importedWallet.publicKey,
                    },
                  };
                  getTrustlinesWithAddNewWallet({
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
              } else {
                setErrorModalVisible(true);
              }
            }
          }}
          style={{
            height: 40,
            width: 120,
            backgroundColor: !completed
              ? Colors.headerBackground
              : Colors.darkRed,
          }}
          color={!completed ? Colors.grayText : Colors.text}
          disabled={getTrustlinesPending || !completed}
          isPending={getTrustlinesPending}
        />
      </View>
      {/* </ScrollView> */}
      <ErrorModal
        value="You have entered invalid mnemonic recovery words. It should consist of 12 words, each separated by a space. Please check your words and try again. Your XRP wallet needs at least 21 XRP."
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
    marginBottom: 20,
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
)(PassphraseTab);
