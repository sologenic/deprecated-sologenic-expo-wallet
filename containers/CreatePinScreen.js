import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as LocalAuthentication from "expo-local-authentication";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import Custom_Button from "../components/shared/Custom_Button";
import { createPinSuccess } from "../actions";

class CreatePinScreen extends React.Component {
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

  componentDidMount = async () => {
    LocalAuthentication.hasHardwareAsync()
      .then(res => {
        if (res) {
          LocalAuthentication.supportedAuthenticationTypesAsync().then(res => {
            if (res.includes(1) && !res.includes(2)) {
              this.setState({
                unlockText: "Enable Fingerprint ID",
                availableUnlockMethods: "fingerprint",
              });
            } else if (res.includes(2) && !res.includes(1)) {
              this.setState({
                unlockText: "Enable Face ID",
                availableUnlockMethods: "faceId",
              });
            } else if (res.includes(1) && res.includes(2)) {
              this.setState({
                unlockText: "Choose Unlock Method",
                availableUnlockMethods: "both",
              });
            } else {
              this.setState({ unlockText: null });
            }
          });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      screenProps: { rootNavigation },
    } = this.props;
    const { unlockText, availableUnlockMethods } = this.state;
    //   const [pressed, setPressed] = useState(false);
    //   const [modalVisible, setModalVisible] = useState(false);
    //   const [textValue, onChangeText] = useState("");
    return (
      <View style={styles.container}>
        <Custom_Header
          flex={[0, 1, 0]}
          center={<Custom_HeaderTitle text="Please Create a PIN Number" />}
        />
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              marginTop: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Custom_Button
              text="Next"
              onPress={() =>
                rootNavigation.navigate({
                  key: "SetupUnlockScreen",
                  routeName: "SetupUnlockScreen",
                  params: {
                    unlockText,
                    availableUnlockMethods,
                  },
                })
              }
              color={Colors.darkRed}
              size={14}
              textStyle={{ letterSpacing: 0.24, color: Colors.darkRed }}
              style={{
                backgroundColor: Colors.secondaryBackground,
                paddingHorizontal: 15,
                paddingVertical: 10,
                marginBottom: 24,
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

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => ({
  createPin: data => dispatch(createPinSuccess(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePinScreen);
