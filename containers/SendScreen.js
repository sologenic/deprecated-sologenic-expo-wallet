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
import { AntDesign } from "@expo/vector-icons";

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
import { transferXrp, getBalance } from "../actions";

function SendScreen({ navigation, transferXrp, transferXrpSuccess, getBalance }) {
  const [completed, handleIsCompleted] = useState(false);
  const [amountToSend, handleChangeAmountToSend] = useState("");
  const [destination, handleChangeDestination] = useState("");
  const [instructionsModalVisible, setInstructionsModalVisible] = useState(false);
  const [tag, handleChangeTag] = useState("");
  const [summaryModalVisible, setSummaryModalVisible] = useState(false);
  const [transferSuccessfulModalVisible, setTransferSuccessfulModalVisible] = useState(false);
  const {
    balance,
    currency,
    walletAddress,
    keypair,
    id,
    wallet,
  } = navigation.state.params;

  useEffect(() => {
    if (amountToSend && amountToSend.length > 0 && destination && destination.length > 0) {
      handleIsCompleted(true);
    } else {
      handleIsCompleted(false);
    }
  }, [amountToSend, destination]);

  useEffect(() => {
    if (transferXrpSuccess) {
      setTransferSuccessfulModalVisible(true);
      setSummaryModalVisible(false);
    }
    // return () => {
    //   cleanup
    // };
  }, [transferXrpSuccess])

  return (
    <View style={styles.container}>
      <Custom_Header
        left={
          <Custom_HeaderButton
            onPress={() => {
              console.log("Press!!");
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 33
        }}
      >
        <View style={{ paddingRight: 10 }}>
          <Image source={Images[currency]} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ paddingRight: 7.5 }}>
            <Custom_Text value={`${balance}`} size={Fonts.size.h5} isBold />
          </View>
          <View>
            <Custom_Text
              value={`${currency.toUpperCase()}`}
              size={Fonts.size.h5}
            />
          </View>
        </View>
      </View>

      <View>
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <Custom_TextInput
            value={amountToSend}
            onChangeText={text => {
              handleChangeAmountToSend(text);
            }}
            label="Amount to send"
            keyboardType="default"
            returnKeyType="done"
            currency={currency}
          />
        </View>

        <View style={{ marginTop: 25, marginBottom: 10 }}>
          <Custom_TextInput
            value={destination}
            onChangeText={text => {
              handleChangeDestination(text);
            }}
            label="Destination Wallet Address"
            keyboardType="default"
            returnKeyType="done"
          />
        </View>
        
        <View style={{ marginTop: 25 }}>
          <Custom_TextInput
            value={tag}
            onChangeText={text => {
              handleChangeTag(text);
            }}
            label="Destination Wallet Tag"
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
        <View style={[styles.sendButtonContainer, { marginTop: 30, marginRight: 24 }]}>
          <Custom_Button
            text="SEND"
            onPress={() => {
              console.log("Press Send");
              setSummaryModalVisible(true);
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
      <InstructionsModal
        modalVisible={instructionsModalVisible}
        onClose={() => setInstructionsModalVisible(false)}
      />
      <TransferSummaryModal
        onPress={() => {
          // account, destination, value
          transferXrp(walletAddress, keypair, destination, amountToSend);
        }}
        modalVisible={summaryModalVisible}
        onClose={() => setSummaryModalVisible(false)}
        currency={currency}
        address={destination}
        amountToSend={amountToSend}
        tag={tag ? tag : ""}
      />
      <TransferSuccessfulModal
        modalVisible={transferSuccessfulModalVisible}
        onPress={() => { 
          setTransferSuccessfulModalVisible(false);
          getBalance(id, walletAddress); 
          navigation.goBack();
        }}
        currency={currency}
      />
      {/* <TransferFailedModal
        modalVisible={summaryModalVisible}
        onClose={() => setSummaryModalVisible(false)}
      /> */}
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
  transferXrpSuccess
}) => ({
  transferXrpSuccess
});
const mapDispatchToProps = dispatch => ({
  transferXrp: (account, keypair, destination, value) => dispatch(transferXrp(account, keypair, destination, value)), 
  getBalance: (id, walletAddress) => dispatch(getBalance(id, walletAddress)) 
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SendScreen);