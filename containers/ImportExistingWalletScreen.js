import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Clipboard
} from "react-native";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Custom_RadioButton from "../components/shared/Custom_RadioButton";
import Custom_Modal from "../components/shared/Custom_Modal";
import Custom_TextInput from "../components/shared/Custom_TextInput";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import { countWords } from "../utils";
import PassphraseTab from "./PassphraseTab";
import WalletAddressSecretTab from "./WalletAddressSecretTab";

export default function ImportExistingWalletScreen({ navigation }) {
  const [tab, handleTabView] = useState(1);
  // const [textValue, onChangeText] = useState("");
  // const [completed, handleIsCompleted] = useState(false);

  // const getContentFromClipboard = async () => {
  //   const content = await Clipboard.getString();
  //   await onChangeText(content);
  // };

  // useEffect(() => {
  //   const result = countWords(textValue);
  //   if (textValue) {
  //     handleIsCompleted(true);
  //   } else {
  //     handleIsCompleted(false);
  //   }
  // });

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
        center={<Custom_HeaderTitle text="Import Existing Wallet" />}
        right={<View />}
      />
      <View
        style={{
          flexDirection: "row",
          height: 50,
          backgroundColor: Colors.headerBackground
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleTabView(1);
          }}
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            },
            tab === 1
              ? {
                  borderBottomColor: Colors.text,
                  borderBottomWidth: 2
                }
              : {}
          ]}
        >
          <Custom_Text value="Passphrase" size={Fonts.size.normal} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleTabView(2);
          }}
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            },
            tab === 2
              ? {
                  borderBottomColor: Colors.text,
                  borderBottomWidth: 2
                }
              : {}
          ]}
        >
          <Custom_Text
            value="Wallet Address + Secret"
            size={Fonts.size.normal}
          />
        </TouchableOpacity>
      </View>
      {tab === 1 ? (
        <PassphraseTab navigation={navigation}/>
        // <View>
        //   <View
        //     style={[
        //       styles.section,
        //       { marginHorizontal: 40, marginTop: 30, marginBottom: 10 }
        //     ]}
        //   >
        //     <Custom_Text
        //       value="Enter the 12 word passphrase that was given to you when you created your account."
        //       size={Fonts.size.small}
        //       isBold
        //     />
        //   </View>
        //   <View
        //     style={[
        //       styles.section,
        //       { marginHorizontal: 40, marginTop: 10, marginBottom: 10 }
        //     ]}
        //   >
        //     <Custom_Text
        //       value="You should have written it down in a safe place upon creation as prompted."
        //       size={Fonts.size.small}
        //     />
        //   </View>
        //   <View style={styles.passphraseTextInputContainer}>
        //     <View>
        //       <Custom_Text
        //         value="Passphrase"
        //         size={Fonts.size.small}
        //         color={Colors.lightGray}
        //       />
        //     </View>
        //     <View style={styles.passphraseTextInput}>
        //       <TextInput
        //         value={textValue}
        //         onChangeText={text => {
        //           onChangeText(text);
        //         }}
        //         multiline={true}
        //         numberOfLines={2}
        //         keyboardType="default"
        //         returnKeyType="done"
        //         blurOnSubmit={true}
        //         style={{
        //           fontFamily: "Titillium",
        //           fontSize: Fonts.size.medium,
        //           color: Colors.text,
        //           height: 60,
        //           marginBottom: 5
        //         }}
        //       />
        //     </View>
        //     <View
        //       style={{
        //         justifyContent: "center",
        //         alignItems: "flex-end",
        //         marginVertical: 5
        //       }}
        //     >
        //       <TouchableOpacity onPress={getContentFromClipboard}>
        //         <Custom_Text
        //           value="Paste"
        //           size={Fonts.size.small}
        //           color={Colors.freshGreen}
        //         />
        //       </TouchableOpacity>
        //     </View>
        //   </View>
        //   <View style={styles.addWalletContainer}>
        //     <Custom_Button
        //       text="Add Wallet"
        //       onPress={() => {
        //         console.log("Press Add Wallet");
        //       }}
        //       style={{
        //         height: 40,
        //         width: 100,
        //         backgroundColor: !completed
        //           ? Colors.headerBackground
        //           : Colors.darkRed
        //       }}
        //       color={!completed ? Colors.grayText : Colors.text}
        //       disabled
        //     />
        //   </View>
        // </View>
      ) : (
        <WalletAddressSecretTab navigation={navigation}/>
        // <View>
        //   <View style={{ marginTop: 50, marginBottom: 10 }}>
        //     <Custom_TextInput
        //       value={textValue}
        //       onChangeText={text => {
        //         onChangeText(text);
        //       }}
        //       label="Account Address"
        //       keyboardType="default"
        //       returnKeyType="done"
        //     />
        //   </View>
        //   <View style={{ marginTop: 5, marginBottom: 10 }}>
        //     <Custom_TextInput
        //       value={textValue}
        //       onChangeText={text => {
        //         onChangeText(text);
        //       }}
        //       label="Account Secrent"
        //       keyboardType="default"
        //       returnKeyType="done"
        //     />
        //   </View>
        //   <View style={{ marginTop: 5 }}>
        //     <Custom_TextInput
        //       value={textValue}
        //       onChangeText={text => {
        //         onChangeText(text);
        //       }}
        //       label="Account Nickname"
        //       keyboardType="default"
        //       returnKeyType="done"
        //     />
        //     <View style={{ marginLeft: 30 }}>
        //       <Custom_Text value="Optional" size={Fonts.size.normal} color={Colors.freshGreen}/>
        //     </View>
        //   </View>
        //   <View style={[styles.addWalletContainer, { marginTop: 70 }]}>
        //     <Custom_Button
        //       text="Add Wallet"
        //       onPress={() => {
        //         console.log("Press Add Wallet");
        //       }}
        //       style={{
        //         height: 40,
        //         width: 100,
        //         backgroundColor: !completed
        //           ? Colors.headerBackground
        //           : Colors.darkRed
        //       }}
        //       color={!completed ? Colors.grayText : Colors.text}
        //       disabled
        //     />
        //   </View>
        // </View>
      )}
    </View>
  );
}

ImportExistingWalletScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
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
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginHorizontal: 20,
    marginVertical: 50
  }
});
