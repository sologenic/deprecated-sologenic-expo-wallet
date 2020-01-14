import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Custom_Button from "../components/shared/Custom_Button";
import RecoveryPhrase from "../components/shared/RecoveryPhrase";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import ExitProcessModal from "../components/shared/ExitProcessModal";
import {
  updatePhraseTestValue1,
  updatePhraseTestValue2,
  updatePhraseTestValue3,
  addNewWallet
} from "../actions";
import WalletCreationSuccessfulModal from "../components/shared/WalletCreationSuccessfulModal";

function RecoveryPhraseTestScreen({
  navigation,
  phraseTestValue1,
  phraseTestValue2,
  phraseTestValue3,
  updatePhraseTestValue1,
  updatePhraseTestValue2,
  updatePhraseTestValue3,
  newWallet,
  addNewWallet
  // nickname,
}) {
  const [pressed, handlePressButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [
    walletCreationSuccessfulModalVisible,
    setWalletCreationSuccessfulModalVisible
  ] = useState(false);
  const [testResult, handleTestResult] = useState("");

  const {
    randomNumbers,
    phrase,
    nickname,
    walletAddress,
    rippleClassicAddress
  } = navigation.state.params;
  let count = 0;

  useEffect(() => {
    updatePhraseTestValue1("");
    updatePhraseTestValue2("");
    updatePhraseTestValue3("");
  }, []);

  console.log(phraseTestValue1, phraseTestValue2, phraseTestValue3);

  console.log("new wallet", newWallet, "nickname", nickname);

  useEffect(() => {
    if (
      phraseTestValue1 &&
      phraseTestValue1.length > 0 &&
      phraseTestValue2 &&
      phraseTestValue2.length > 0 &&
      phraseTestValue3 &&
      phraseTestValue3.length > 0
    ) {
      handlePressButton(true);
    } else {
      handlePressButton(false);
    }
  }, [phraseTestValue1, phraseTestValue2, phraseTestValue3]);

  const recoveryPhraseTest = (
    randomNumbers,
    phrase,
    phraseTestValue1,
    phraseTestValue2,
    phraseTestValue3
  ) => {
    const sortedRandomNumbers = randomNumbers.sort((a, b) => (a < b ? -1 : 1));
    return (
      phrase[sortedRandomNumbers[0] - 1] === phraseTestValue1 &&
      phrase[sortedRandomNumbers[1] - 1] === phraseTestValue2 &&
      phrase[sortedRandomNumbers[2] - 1] === phraseTestValue3
    );
  };

  return (
    <View style={styles.container}>
      <Custom_Header
        left={
          <Custom_HeaderButton
            onPress={() => {
              console.log("Press!!");
              setModalVisible(true);
            }}
            type="icon"
            icon="md-close"
            iconColor={Colors.text}
          />
        }
        center={<Custom_HeaderTitle text="Recovery Phrase Test" />}
        right={<View />}
      />
      <ScrollView>
        <View
          style={[
            styles.section,
            { justifyContent: "center", alignItems: "center" }
          ]}
        >
          {testResult === "" && (
            <Custom_Text
              value="To ensure that you have complied with the steps as instructed, please enter the missing info of your given Recovery Phrase below."
              size={Fonts.size.normal}
              color={Colors.text}
            />
          )}
          {testResult === "error" && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{ marginTop: 35, marginBottom: 10 }}>
                <AntDesign
                  name="exclamationcircle"
                  size={Fonts.size.medium}
                  color={Colors.text}
                />
              </View>
              <View style={{ marginHorizontal: 45 }}>
                <Custom_Text
                  value="The information you entered was incorrect. Please double check your written Recovery Phrase and try again."
                  size={Fonts.size.normal}
                  color={Colors.text}
                />
              </View>
            </View>
          )}
        </View>
        <View
          style={[
            styles.section,
            { justifyContent: "center", alignItems: "center" }
          ]}
        >
          <RecoveryPhrase
            phrase={phrase}
            randomNumbers={randomNumbers}
            color={
              testResult === "error" ? Colors.errorBackground : Colors.text
            }
            indexColor={
              testResult === "error" ? Colors.errorBackground : Colors.lightGray
            }
          />
        </View>
        <View style={[styles.section, { alignItems: "center" }]}>
          <Custom_Button
            text="Add Wallet"
            onPress={() => {
              const result = recoveryPhraseTest(
                randomNumbers,
                phrase,
                phraseTestValue1,
                phraseTestValue2,
                phraseTestValue3
              );
              if (result === true) {
                handleTestResult("correct");
                addNewWallet(
                  newWallet,
                  nickname,
                  walletAddress,
                  rippleClassicAddress
                );
                setWalletCreationSuccessfulModalVisible(true);
              } else {
                handleTestResult("error");
                updatePhraseTestValue1("");
                updatePhraseTestValue2("");
                updatePhraseTestValue3("");
              }
            }}
            style={{
              height: 40,
              width: 120,
              backgroundColor: !pressed
                ? Colors.headerBackground
                : Colors.darkRed
            }}
            color={!pressed ? Colors.grayText : Colors.text}
            disabled={!pressed}
          />
        </View>
      </ScrollView>
      <ExitProcessModal
        modalVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
      />
      <WalletCreationSuccessfulModal
        modalVisible={walletCreationSuccessfulModalVisible}
        onClose={() => {
          setWalletCreationSuccessfulModalVisible(false);
        }}
        onPress={() => {
          setWalletCreationSuccessfulModalVisible(false);
          navigation.navigate({
            routeName: "WalletsScreen",
            key: "WalletsScreen"
          });
        }}
      />
    </View>
  );
}

RecoveryPhraseTestScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20
  }
});

const mapStateToProps = ({
  phraseTestValue1,
  phraseTestValue2,
  phraseTestValue3,
  newWallet
  // nickname,
}) => ({
  phraseTestValue1,
  phraseTestValue2,
  phraseTestValue3,
  newWallet
  // nickname,
});

const mapDispatchToProps = dispatch => ({
  updatePhraseTestValue1: value => dispatch(updatePhraseTestValue1(value)),
  updatePhraseTestValue2: value => dispatch(updatePhraseTestValue2(value)),
  updatePhraseTestValue3: value => dispatch(updatePhraseTestValue3(value)),
  addNewWallet: (newWallet, nickname, walletAddress, rippleClassicAddress) =>
    dispatch(
      addNewWallet(newWallet, nickname, walletAddress, rippleClassicAddress)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoveryPhraseTestScreen);
