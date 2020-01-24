import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Custom_RadioButton from "../components/shared/Custom_RadioButton";
import Custom_Modal from "../components/shared/Custom_Modal";
import RecoveryPhrase from "../components/shared/RecoveryPhrase";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import { genereateRandomNumbers } from "../utils";

export default function YourRecoveryPhraseScreen({ navigation }) {
  const [pressed, handlePressDots] = useState(false);
  const {
    mnemonic,
    nickname,
    walletAddress,
    rippleClassicAddress,
  } = navigation.state.params;
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
            icon="md-arrow-back"
            iconColor={Colors.text}
          />
        }
        center={<Custom_HeaderTitle text="Your Recovery Phrase" />}
        right={<View />}
      />
      <ScrollView>
        <View style={styles.section}>
          <Custom_Text
            value="The sequence of words below is your Recovery Phrase. You need this to regain access to your XRP. You should never share this with anyone."
            size={Fonts.size.normal}
            color={Colors.text}
          />
        </View>
        <View style={styles.section}>
          <RecoveryPhrase phrase={mnemonic} />
        </View>
        <View
          style={[
            styles.section,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <Custom_Button
              text="Copy"
              onPress={() => {
                console.log("Press Next");
              }}
              style={{ height: 40, width: 80, backgroundColor: "transparent" }}
              icon="content-copy"
              isBold={false}
            />
            <Custom_Button
              text="Share"
              onPress={() => {
                console.log("Press Next");
              }}
              style={{ height: 40, width: 80, backgroundColor: "transparent" }}
              icon="md-share"
              isBold={false}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Custom_Button
              text="Print"
              onPress={() => {
                console.log("Press Next");
              }}
              style={{ height: 40, width: 80, backgroundColor: "transparent" }}
              icon="ios-print"
              color={Colors.text}
              isBold={false}
            />
            <Custom_Button
              text="Show QR"
              onPress={() => {
                console.log("Press Next");
              }}
              style={{ height: 40, width: 80, backgroundColor: "transparent" }}
              icon="qrcode"
              color={Colors.text}
              isBold={false}
            />
          </View>
        </View>
        <View
          style={[
            styles.section,
            {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 60,
            },
          ]}
        >
          <View style={{ flex: 8.5 }}>
            <Custom_Text
              value="I have written down my passphrase, and I understand that without it I will not have access to my wallet should I lose it."
              size={Fonts.size.normal}
            />
          </View>
          <View style={{ flex: 1.5, alignItems: "flex-end" }}>
            <Custom_RadioButton
              pressed={pressed}
              onPress={() =>
                !pressed ? handlePressDots(true) : handlePressDots(false)
              }
            />
          </View>
        </View>
        <View style={[styles.section, { alignItems: "flex-end" }]}>
          <Custom_Button
            text="Next"
            onPress={() => {
              const randomNumbers = genereateRandomNumbers();
              navigation.navigate({
                routeName: "RecoveryPhraseTestScreen",
                key: "RecoveryPhraseTestScreen",
                params: {
                  randomNumbers,
                  phrase: mnemonic,
                  nickname,
                  walletAddress,
                  rippleClassicAddress,
                },
              });
            }}
            style={{
              height: 40,
              width: 80,
              backgroundColor: !pressed
                ? Colors.headerBackground
                : Colors.darkRed,
            }}
            color={!pressed ? Colors.grayText : Colors.text}
            icon="ios-arrow-forward"
            disabled={!pressed}
          />
        </View>
      </ScrollView>
    </View>
  );
}

YourRecoveryPhraseScreen.navigationOptions = {
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
});
