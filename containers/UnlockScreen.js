import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import PinView from "react-native-pin-view";
import Constants from "expo-constants";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import Custom_Button from "../components/shared/Custom_Button";
import { authSuccess } from "../actions";

class UnlockScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeCreated: false,
      codeMatched: false,
      code: null,
      showCodeError: false,
      supportedAuthTypes: [],
      showModal: false,
      showFailedMessage: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.userPinConfirmed && this.props.userPinConfirmed) {
      this.props.navigation.popToTop();
    }
  }

  render() {
    const { authenticateUser, pin } = this.props;
    const { showCodeError, codeMatched } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ marginTop: Constants.statusBarHeight + 42 }}>
            <View>
              <Custom_Text
                value="Wallet"
                style={{
                  textAlign: "center",
                  marginBottom: 24,
                }}
                size={48}
              />
            </View>
            {showCodeError && (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Custom_Text
                    value="PIN is incorrect."
                    style={{
                      textAlign: "center",
                      marginRight: 10,
                    }}
                    color={Colors.errorBackground}
                    size={16}
                  />
                  <Image source={Images.smallErrIcon} />
                </View>
                <Custom_Text
                  value="Try again."
                  style={{
                    marginTop: 10,
                    marginBottom: 20,
                    textAlign: "center",
                  }}
                  color={Colors.text}
                  size={16}
                />
              </View>
            )}
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
              inputActiveBgColor={codeMatched ? Colors.freshGreen : Colors.text}
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

const mapStateToProps = ({ pin }) => ({ pin });

const mapDispatchToProps = dispatch => ({
  authenticateUser: () => dispatch(authSuccess()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnlockScreen);
