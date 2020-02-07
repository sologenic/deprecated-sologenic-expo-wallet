import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
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
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import { changeNickname, getBalance, setWallet } from "../actions";

function ChangeWalletNicknameScreen({
  navigation,
  changeNickname,
  getBalance,
}) {
  const [textValue, onChangeText] = useState("");
  const { id, nickname } = navigation.state.params;
  return (
    <View style={styles.container}>
      <Custom_Header
        left={
          <Custom_HeaderButton
            onPress={() => {
              navigation.goBack();
            }}
            type="icon"
            icon="md-close"
            iconColor={Colors.text}
          />
        }
        center={<Custom_HeaderTitle text="Change Wallet Nickname" />}
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
      </View>
      <View style={styles.section}>
        <Custom_Button
          text="Confirm"
          onPress={() => {
            changeNickname(id, textValue);
            // setWallet(id);
            navigation.goBack();
          }}
          style={{ height: 40, width: 86 }}
          // icon="ios-arrow-forward"
        />
      </View>
    </View>
  );
}

ChangeWalletNicknameScreen.navigationOptions = {
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
  section: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
  changeNickname: (id, nickname) => dispatch(changeNickname(id, nickname)),
  setWallet: walletAddress => dispatch(setWallet(walletAddress)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeWalletNicknameScreen);
