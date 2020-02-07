import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import * as LocalAuthentication from "expo-local-authentication";
import { StackActions, NavigationActions } from "react-navigation";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import Custom_Button from "../components/shared/Custom_Button";
import {
  createPinSuccess,
  setupAuthentication,
  authSuccess,
  updateUnlockMethod
} from "../actions";
import { screenWidth } from "../constants/Layout";

class ConfirmUnlockMethodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      showAuthError: false,
      showAuthSuccess: false,
      authErrorStr: "",
      authSuccessStr: ""
    };
  }

  componentDidMount() {
    this.authenticateAsync();
    this.getUnlockText();
  }

  componentWillUnmount() {
    this.resetAuth();
  }

  authenticateAsync = async () => {
    const { navigation } = this.props;
    const { availableUnlockMethods, isChangeScreen } = navigation.state.params;
    LocalAuthentication.hasHardwareAsync()
      .then(res => {
        if (res) {
          LocalAuthentication.isEnrolledAsync()
            .then(res => {
              if (res) {
                LocalAuthentication.authenticateAsync()
                  .then(res => {
                    if (res.success) {
                      if (availableUnlockMethods === "fingerprint") {
                        this.showAuthSuccess(`Fingerprint ID \nAuthorized`);
                      } else if (availableUnlockMethods === "faceId") {
                        this.showAuthSuccess(`Face ID \nAuthorized`);
                      }
                    } else {
                      if (availableUnlockMethods === "fingerprint") {
                        this.showAuthError(`Fingerprint ID Not \nRecognized`);
                      } else if (availableUnlockMethods === "faceId") {
                        this.showAuthError(`Face ID Not \nRecognized`);
                      }
                    }
                  })
                  .catch(err => console.log("err: ", err));
              } else {
                this.showAuthError(
                  `To use this feature you need to first\nset up ${
                    availableUnlockMethods === "fingerprint"
                      ? "Fingerprint"
                      : "Face"
                  } ID on your device.`
                );
              }
            })
            .catch(err => console.log("err: ", err));
        }
      })
      .catch(err => console.log("err: ", err));
  };

  resetAuth = () => {
    // const { navigation } = this.props;
    // const { availableUnlockMethods } = navigation.state.params;
    this.getUnlockText();
    this.setState({
      showAuthError: false,
      showAuthSuccess: false,
      authErrorStr: "",
      authSuccessStr: ""
    });
  };

  showAuthError = error => {
    this.setState({
      showAuthError: true,
      authErrorStr: error,
      text: "Try Again"
    });
  };

  showAuthSuccess = str => {
    this.setState({
      showAuthSuccess: true,
      authSuccessStr: str
    });
    this.completeSetup();
  };

  getUnlockText = () => {
    const { navigation } = this.props;
    const { availableUnlockMethods } = navigation.state.params;
    if (availableUnlockMethods === "fingerprint") {
      this.setState({ text: "Touch Sensor Now" });
    } else if (availableUnlockMethods === "faceId") {
      this.setState({ text: "Look at Sensor Now" });
    }
  };

  getAuthSuccessText = () => {
    const { navigation } = this.props;
    const { availableUnlockMethods } = navigation.state.params;
    if (availableUnlockMethods === "fingerprint") {
      this.setState({ authSuccessText: `Fingerprint ID Authorized` });
    } else if (availableUnlockMethods === "faceId") {
      this.setState({ authSuccessText: "Face ID Authorized" });
    }
  };

  completeSetup = () => {
    const {
      completeAuthSetup,
      authenticateUser,
      navigation,
      saveUnlockMethod
    } = this.props;
    const { availableUnlockMethods, isChangeScreen } = navigation.state.params;
    if (isChangeScreen) {
      setTimeout(() => saveUnlockMethod(availableUnlockMethods), 0);
      setTimeout(() => navigation.pop(2), 1000);
    } else {
      completeAuthSetup();
      authenticateUser();
      navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "HomeScreen" })]
        })
      );
      setTimeout(() => saveUnlockMethod(availableUnlockMethods), 100);
    }
  };

  render() {
    const { navigation } = this.props;
    const { unlockText, availableUnlockMethods } = navigation.state.params;
    const {
      text,
      showAuthError,
      showAuthSuccess,
      authSuccessStr,
      authErrorStr
    } = this.state;

    const getUnlockImage = () => {
      if (availableUnlockMethods === "fingerprint") {
        if (showAuthError) {
          return Images.fingerPrintRed;
        } else if (showAuthSuccess) {
          return Images.fingerPrintGreen;
        }
        return Images.fingerPrint;
      } else if (availableUnlockMethods === "faceId") {
        if (showAuthError) {
          return Images.faceRed;
        } else if (showAuthSuccess) {
          return Images.faceGreen;
        }
        return Images.face;
      }
    };

    return (
      <View style={styles.container}>
        <Custom_Header
          center={<Custom_HeaderTitle text={unlockText} />}
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
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 42 }}>
            <Image
              source={getUnlockImage()}
              style={{
                alignSelf: "center",
                marginBottom: 24
              }}
            />
            {showAuthError && (
              <View>
                <Custom_Text
                  value={authErrorStr}
                  style={{ textAlign: "center" }}
                  size={16}
                />
                <Image
                  source={Images.smallErrIcon}
                  style={{ alignSelf: "center", marginVertical: 10 }}
                />
              </View>
            )}

            {showAuthSuccess ? (
              <Custom_Text
                value={authSuccessStr}
                style={{ textAlign: "center", marginBottom: 15 }}
                size={16}
              />
            ) : showAuthError ? (
              <View style={{ alignItems: "center" }}>
                <Custom_Button
                  text={text}
                  onPress={() => {
                    this.resetAuth();
                    this.authenticateAsync();
                  }}
                  color={Colors.secondaryBackground}
                  size={14}
                  textStyle={{
                    letterSpacing: 0.24
                  }}
                  style={{
                    backgroundColor: Colors.darkRed,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    marginTop: 50
                  }}
                />
              </View>
            ) : (
              <Custom_Text
                value={text}
                style={{ textAlign: "center", marginBottom: 15 }}
                color={Colors.lightGray}
                size={16}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
});

const mapStateToProps = ({ unlockMethod }) => ({ unlockMethod });

const mapDispatchToProps = dispatch => ({
  completeAuthSetup: () => dispatch(setupAuthentication()),
  authenticateUser: () => dispatch(authSuccess()),
  saveUnlockMethod: data => dispatch(updateUnlockMethod(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmUnlockMethodScreen);
