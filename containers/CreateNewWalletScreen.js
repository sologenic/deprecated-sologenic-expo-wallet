import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";

import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_TextInput from "../components/shared/Custom_TextInput";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import {
  generateNewRandomWallet,
  getAddress,
  getRippleClassicAddressFromXAddress,
  generateMnemonicArray,
} from "../utils";
import { generateNewWallet, saveNickname } from "../actions";

function CreateNewWallet({ navigation, generateNewWallet }) {
  const [textValue, onChangeText] = useState("");
  const [passphraseValue, onChangePassphrase] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  return (
    <View style={styles.container}>
      <Custom_Header
        left={
          <Custom_HeaderButton
            onPress={() => {
              navigation.goBack();
            }}
            type="icon"
            icon="md-arrow-back"
            iconColor={Colors.text}
          />
        }
        center={<Custom_HeaderTitle text="Create New Wallet" />}
        right={<View />}
      />
      <View>
        <View style={styles.nicknameInput}>
          <Custom_TextInput
            value={textValue}
            onChangeText={text => {
              onChangeText(text);
            }}
            label="Wallet Nickname"
            keyboardType="default"
            returnKeyType="done"
          />
        </View>
        <View style={styles.passPhraseInput}>
          <Custom_TextInput
            value={passphraseValue}
            onChangeText={text => {
              onChangePassphrase(text);
            }}
            label="Wallet Passphrase"
            keyboardType="default"
            returnKeyType="done"
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 30,
              padding: 5,
              paddingTop: 8,
              alignItems: "center",
            }}
            onPress={() => setSecureEntry(!secureEntry)}
          >
            <MaterialCommunityIcons
              name={secureEntry ? "eye" : "eye-off"}
              size={24}
              color="#fff"
            />
            {/* <Ionicons
              name={true ? "Visibility" : "Visibility-off"}
              size={10}
              color="#fff"
            /> */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Custom_Button
          text="Next"
          onPress={() => {
            const result = generateNewRandomWallet();
            console.log("==generateWalletAddress==", result);
            const walletAddress = getAddress(result);
            console.log("==address==", walletAddress);
            const rippleClassicAddress = getRippleClassicAddressFromXAddress(
              walletAddress,
            );
            console.log("==rippleClassicAddress==", rippleClassicAddress);
            // const { address } = rippleClassicAddress;
            generateNewWallet(result);
            const nickname = textValue;
            console.log("nickname", nickname);
            saveNickname(nickname);
            const mnemonic = generateMnemonicArray(result.mnemonic);
            navigation.navigate({
              routeName: "YourRecoveryPhraseScreen",
              key: "YourRecoveryPhraseScreen",
              params: {
                mnemonic,
                nickname,
                passphrase: passphraseValue,
                walletAddress: rippleClassicAddress,
                rippleClassicAddress: rippleClassicAddress,
              },
            });

            // const mnemonic = result.mnemonic;
            // console.log("==mnemonic==", mnemonic);
            // const walletFromMnemonic = getWalletFromMnemonic(mnemonic);
            // console.log("==wallet from mnemonic==", walletFromMnemonic);
            // console.log(
            //   "==address from mnemonic==",
            //   walletFromMnemonic.getAddress()
            // );
            // console.log(
            //   "Is it the same as the one from mnemonic?",
            //   address === walletFromMnemonic.getAddress()
            // );
          }}
          style={{ height: 40, width: 80 }}
          icon="ios-arrow-forward"
        />
      </View>
    </View>
  );
}

CreateNewWallet.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  nicknameInput: {
    marginTop: 20,
    // marginHorizontal: 20,
  },
  passPhraseInput: {
    marginTop: 20,
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginHorizontal: 20,
    marginVertical: 50,
  },
});

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => ({
  generateNewWallet: newWallet => dispatch(generateNewWallet(newWallet)),
  saveNickname: nickname => dispatch(saveNickname(nickname)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewWallet);
