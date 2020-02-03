import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal
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
import { screenWidth, borderWidth } from "../constants/Layout";

class ChangeUnlockScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      showAuthError: false,
      showAuthSuccess: false,
      authErrorStr: "",
      authSuccessStr: "",
      isModalVisible: false
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
    const { availableUnlockMethods } = navigation.state.params;
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
    const { navigation, saveUnlockMethod } = this.props;
    const { availableUnlockMethods } = navigation.state.params;
    this.setState({ isModalVisible: true });
    // setTimeout(() => saveUnlockMethod(availableUnlockMethods), 0);
    // setTimeout(() => navigation.goBack(), 1000);
  };

  render() {
    const { navigation, saveUnlockMethod } = this.props;
    const { unlockText, availableUnlockMethods } = navigation.state.params;
    const {
      text,
      showAuthError,
      showAuthSuccess,
      authSuccessStr,
      authErrorStr,
      isModalVisible
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
          center={<Custom_HeaderTitle text={`Authorize ${unlockText}`} />}
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
        <Modal
          visible={isModalVisible}
          animationType={"none"}
          transparent={true}
          onRequestClose={() => {}}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: Colors.modalBackground
            }}
          >
            <View
              style={{
                backgroundColor: Colors.buttonText,
                marginHorizontal: 40,
                borderRadius: 10,
                padding: 20
              }}
            >
              <View>
                <Custom_Text
                  value={`Disable ${unlockText}`}
                  style={{
                    textAlign: "center"
                  }}
                  color={Colors.text}
                  size={20}
                  isBold
                />
              </View>
              <View
                style={{
                  marginVertical: 24,
                  paddingBottom: 24,
                  borderBottomWidth: borderWidth,
                  borderColor: Colors.borderColor
                }}
              >
                <Custom_Text
                  value="Your PIN number will be used for authorization instead"
                  size={12}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    this.resetAuth();
                    this.authenticateAsync();
                    this.setState({ isModalVisible: false });
                  }}
                  style={{ flex: 1 }}
                >
                  <Custom_Text
                    value="CANCEL"
                    style={{
                      letterSpacing: 1.25,
                      textAlign: "right"
                    }}
                    color={Colors.grayText}
                    size={14}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.resetAuth();
                    saveUnlockMethod(null);
                    this.setState({ isModalVisible: false });
                    navigation.goBack();
                  }}
                  style={{ flex: 1 }}
                >
                  <Custom_Text
                    value="CONFIRM"
                    style={{
                      textAlign: "right",
                      letterSpacing: 1.25
                    }}
                    color={Colors.freshGreen}
                    size={14}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  saveUnlockMethod: data => dispatch(updateUnlockMethod(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUnlockScreen);
