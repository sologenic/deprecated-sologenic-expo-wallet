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
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { countWords, getWalletFromMnemonic, getRippleClassicAddressFromXAddress } from "../utils";
import ErrorModal from "../components/shared/ErrorModal";
import { addNewWallet } from "../actions"
import ImportSuccessfulModal from "../components/shared/ImportSuccessfulModal";

function PassphraseTab({ 
  navigation,
  errorModalVisible,
  setErrorModalVisible,
  importSuccessfulModalVisible,
  setImportSuccessfulModalVisible,
  addNewWallet, 
}) {
  const [textValue, onChangeText] = useState("");
  const [completed, handleIsCompleted] = useState(false);

  const getContentFromClipboard = async () => {
    const content = await Clipboard.getString();
    await onChangeText(content);
  };

  useEffect(() => {
    const result = countWords(textValue);
    if (textValue) {
      handleIsCompleted(true);
    } else {
      handleIsCompleted(false);
    }
  }, [textValue]);

  return (
    <View>
      <View
        style={[
          styles.section,
          { marginHorizontal: 40, marginTop: 30, marginBottom: 10 }
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
          { marginHorizontal: 40, marginTop: 10, marginBottom: 10 }
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
            returnKeyType="done"
            blurOnSubmit={true}
            style={{
              fontFamily: "Titillium",
              fontSize: Fonts.size.medium,
              color: Colors.text,
              height: 60,
              marginBottom: 5
            }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            marginVertical: 5
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
      <View style={styles.addWalletContainer}>
        <Custom_Button
          text="Add Wallet"
          onPress={() => {
            console.log("Press Add Wallet");
            const result = countWords(textValue);
            if (!result) {
              setErrorModalVisible(true);
            } else {
              const importedWallet = getWalletFromMnemonic(textValue);
              const walletAddress = importedWallet.getAddress();
              const rippleClassicAddress = getRippleClassicAddressFromXAddress(walletAddress);
              addNewWallet(
                importedWallet,
                "",
                walletAddress,
                rippleClassicAddress,
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
      <ErrorModal
        value="You have entered an invalid mnemonic passphrase. It should consist of 12 words, each separated by a space. Please check your phrase and try again."
        modalVisible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
      />
      <ImportSuccessfulModal
        modalVisible={importSuccessfulModalVisible}
        // onClose={() => setImportSuccessfulModalVisible(false)}
        onPress={() => {
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
    alignItems: "center"
  },
  section: {
    justifyContent: "center",
    alignItems: "center"
  },
  passphraseTextInputContainer: {
    marginHorizontal: 40,
    marginTop: 30,
    marginBottom: 60
  },
  passphraseTextInput: {
    borderBottomColor: Colors.text,
    borderBottomWidth: 1
  },
});

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => ({
  addNewWallet: (newWallet, nickname, walletAddress, rippleClassicAddress) =>
    dispatch(
      addNewWallet(newWallet, nickname, walletAddress, rippleClassicAddress)
    )
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(PassphraseTab);
