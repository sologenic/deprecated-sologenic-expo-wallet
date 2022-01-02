import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import * as WebBrowser from "expo-web-browser";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_TextInput from "../components/shared/Custom_TextInput";
import Colors from "../constants/Colors";
import Custom_Button from "../components/shared/Custom_Button";
import {
  updateIsOrientationComplete,
  requestNewsLetterSignup,
} from "../actions";
import ErrorModal from "../components/shared/ErrorModal";
import SuccessModal from "../components/shared/SuccessModal";
import colors from "../constants/Colors";
import config from "../constants/config";
import Fonts from "../constants/Fonts";

function ReceiveEmailUpdatesScreen({
  requestNewsLetterSignup,
  completeOrientation,
  requestNewsLetterSignupPending,
  requestNewsLetterSignupSuccess,
  requestNewsLetterSignupError,
}) {
  const [emailValue, onChangeEmailValue] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (requestNewsLetterSignupError) {
      setShowErrorModal(true);
    }
    if (requestNewsLetterSignupSuccess) {
      setShowSuccessModal(true);
    }
  }, [
    requestNewsLetterSignupPending,
    requestNewsLetterSignupSuccess,
    requestNewsLetterSignupError,
  ]);

  const validateEmail = email => {
    var re = /^([a-zA-Z0-9_\-\.+]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (re.test(email)) {
      setEmailIsValid(true);
      requestNewsLetterSignup(emailValue);
    } else {
      setEmailIsValid(false);
    }
  };

  return (
    <View style={styles.container}>
      <Custom_Header
        left={<View />}
        center={<Custom_HeaderTitle text="Receive Email Updates?" />}
        right={<View />}
      />

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
          {!emailIsValid && (
            <Custom_Text
              value="Please enter a valid email address."
              color={Colors.errorBackground}
              size={12}
              style={{ marginLeft: 40, marginTop: 5 }}
              isBold
            />
          )}
        </View>
        <View style={{ marginHorizontal: 15, marginTop: 20 }}>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 15,
              fontFamily: "DMSans",
              color: colors.text,
              fontSize: Fonts.size.small,
            }}
            size={14}
          >
            By entering your email address, you confirm that you agree with the{" "}
            <Text
              onPress={() => WebBrowser.openBrowserAsync(config.privacyUrl)}
              style={{
                textDecorationLine: "underline",
              }}
            >
              privacy policy.
            </Text>
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Custom_Button
            text="Submit"
            onPress={() => validateEmail(emailValue)}
            color={
              emailValue !== "" ? Colors.secondaryBackground : Colors.grayText
            }
            size={14}
            textStyle={{
              letterSpacing: 0.24,
            }}
            style={{
              backgroundColor: emailValue !== "" ? Colors.darkRed : Colors.gray,
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginBottom: 24,
              marginTop: 40,
            }}
            disabled={emailValue === ""}
            isPending={requestNewsLetterSignupPending}
          />
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 60, alignSelf: "center" }}>
        <TouchableOpacity onPress={() => completeOrientation(true)}>
          <Custom_Text value="Skip this step >" style={{}} size={14} />
        </TouchableOpacity>
      </View>
      <ErrorModal
        onClose={() => setShowErrorModal(false)}
        modalVisible={showErrorModal}
        value="An error occured, please try again."
      />
      <SuccessModal
        onClose={() => {
          setShowSuccessModal(false);
          completeOrientation(true);
        }}
        modalVisible={showSuccessModal}
        value="You have been signed up to receive the latest updates from Sologenic."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

const mapStateToProps = ({
  requestNewsLetterSignupPending,
  requestNewsLetterSignupSuccess,
  requestNewsLetterSignupError,
}) => ({
  requestNewsLetterSignupPending,
  requestNewsLetterSignupSuccess,
  requestNewsLetterSignupError,
});

const mapDispatchToProps = dispatch => ({
  completeOrientation: isComplete =>
    dispatch(updateIsOrientationComplete(isComplete)),
  requestNewsLetterSignup: email => dispatch(requestNewsLetterSignup(email)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReceiveEmailUpdatesScreen);
