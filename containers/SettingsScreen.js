import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import * as LocalAuthentication from "expo-local-authentication";
import { persistStore } from "redux-persist";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Colors from "../constants/Colors";
import Custom_NavButton from "../components/shared/Custom_NavButton";
import Custom_MultiSelectInput from "../components/shared/Custom_MultiSelectInput";
import currencies from "../constants/currencies";
import { updateBaseCurrency, getMarketData, purgeStore } from "../actions";
import config from "../constants/config";
import appConfig from "../app.config";
import ResetDataModal from "../components/shared/ResetDataModal";
import { screenWidth } from "../constants/Layout";

function SettingsScreen({
  navigation,
  unlockMethod,
  baseCurrency,
  updateAccountBaseCurrency,
  getMarketData,
  pin,
  purgeStore,
}) {
  // console.log(persistor);
  const [availableUnlockMethods, setAvailableUnlockMethods] = useState(null);
  const [unlockText, setUnlockText] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPinError, setShowPinError] = useState(false);
  const [code, setCode] = useState("");
  useEffect(() => {
    getAvailableUnlockMethods();
    getMarketData(baseCurrency.value);
  }, [availableUnlockMethods]);

  const handleOpenWithWebBrowser = url => {
    WebBrowser.openBrowserAsync(url);
  };

  const getAvailableUnlockMethods = async () => {
    LocalAuthentication.hasHardwareAsync()
      .then(res => {
        if (res) {
          LocalAuthentication.supportedAuthenticationTypesAsync().then(res => {
            if (res.includes(1) && !res.includes(2)) {
              setUnlockText("Enable Fingerprint ID");
              setAvailableUnlockMethods("fingerprint");
            } else if (res.includes(2) && !res.includes(1)) {
              setUnlockText("Enable Face ID");
              setAvailableUnlockMethods("faceId");
            } else if (res.includes(1) && res.includes(2)) {
              setUnlockText("Choose Unlock Method");
              setAvailableUnlockMethods("both");
            } else {
              setUnlockText(null);
            }
          });
        }
      })
      .catch(err => console.log(err));
  };

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
        center={<Custom_HeaderTitle text="Settings" />}
        right={<View />}
      />
      <ScrollView>
        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <Custom_Text
            value="Set Default Fiat Currency"
            style={{ marginLeft: 15, marginBottom: 10 }}
            isBold
          />
          <Custom_MultiSelectInput
            value={baseCurrency}
            options={currencies}
            onValueChange={updateAccountBaseCurrency}
          />
        </View>
        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <Custom_Text
            value="Security"
            style={{ marginLeft: 15, marginBottom: 10 }}
            isBold
          />
          <Custom_NavButton
            value="Change PIN"
            handleOnPress={() => {
              navigation.navigate({
                key: "ChangePinScreen",
                routeName: "ChangePinScreen",
              });
            }}
          />
          {availableUnlockMethods && (
            <Custom_NavButton
              value="Enable / Disable Face ID / Fingerprint"
              handleOnPress={() => {
                if (!unlockMethod) {
                  navigation.navigate({
                    key: "SetupUnlockScreen",
                    routeName: "SetupUnlockScreen",
                    params: {
                      unlockText,
                      availableUnlockMethods,
                      isChangeScreen: true,
                    },
                  });
                } else {
                  navigation.navigate({
                    key: "ChangeUnlockScreen",
                    routeName: "ChangeUnlockScreen",
                    params: {
                      unlockText:
                        unlockMethod === "faceId" ? "FaceID" : "Fingerprint",
                      availableUnlockMethods,
                      isChangeScreen: true,
                    },
                  });
                }
              }}
            />
          )}
        </View>
        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <Custom_Text
            value="Legal"
            style={{ marginLeft: 15, marginBottom: 10 }}
            isBold
          />
          <Custom_NavButton
            value="License Agreement"
            handleOnPress={() => {
              // handleOpenWithWebBrowser(config.termsUrl);
              navigation.navigate({
                key: "LicenseAgreementScreen",
                routeName: "LicenseAgreementScreen",
              });
            }}
          />
          {/* <Custom_NavButton
            value="Privacy Policy"
            handleOnPress={() => {
              handleOpenWithWebBrowser(config.privacyUrl);
            }}
          /> */}
        </View>
        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <Custom_Text
            value="Support"
            style={{ marginLeft: 15, marginBottom: 10 }}
            isBold
          />
          <Custom_NavButton
            value="Report an Issue"
            handleOnPress={() => {
              handleOpenWithWebBrowser(config.reportIssueUrl);
            }}
          />
        </View>
        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <Custom_Text
            value="Reset"
            style={{ marginLeft: 15, marginBottom: 10 }}
            isBold
          />
          <Custom_NavButton
            value="Reset all data"
            handleOnPress={() => {
              setShowModal(true);
            }}
          />
        </View>
        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <Custom_Text
            value={`Version ${appConfig.version}`}
            style={{ marginTop: 20, textAlign: "center" }}
            color={Colors.grayText}
            isBold
          />
        </View>
        <View style={{ height: 40, width: screenWidth }} />
      </ScrollView>
      <ResetDataModal
        modalVisible={showModal}
        onClose={() => {
          setShowModal(false);
          setShowPinError(false);
          setCode("");
        }}
        onChangeCode={setCode}
        code={code}
        showError={showPinError}
        onPress={() => {
          if (pin !== code) {
            setShowPinError(true);
          } else {
            setShowModal(false);
            purgeStore();
          }
        }}
      />
    </View>
  );
}

SettingsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
});

const mapStateToProps = store => ({
  store,
  unlockMethod: store.unlockMethod,
  baseCurrency: store.baseCurrency,
  pin: store.pin,
  // persistor: store.persistor,
});

const mapDispatchToProps = dispatch => ({
  getMarketData: baseCurrency => dispatch(getMarketData(baseCurrency)),
  completeAuthSetup: () => dispatch(setupAuthentication()),
  authenticateUser: () => dispatch(authSuccess()),
  purgeStore: () => dispatch(purgeStore()),
  saveUnlockMethod: data => dispatch(updateUnlockMethod(data)),
  updateAccountBaseCurrency: data => dispatch(updateBaseCurrency(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen);
