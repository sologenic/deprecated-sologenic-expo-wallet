import React, { useState, useEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Custom_TextInput from "../components/shared/Custom_TextInput";
import Custom_Button from "../components/shared/Custom_Button";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import InstructionsModal from "../components/shared/InstructionsModal";
import TransferSummaryModal from "../components/shared/TransferSummaryModal";
import TransferSuccessfulModal from "../components/shared/TransferSuccessfulModal";
import TransferFailedModal from "../components/shared/TransferFailedModal";
import ErrorModal from "../components/shared/ErrorModal";
import {
  transferXrp,
  getBalance,
  transferXrpReset,
  transferSolo,
  transferSoloReset
} from "../actions";
import {
  formatWalletTotalBalance,
  excludeLettersExceptForNumber,
  formatInput,
  getRippleClassicAddressFromXAddress,
  formatBalance,
  splitAddress
} from "../utils";
import { screenWidth } from "../constants/Layout";

function SendScreen({
  navigation,
  transferXrp,
  transferXrpPending,
  transferXrpSuccess,
  transferXrpError,
  transferXrpErrorStr,
  transferSoloErrorStr,
  transferXrpReset,
  transferSolo,
  transferSoloPending,
  transferSoloSuccess,
  transferSoloError,
  transferSoloReset,
  getBalance,
  baseCurrency,
  marketData,
  soloData,
  wallet,
  netinfo,
  reserve
}) {
  const [completed, handleIsCompleted] = useState(false);
  const [amountToSend, handleChangeAmountToSend] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [destination, handleChangeDestination] = useState("");
  const [destinationError, setDestinationError] = useState(null);
  const [instructionsModalVisible, setInstructionsModalVisible] = useState(
    false
  );
  const [tag, handleChangeTag] = useState("");
  const [passphrase, handleChangePassphrase] = useState("");
  const [summaryModalVisible, setSummaryModalVisible] = useState(false);
  const [
    transferSuccessfulModalVisible,
    setTransferSuccessfulModalVisible
  ] = useState(false);
  const [transferErrorModalVisible, setTransferErrorModalVisible] = useState(
    false
  );
  const [offline, handleChangeOffline] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isUsingXAddress, setIsUsingXAddress] = useState(false);
  const [isIncludingDt, setIsIncludingDt] = useState(false);
  const { balance, currency, walletAddress, id } = navigation.state.params;
  const { salt, encrypted, details } = wallet;
  const { publicKey } = details.wallet;

  useEffect(() => {
    if (!netinfo) {
      handleChangeOffline(true);
    }
    if (netinfo) {
      handleChangeOffline(false);
    }
  }, [netinfo]);

  useEffect(() => {
    if (
      amountToSend &&
      amountToSend.length > 0 &&
      destination &&
      destination.length > 0 &&
      passphrase &&
      passphrase.length > 0
    ) {
      handleIsCompleted(true);
    } else {
      handleIsCompleted(false);
    }
    if (marketData && marketData.last) {
      if (currency === "xrp") {
        setConvertedAmount(amountToSend * marketData.last);
      } else {
        setConvertedAmount(amountToSend * soloData[baseCurrency.value]);
      }
    }
    // if(destination.includes('?dt')) {
    //   setDestinationError(`?dt should not be included in the destination wallet address. Destination tag has to be entered in the Destination Tag field. \n\nXAddress should not have dt?=. You must remove it from the wallet address.`)
    // }
  }, [amountToSend, destination, passphrase, tag, isUsingXAddress]);

  useEffect(() => {
    if (transferXrpSuccess) {
      setTransferSuccessfulModalVisible(true);
      setSummaryModalVisible(false);
    }
    if (transferXrpError) {
      setTransferErrorModalVisible(true);
      setSummaryModalVisible(false);
      handleChangePassphrase("");
    }
    if (transferSoloSuccess) {
      setTransferSuccessfulModalVisible(true);
      setSummaryModalVisible(false);
    }
    if (transferSoloError) {
      setTransferErrorModalVisible(true);
      setSummaryModalVisible(false);
      handleChangePassphrase("");
    }
    // return () => {
    //   cleanup
    // };
  }, [
    transferXrpPending,
    transferXrpSuccess,
    transferXrpError,
    transferSoloPending,
    transferSoloSuccess,
    transferSoloError,
    transferSuccessfulModalVisible,
    summaryModalVisible
  ]);

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
        center={<Custom_HeaderTitle text={`Send ${currency.toUpperCase()}`} />}
        right={<View />}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAwareScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 33
            }}
          >
            <View style={{ paddingRight: 10 }}>
              <Image
                source={Images[currency]}
                style={{ height: 40, width: 40 }}
              />
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View style={{ paddingRight: 7.5 }}>
                  <Custom_Text
                    value={`${formatBalance(balance)}`}
                    size={Fonts.size.h5}
                    isBold
                  />
                </View>
                <View>
                  <Custom_Text
                    value={`${currency.toUpperCase()}`}
                    size={Fonts.size.h5}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View>
                  <Custom_Text
                    value="Network Reserve: "
                    size={12}
                    color={Colors.lightGray}
                  />
                </View>
                <View>
                  <Custom_Text
                    value={reserve}
                    size={12}
                    color={Colors.lightGray}
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            <View style={{ marginTop: 20, marginBottom: 10 }}>
              <Custom_TextInput
                value={amountToSend}
                onChangeText={text => {
                  // var t = text.replace(/[^0-9.]/g, "");
                  const formattedText = excludeLettersExceptForNumber(
                    formatInput(text, 6)
                  );
                  handleChangeAmountToSend(formattedText);
                }}
                label="Amount to send"
                keyboardType="default"
                returnKeyType="done"
                currency={currency}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 40,
                  borderBottomColor: Colors.grayText,
                  borderBottomWidth: 2,
                  marginTop: 10
                }}
              >
                <Custom_Text
                  value={formatWalletTotalBalance(convertedAmount)}
                  color={Colors.grayText}
                  size={16}
                />
                <Custom_Text
                  value={baseCurrency.label}
                  color={Colors.grayText}
                  size={16}
                />
              </View>
            </View>
            <View style={{ marginTop: 25, marginBottom: 10 }}>
              <Custom_TextInput
                value={destination}
                onChangeText={text => {
                  const startsWithX = text.startsWith("X");
                  if (startsWithX) {
                    setIsUsingXAddress(true);
                    handleChangeTag("");
                  } else {
                    setIsUsingXAddress(false);
                  }

                  const splittedAddres = splitAddress(text);
                  if (splittedAddres && splittedAddres.length > 1) {
                    setIsIncludingDt(true);
                  } else {
                    setIsIncludingDt(false);
                  }
                  handleChangeDestination(text);
                }}
                label="Destination Wallet Address"
                keyboardType="default"
                returnKeyType="done"
                style={{
                  borderColor: isIncludingDt
                    ? Colors.errorBackground
                    : Colors.headerBackground,
                  borderWidth: 1
                }}
              />
              {isIncludingDt && !isUsingXAddress && (
                <View style={{ marginHorizontal: 24, marginTop: 5 }}>
                  <Custom_Text
                    value="?dt should not be included in the destination wallet address. Destination tag has to be entered in the Destination Tag field."
                    color={Colors.errorBackground}
                    size={Fonts.size.small}
                  />
                </View>
              )}
              {isIncludingDt && isUsingXAddress && (
                <View style={{ marginHorizontal: 24, marginTop: 5 }}>
                  <Custom_Text
                    value="XAddress should not have dt?=. You must remove it from the wallet address."
                    color={Colors.errorBackground}
                    size={Fonts.size.small}
                  />
                </View>
              )}
            </View>
            <View style={{ marginTop: 25 }}>
              <Custom_TextInput
                value={tag}
                onChangeText={text => {
                  var t = text.replace(/[^0-9.]/g, "");
                  handleChangeTag(t);
                }}
                label="Destination Tag"
                placeholder={isUsingXAddress ? "Disabled" : "Optional"}
                keyboardType="default"
                returnKeyType="done"
                editable={!isUsingXAddress}
              />
              {/* <View style={{ marginLeft: 30, marginTop: 5 }}>
                <Custom_Text
                  value="Optional"
                  size={Fonts.size.normal}
                  color={Colors.grayText}
                  style={{ marginLeft: 10 }}
                />
              </View> */}
            </View>

            <View style={{ marginTop: 25 }}>
              <Custom_TextInput
                value={passphrase}
                onChangeText={text => {
                  handleChangePassphrase(text);
                }}
                label="Wallet Password"
                keyboardType="default"
                returnKeyType="done"
                secureTextEntry
              />
            </View>
            <View style={{ marginHorizontal: 24, marginTop: 50 }}>
              <Custom_IconButton
                icon="questioncircle"
                color={Colors.grayText}
                text="Instructions"
                textSize={Fonts.size.small}
                size={13}
                style={{
                  height: 12,
                  width: 12,
                  backgroundColor: "#FFF"
                }}
                textStyle={{
                  paddingRight: 5
                }}
                onPress={() => {
                  setInstructionsModalVisible(true);
                }}
              />
            </View>
            <View
              style={[
                styles.sendButtonContainer,
                { marginTop: 30, marginRight: 24 }
              ]}
            >
              <Custom_Button
                text="SEND"
                onPress={() => {
                  console.log("Press Send");
                  setSummaryModalVisible(true);
                }}
                style={{
                  height: 40,
                  width: 100,
                  backgroundColor:
                    !completed || isIncludingDt
                      ? Colors.headerBackground
                      : Colors.darkRed
                }}
                color={
                  !completed || isIncludingDt ? Colors.grayText : Colors.text
                }
                disabled={!completed}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <InstructionsModal
        modalVisible={instructionsModalVisible}
        currency={currency}
        onClose={() => setInstructionsModalVisible(false)}
      />
      <TransferSummaryModal
        onPress={() => {
          if (offline) {
            setErrorModalVisible(true);
            setSummaryModalVisible(false);
          } else {
            if (currency === "xrp") {
              transferXrp({
                account: walletAddress,
                destination: isUsingXAddress
                  ? getRippleClassicAddressFromXAddress(destination)
                  : destination,
                tag,
                value: amountToSend,
                passphrase,
                salt,
                encrypted,
                publicKey,
                reserve
              });
            } else {
              transferSolo({
                account: walletAddress,
                destination: isUsingXAddress
                  ? getRippleClassicAddressFromXAddress(destination)
                  : destination,
                tag,
                value: amountToSend,
                passphrase,
                salt,
                encrypted,
                publicKey,
                reserve
              });
            }
          }
        }}
        modalVisible={summaryModalVisible}
        showSpinner={transferXrpPending || transferSoloPending}
        onClose={() => setSummaryModalVisible(false)}
        currency={currency}
        address={destination}
        amountToSend={amountToSend}
        tag={tag ? tag : ""}
      />
      <TransferSuccessfulModal
        modalVisible={transferSuccessfulModalVisible}
        onPress={() => {
          // if solo
          if (currency === "xrp") {
            transferXrpReset();
          } else {
            transferSoloReset();
          }
          setTransferSuccessfulModalVisible(false);
          getBalance(id, walletAddress);
          navigation.goBack();
        }}
        currency={currency}
      />
      <TransferFailedModal
        modalVisible={transferErrorModalVisible}
        value={transferXrpError ? transferXrpErrorStr : transferSoloErrorStr}
        onPress={() => {
          if (currency === "xrp") {
            transferXrpReset();
          } else {
            transferSoloReset();
          }
          setTransferErrorModalVisible(false);
        }}
        onClose={() => {
          if (currency === "xrp") {
            transferXrpReset();
          } else {
            transferSoloReset();
          }
          setTransferErrorModalVisible(false);
          navigation.goBack();
        }}
        // errorMessage={offline ? "Your transfer cannot be processed. Your device is offline." : ""}
      />
      <ErrorModal
        value="Your transfer cannot be processed. Your device is offline."
        modalVisible={errorModalVisible}
        onClose={() => {
          setErrorModalVisible(false);
        }}
      />
      <View style={{ height: 40, width: screenWidth }} />
    </View>
  );
}

SendScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  sendButtonContainer: {
    justifyContent: "center",
    alignItems: "flex-end"
  }
});

const mapStateToProps = ({
  transferXrpSuccess,
  transferXrpError,
  transferXrpPending,
  transferSoloSuccess,
  transferSoloError,
  transferSoloPending,
  transferXrpErrorStr,
  transferSoloErrorStr,
  baseCurrency,
  marketData,
  wallet,
  netinfo,
  soloData,
  reserve
}) => ({
  transferXrpSuccess,
  transferXrpError,
  transferXrpPending,
  transferSoloSuccess,
  transferSoloError,
  transferSoloPending,
  transferXrpError,
  transferXrpErrorStr,
  transferSoloErrorStr,
  baseCurrency,
  marketData,
  soloData,
  wallet,
  netinfo,
  reserve
});
const mapDispatchToProps = dispatch => ({
  transferXrp: ({
    account,
    destination,
    tag,
    value,
    passphrase,
    salt,
    encrypted,
    publicKey,
    reserve
  }) =>
    dispatch(
      transferXrp({
        account,
        destination,
        tag,
        value,
        passphrase,
        salt,
        encrypted,
        publicKey,
        reserve
      })
    ),
  transferSolo: ({
    account,
    destination,
    tag,
    value,
    passphrase,
    salt,
    encrypted,
    publicKey,
    reserve
  }) =>
    dispatch(
      transferSolo({
        account,
        destination,
        tag,
        value,
        passphrase,
        salt,
        encrypted,
        publicKey,
        reserve
      })
    ),
  getBalance: (id, walletAddress) => dispatch(getBalance(id, walletAddress)),
  transferXrpReset: () => dispatch(transferXrpReset()),
  transferSoloReset: () => dispatch(transferSoloReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(SendScreen);
