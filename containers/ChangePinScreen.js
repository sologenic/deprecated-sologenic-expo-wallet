import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as LocalAuthentication from "expo-local-authentication";
import PinView from "react-native-pin-view";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import Custom_Button from "../components/shared/Custom_Button";
import { createPinSuccess, authSuccess, setupAuthentication } from "../actions";

class ChangePinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeCreated: false,
      codeMatched: false,
      code: null,
      showCodeError: false,
      unlockText: null,
      showModal: false,
      selectedMethod: null,
      availableUnlockMethods: null,
    };
  }

  isFormReady = () => {
    return this.state.codeMatched;
  };

  render() {
    const { navigation, createPin } = this.props;
    const {
      unlockText,
      availableUnlockMethods,
      codeCreated,
      showCodeError,
      code,
      codeMatched,
    } = this.state;
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
          center={
            <Custom_HeaderTitle
              text={
                codeCreated
                  ? "Confirm your PIN Number"
                  : "Create your PIN Number"
              }
            />
          }
        />
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: "center",
              marginHorizontal: 15,
            }}
          >
            {showCodeError && (
              <View
                style={{
                  position: "absolute",
                  top: 82,
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Custom_Text
                    value="Entered PIN's don't match."
                    style={{
                      textAlign: "center",
                      marginRight: 10,
                    }}
                    color={Colors.errorBackground}
                    size={16}
                  />
                  <Image source={Images.smallErrIcon} />
                </View>
              </View>
            )}
            {codeMatched && (
              <View
                style={{
                  position: "absolute",
                  top: 82,
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Custom_Text
                    value="PIN Successfully Created"
                    style={{
                      marginBottom: 20,
                      marginRight: 10,
                    }}
                    color={Colors.freshGreen}
                    size={16}
                  />
                  <Image
                    source={Images.smallSuccessIcon}
                    style={{ marginTop: 3 }}
                  />
                </View>
              </View>
            )}
            <View style={{ marginTop: 42 }}>
              {!codeCreated ? (
                <PinView
                  onComplete={(val, clear) => {
                    this.setState({
                      codeCreated: true,
                      code: val,
                      showCodeError: false,
                    });
                    clear();
                  }}
                  pinLength={4}
                  inputViewStyle={{
                    marginHorizontal: 20,
                    marginBottom: 10,
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: Colors.text,
                  }}
                  inputBgOpacity={1}
                  inputBgColor={Colors.buttonText}
                  inputActiveBgColor={Colors.mainBackground}
                  buttonBgColor={Colors.pinInputBackground}
                  keyboardViewTextStyle={{
                    fontFamily: "DMSansBold",
                    fontSize: 24,
                    color: Colors.text,
                    tintColor: Colors.text,
                  }}
                  keyboardViewStyle={{
                    marginVertical: 8,
                    height: 64,
                    width: 64,
                  }}
                  keyboardContainerStyle={{
                    marginTop: 48,
                    marginBottom: 0,
                  }}
                  keyboardViewItemText={{
                    tintColor: Colors.text,
                  }}
                />
              ) : (
                <PinView
                  disabled={codeMatched}
                  onComplete={(val, clear) => {
                    if (val === code) {
                      this.setState({
                        showCodeError: false,
                        codeMatched: true,
                      });
                      createPin(code);
                      if (!availableUnlockMethods) {
                        setTimeout(this.completeAuthSetup(), 1000);
                      } else {
                        setTimeout(
                          () =>
                            rootNavigation.navigate({
                              key: "SetupUnlockScreen",
                              routeName: "SetupUnlockScreen",
                              params: {
                                unlockText,
                                availableUnlockMethods,
                              },
                            }),
                          1000,
                        );
                      }
                    } else {
                      this.setState({
                        codeCreated: false,
                        code: null,
                        showCodeError: true,
                      });
                      clear();
                    }
                  }}
                  pinLength={4}
                  inputViewStyle={{
                    marginHorizontal: 20,
                    marginBottom: 10,
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: codeMatched ? Colors.freshGreen : Colors.text,
                  }}
                  inputBgOpacity={1}
                  inputBgColor={Colors.buttonText}
                  inputActiveBgColor={
                    codeMatched ? Colors.freshGreen : Colors.text
                  }
                  buttonBgColor={Colors.pinInputBackground}
                  keyboardViewTextStyle={{
                    fontFamily: "DMSansBold",
                    fontSize: 24,
                    color: Colors.text,
                    tintColor: Colors.text,
                  }}
                  keyboardViewStyle={{
                    marginVertical: 8,
                    height: 64,
                    width: 64,
                  }}
                  keyboardContainerStyle={{
                    marginTop: 48,
                    marginBottom: 0,
                  }}
                  keyboardViewItemText={{
                    tintColor: Colors.text,
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => ({
  createPin: data => dispatch(createPinSuccess(data)),
  completeAuthSetup: () => dispatch(setupAuthentication()),
  authenticateUser: () => dispatch(authSuccess()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePinScreen);
