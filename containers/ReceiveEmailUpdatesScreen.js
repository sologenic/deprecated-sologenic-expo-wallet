import React, { useState } from "react";
import {
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
import { updateIsOrientationComplete } from "../actions";

function ReceiveEmailUpdatesScreen({ navigation, completeOrientation }) {
  const [emailValue, onChangeEmailValue] = useState("");
  const skipSetup = () => {
    completeOrientation(true);
  };

  return (
    <View style={styles.container}>
      <Custom_Header
        left={<View />}
        center={<Custom_HeaderTitle text="Receive Email Updates?" />}
        right={<View />}
      />
      <View>
        <View style={{}}>
          <View style={{ marginHorizontal: 47, marginTop: 30, marginBottom: 20 }}>
            <Custom_Text
              value="Enter your email and receive the latest updates and airdrops from Sologenic."
              style={{ textAlign: "center", marginBottom: 15 }}
              style={{ marginBottom: 15 }}
              size={14}
            />
          </View>
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
            />
            <View style={{ marginTop: 5, marginLeft: 30 }}>
              <Custom_Text
                value="Optional"
                color={Colors.freshGreen}
                size={12}
              />
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Custom_Button
              text="Submit"
              onPress={() => completeOrientation(true)}
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
      </View>
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

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => ({
  completeOrientation: isComplete =>
    dispatch(updateIsOrientationComplete(isComplete)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReceiveEmailUpdatesScreen);
