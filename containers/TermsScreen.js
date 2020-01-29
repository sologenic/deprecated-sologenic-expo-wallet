import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { connect } from "react-redux";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Colors from "../constants/Colors";
import Custom_RadioButton from "../components/shared/Custom_RadioButton";
import { updateIsOrientationComplete } from "../actions";
import { borderWidth, screenWidth } from "../constants/Layout";
import Custom_Button from "../components/shared/Custom_Button";
import Fonts from "../constants/Fonts";
import colors from "../constants/Colors";
import appConfig from "../app.config";
import config from "../constants/config";

function TermsScreen({ navigation, completeOrientation }) {
  handleOpenWithWebBrowser = url => {
    WebBrowser.openBrowserAsync(url);
  };
  const [isActive, setIsActive] = useState(false);
  const [isSecondActive, setIsSecondActive] = useState(false);
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
        center={<Custom_HeaderTitle text="Terms & Conditions" />}
        right={<View />}
      />
      <View
        style={{
          flex: 8,
          marginHorizontal: 15,
          borderBottomWidth: borderWidth,
          borderColor: Colors.borderColor,
        }}
      >
        <ScrollView>
          <View style={{ height: 15, width: screenWidth }} />
          <Text style={[styles.textStyle, { marginBottom: 10 }]}>
            <Text style={styles.textBoldStyle}>NOTICE:</Text> There is a{" "}
            <Text style={styles.textBoldStyle}>20 XRP </Text>
            reserve requirement to activate any XRP wallets. Once an XRP address
            is funded with the 20 XRP, the activation fee will be locked by the
            XRP ledger network and is non-refundable and non-recoverable unless
            the network lowers the reserve requirement. In addition, the user
            must transfer and maintain at least{" "}
            <Text style={styles.textBoldStyle}>1 XRP </Text> to cover
            transaction fees for SOLO or other tokenized asset transactions.
            Transferring SOLO or trading SOLO on the decentralized exchange
            incurs a transaction fee of 0.01%.
          </Text>
          <Text style={[styles.textStyle, { marginBottom: 10 }]}>
            The 100% of this transaction fee will be burned instantly by being
            sent to the gateway’s issuing address. The system practices this
            deflationary mechanism to bring down the total supply of SOLO coins.
            This practice makes an equilibrium that in the long term makes it
            impossible for the SOLO coins to deplete due to higher valuation of
            coins and lower supply.
          </Text>
          <Text style={styles.textStyle}>
            <Text style={styles.textBoldStyle}>DISCLAIMER:</Text> SOLOGENIC
            WALLET IS A DECENTRALIZED AND OPEN SOURCE SOFTWARE WHICH KEEPS YOUR
            DATA ON YOUR DEVICES. THIS APPLICATION DOES NOT SEND YOUR DATA BACK
            TO ANY THIRD PARTY SERVERS. IF YOU LOSE YOUR PHRASES OR BACKUP KEYS,
            THEY WILL NOT BE RETRIEVABLE. YOUR USE OF THIS APPLICATION IS
            ENTIRELY AT YOUR OWN RISK.{" "}
            <Text
              style={[
                styles.textBoldStyle,
                {
                  textDecorationLine: "underline",
                },
              ]}
              onPress={() => handleOpenWithWebBrowser(config.githubUrl)}
            >
              {" "}
              See the full source code on GitHub
            </Text>
          </Text>
          <View
            style={{
              borderTopWidth: StyleSheet.hairlineWidth,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: colors.borderColor,
              marginTop: 15,
              paddingBottom: 7.5,
            }}
          >
            <Text
              style={[
                styles.textStyle,
                { marginTop: 15, textAlign: "center", fontSize: 11 },
              ]}
            >
              THIS SOFTWARE IS LICENSED UNDER THE GPL 3.0
            </Text>
            <Text
              style={[
                styles.textBoldStyle,
                { marginTop: 0, textAlign: "center", fontSize: 11 },
              ]}
            >
              WITHOUT ANY WARRANTY. USE AT OWN RISK
            </Text>
            <Text
              style={[
                styles.textBoldStyle,
                { marginTop: 5, textAlign: "center", fontSize: 16 },
              ]}
            >
              SOLOGENIC DECENTRALIZED WALLET
            </Text>
          </View>
          <Text style={[styles.textBoldStyle]}>License Agreement</Text>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 2.5,
          marginTop: 20,
          marginHorizontal: 15,
        }}
      >
        <View>
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 9,
                width: "90%",
              },
            ]}
          >
            By clicking on the button below or using this decentralized wallet,
            I confirm that I agree with the above{" "}
            <Text style={[styles.textBoldStyle, { fontSize: 9 }]}>
              “License Agreement”
            </Text>{" "}
            and{" "}
            <Text style={[styles.textBoldStyle, { fontSize: 9 }]}>
              “Disclaimer"
            </Text>
          </Text>

          <Custom_RadioButton
            pressed={isActive}
            onPress={() => (!isActive ? setIsActive(true) : setIsActive(false))}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: 20,
              width: 20,
              borderRadius: 10,
            }}
            imageStyle={{ height: 10, width: 10, borderRadius: 5 }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 9,
                width: "90%",
              },
            ]}
          >
            By clicking on the button below or using this decentralized wallet,
            I understand that If I lose my passwords, pins, phrases or backup
            keys, they will not be retrievable and there is NO support team to
            help me.
          </Text>

          <Custom_RadioButton
            pressed={isSecondActive}
            onPress={() =>
              !isSecondActive
                ? setIsSecondActive(true)
                : setIsSecondActive(false)
            }
            style={{
              position: "absolute",
              right: 0,
              top: 5,
              height: 20,
              width: 20,
              borderRadius: 10,
            }}
            imageStyle={{ height: 10, width: 10, borderRadius: 5 }}
          />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Custom_Button
            text="Next"
            onPress={() => completeOrientation(true)}
            color={isActive && isSecondActive ? Colors.text : Colors.grayText}
            size={14}
            textStyle={{ letterSpacing: 0.24, color: Colors.darkRed }}
            style={{
              marginTop: 15,
              backgroundColor:
                isActive && isSecondActive
                  ? Colors.darkRed
                  : Colors.headerBackground,
              paddingHorizontal: 15,
              paddingVertical: 10,
              zIndex: 100,
            }}
            disabled={!isActive || !isSecondActive}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            position: "absolute",
            bottom: 30,
            zIndex: 10,
          }}
        >
          <Text
            style={[
              styles.textBoldStyle,
              {
                fontSize: 9,
                textAlign: "center",
                width: "80%",
                marginBottom: 5,
              },
            ]}
          >
            {`If you do NOT agree, please close and remove this application immediately.`}
          </Text>
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 8,
                textAlign: "center",
                width: "80%",
              },
            ]}
          >
            {`© 2019-2020 SOLO CORE TEAM. All Rights Reserved. 
           Software Version ${appConfig.version}`}
          </Text>
        </View>
      </View>
    </View>
  );
}

TermsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  textStyle: {
    fontFamily: "DMSans",
    fontSize: 11,
    color: colors.text,
  },
  textBoldStyle: {
    fontFamily: "DMSansBold",
    fontSize: 11,
    color: colors.text,
  },
});

const mapDispatchToProps = dispatch => ({
  completeOrientation: isComplete =>
    dispatch(updateIsOrientationComplete(isComplete)),
});

export default connect(
  null,
  mapDispatchToProps,
)(TermsScreen);
