import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import PinView from "react-native-pin-view";
import Constants from "expo-constants";
import * as LocalAuthentication from "expo-local-authentication";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import Custom_Button from "../components/shared/Custom_Button";
import { authSuccess } from "../actions";
import { isIos } from "../constants/Layout";
class UnlockScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeCreated: false,
      codeMatched: false,
      code: null,
      showCodeError: false,
      availableUnlockMethods: null,
      showModal: false,
      showFailedMessage: false,
      unlockText: "",
      text: "",
      isModalVisible: false,
      showAuthError: false,
      showAuthSuccess: false,
    };
  }

  componentDidMount() {
    this.authenticateAsync();
  }

  authenticateAsync = async () => {
    const { unlockMethod, isAuthenticated } = this.props;
    if (unlockMethod !== null && !isAuthenticated) {
      LocalAuthentication.hasHardwareAsync()
        .then(res => {
          if (res) {
            if (unlockMethod === "fingerprint") {
              this.setState({
                unlockText: "Unlock with Fingerprint",
                isModalVisible: true,
              });
            } else if (unlockMethod === "faceId") {
              this.setState({
                unlockText: "Unlock with Face ID",
                isModalVisible: true,
              });
            }

            this.getUnlockText();
            LocalAuthentication.isEnrolledAsync()
              .then(res => {
                if (res) {
                  LocalAuthentication.authenticateAsync()
                    .then(res => {
                      if (res.success) {
                        if (unlockMethod === "fingerprint") {
                          this.showAuthSuccess(`Fingerprint \nAuthorized`);
                        } else if (unlockMethod === "faceId") {
                          this.showAuthSuccess(`Face ID \nAuthorized`);
                        }
                        this.props.authenticateUser();
                      } else {
                        if (unlockMethod === "fingerprint") {
                          this.showAuthError(`Fingerprint Not \nRecognized`);
                        } else if (unlockMethod === "faceId") {
                          this.showAuthError(`Face ID Not \nRecognized`);
                        }
                      }
                    })
                    .catch(err => console.log("err: ", err));
                } else {
                  this.showAuthError(
                    `To use this feature you need to first\nset up Face ID on your device.`,
                  );
                }
              })
              .catch(err => console.log("err: ", err));
          }
        })
        .catch(err => console.log("err: ", err));
    }
  };

  resetAuth = () => {
    this.getUnlockText();
    this.setState({
      showAuthError: false,
      showAuthSuccess: false,
      authErrorStr: "",
      authSuccessStr: "",
    });
  };

  showAuthError = error => {
    this.setState({
      showAuthError: true,
      authErrorStr: error,
      text: "Try Again",
    });
  };

  showAuthSuccess = str => {
    this.setState({
      showAuthSuccess: true,
      authSuccessStr: str,
    });
  };

  getUnlockText = () => {
    const { unlockMethod } = this.props;
    if (unlockMethod === "fingerprint") {
      this.setState({ text: "Touch Sensor Now" });
    } else if (unlockMethod === "faceId") {
      this.setState({ text: "Look at Sensor Now" });
    }
  };

  getUnlockImage = () => {
    const { showAuthError, showAuthSuccess } = this.state;
    const { unlockMethod } = this.props;
    if (unlockMethod === "fingerprint") {
      if (showAuthError) {
        return Images.fingerPrintRed;
      } else if (showAuthSuccess) {
        return Images.fingerPrintGreen;
      }
      return Images.fingerPrint;
    } else if (unlockMethod === "faceId") {
      if (showAuthError) {
        return Images.faceRed;
      } else if (showAuthSuccess) {
        return Images.faceGreen;
      }
      return Images.face;
    }
  };

  render() {
    const { authenticateUser, pin } = this.props;
    const {
      showCodeError,
      codeMatched,
      isModalVisible,
      unlockText,
      showAuthError,
      authErrorStr,
      text,
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ marginTop: Constants.statusBarHeight + 42 }}>
            <View>
              <Image source={Images.fullLogo} style={{ alignSelf: "center" }} />
              <Custom_Text
                value="Wallet"
                style={{
                  textAlign: "center",
                  marginBottom: 24,
                }}
                size={48}
              />
            </View>
            <View>
              {showCodeError && (
                <View
                  style={{
                    position: "absolute",
                    top: 40,
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
                      value="PIN is incorrect"
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
              <View style={{ marginTop: 0 }}>
                <PinView
                  disabled={codeMatched}
                  onComplete={(val, clear) => {
                    if (val === pin) {
                      this.setState({
                        codeMatched: true,
                        showCodeError: false,
                      });
                      setTimeout(() => authenticateUser(), 1000);
                    } else {
                      this.setState({
                        codeMatched: false,
                        showCodeError: true,
                      });
                      clear();
                    }
                  }}
                  pinLength={4}
                  inputViewStyle={{
                    marginHorizontal: 20,
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
              </View>
            </View>
          </View>
        </ScrollView>

        <Modal
          visible={isModalVisible && !isIos}
          animationType={"none"}
          transparent={true}
          onRequestClose={() => {}}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: Colors.modalBackground,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.buttonText,
                marginHorizontal: 40,
                borderRadius: 10,
                padding: 20,
              }}
            >
              <View>
                <Custom_Text
                  value={unlockText}
                  style={{
                    marginBottom: 30,
                    textAlign: "center",
                  }}
                  color={Colors.text}
                  size={20}
                  isBold
                />
              </View>
              <View>
                <Image
                  source={this.getUnlockImage()}
                  style={{
                    alignSelf: "center",
                    height: 66,
                    width: 66,
                    marginBottom: 16,
                  }}
                />
                {showAuthError && (
                  <Custom_Text
                    value={authErrorStr}
                    style={{
                      textAlign: "center",
                    }}
                    color={Colors.text}
                    size={12}
                  />
                )}
                <TouchableOpacity onPress={() => this.authenticateAsync()}>
                  <Custom_Text
                    value={text}
                    style={{
                      textAlign: "center",
                      marginTop: 8,
                    }}
                    color={Colors.grayText}
                    size={12}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => this.setState({ isModalVisible: false })}
                >
                  <Custom_Text
                    value="Use PIN"
                    style={{
                      marginTop: 10,
                    }}
                    size={14}
                    isBold
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
    backgroundColor: Colors.background,
  },
});

const mapStateToProps = ({ pin, unlockMethod, isAuthenticated }) => ({
  pin,
  unlockMethod,
  isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  authenticateUser: () => dispatch(authSuccess()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnlockScreen);
