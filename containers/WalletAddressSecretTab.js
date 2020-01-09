import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Clipboard
} from "react-native";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_Modal from "../components/shared/Custom_Modal";
import Custom_TextInput from "../components/shared/Custom_TextInput";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

export default function WalletAddressSecretTab({ navigation }) {
  const [addressValue, onChangeAddress] = useState("");
  const [secretValue, onChangeSecret] = useState("");
  const [nicknameValue, onChangeNickname] = useState("");
  const [completed, handleIsCompleted] = useState(false);

  useEffect(() => {
    if (addressValue && addressValue.length > 0 && secretValue && secretValue.length > 0) {
      handleIsCompleted(true);
    } else {
      handleIsCompleted(false);
    }
  });

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
            navigation.navigate({
              routeName: "WalletsScreen",
              key: "WalletsScreen",
            });
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
    </View>
  );
}

const styles = StyleSheet.create({
  addWalletContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
});
