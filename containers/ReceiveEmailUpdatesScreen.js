import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_TextInput from "../components/shared/Custom_TextInput";
import Colors from "../constants/Colors";
import Custom_Button from "../components/shared/Custom_Button";
// import { setupAuthentication, authSuccess } from "../actions";
// import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";

export default function ReceiveEmailUpdatesScreen({ navigation }) {
  const [emailValue, onChangeEmailValue] = useState("");
  const {} = navigation.state.params;

  const skipSetup = () => {
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "HomeScreen" })]
      })
    );
  };

  return (
    <View style={styles.container}>
      <Custom_Header
        left={<View />}
        center={<Custom_HeaderTitle text="Receive Email Updates?" />}
        right={<View />}
      />
      <ScrollView>
        <View style={{ marginTop: 42 }}>
          <Custom_Text
            value="Enter your email and receive the latest updates and airdrops from Sologenic."
            style={{ textAlign: "center", marginBottom: 15 }}
            size={14}
          />
          <View>
            <Custom_TextInput
              value={emailValue}
              onChangeText={text => {
                onChangeEmailValue(text);
              }}
              label="Enter your Email Address"
              keyboardType="default"
              returnKeyType="done"
              // secureTextEntry={secureEntry}
              // placeholder="Optional"
              // placeholderTextColor={Colors.grayText}
            />
            <Custom_Text
              value="Optional"
              color={Colors.freshGreen}
              size={12}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Custom_Button
              text="Submit"
              onPress={() =>
                navigation.navigate({
                  key: "TermsScreen",
                  routeName: "TermsScreen",
                  // params: {
                  //   availableUnlockMethods,
                  //   unlockText,
                  //   isChangeScreen
                  // }
                })
              }
              color={Colors.secondaryBackground}
              size={14}
              textStyle={{
                letterSpacing: 0.24
              }}
              style={{
                backgroundColor: Colors.darkRed,
                paddingHorizontal: 15,
                paddingVertical: 10,
                marginBottom: 24
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 60, alignSelf: "center" }}>
        <TouchableOpacity onPress={() => skipSetup()}>
          <Custom_Text value="Skip this step >" style={{}} size={14} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
});

// const mapStateToProps = ({}) => ({});

// const mapDispatchToProps = dispatch => ({
//   completeAuthSetup: () => dispatch(setupAuthentication()),
//   authenticateUser: () => dispatch(authSuccess()),
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(CreatePinScreen);
