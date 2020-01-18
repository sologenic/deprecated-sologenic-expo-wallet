import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import Custom_Button from "../components/shared/Custom_Button";
import { setupAuthentication, authSuccess } from "../actions";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";

function CreatePinScreen({ navigation, completeAuthSetup, authenticateUser }) {
  const {
    unlockText,
    availableUnlockMethods,
    isChangeScreen,
  } = navigation.state.params;
  const getUnlockImage = () => {
    if (availableUnlockMethods === "fingerprint") {
      return Images.fingerPrint;
    } else if (availableUnlockMethods === "faceId") {
      return Images.face;
    }
  };

  const getUnlockText = () => {
    if (availableUnlockMethods === "fingerprint") {
      return `Would you like to set Fingerprint ID as your primary authorization method?`;
    } else if (availableUnlockMethods === "faceId") {
      return `Would you like to set Face ID as your primary authorization method?`;
    }
  };

  const skipSetup = () => {
    completeAuthSetup();
    authenticateUser();
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "HomeScreen" })],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Custom_Header
        left={
          isChangeScreen ? (
            <Custom_HeaderButton
              onPress={() => {
                navigation.goBack();
              }}
              type="icon"
              icon="md-arrow-back"
              iconColor={Colors.text}
            />
          ) : (
            <View />
          )
        }
        center={<Custom_HeaderTitle text={unlockText} />}
      />
      <ScrollView>
        <View style={{ marginTop: 42 }}>
          <Image
            source={getUnlockImage()}
            style={{
              alignSelf: "center",
              marginBottom: 24,
            }}
          />

          <Custom_Text
            value={getUnlockText()}
            style={{ textAlign: "center", marginBottom: 15 }}
            size={16}
          />

          <View style={{ alignItems: "center" }}>
            <Custom_Button
              text={unlockText}
              onPress={() =>
                navigation.navigate({
                  key: "ConfirmUnlockMethodScreen",
                  routeName: "ConfirmUnlockMethodScreen",
                  params: {
                    availableUnlockMethods,
                    unlockText,
                    isChangeScreen,
                  },
                })
              }
              color={Colors.secondaryBackground}
              size={14}
              textStyle={{
                letterSpacing: 0.24,
              }}
              style={{
                backgroundColor: Colors.darkRed,
                paddingHorizontal: 15,
                paddingVertical: 10,
                marginBottom: 24,
              }}
            />
          </View>
        </View>
      </ScrollView>
      {!isChangeScreen && (
        <View style={{ position: "absolute", bottom: 60, alignSelf: "center" }}>
          <TouchableOpacity onPress={() => skipSetup()}>
            <Custom_Text value="Skip this step >" style={{}} size={14} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => ({
  completeAuthSetup: () => dispatch(setupAuthentication()),
  authenticateUser: () => dispatch(authSuccess()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePinScreen);
