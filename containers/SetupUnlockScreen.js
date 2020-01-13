import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import Custom_Button from "../components/shared/Custom_Button";
import { createPinSuccess } from "../actions";
import { screenWidth } from "../constants/Layout";

function CreatePinScreen({ navigation }) {
  const { unlockText, availableUnlockMethods } = navigation.state.params;

  const getUnlockImage = () => {
    if (availableUnlockMethods === "fingerprint") {
      return Images.fingerprint;
    } else if (availableUnlockMethods === "faceId") {
      return Images.face;
    }
  };

  return (
    <View style={styles.container}>
      <Custom_Header
        flex={[0, 1, 0]}
        center={<Custom_HeaderTitle text={unlockText} />}
      />
      <ScrollView>
        <View style={{ marginTop: 42 }}>
          <View
            style={{
              width: 94,
              height: 94,
              borderRadius: 47,
              backgroundColor: Colors.slabGray,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginBottom: 24,
            }}
          >
            <Image
              source={getUnlockImage()}
              style={{
                height: 42,
                width: 42,
                position: "relative",
                top: 2,
              }}
            />
          </View>

          <Custom_Text
            value={`Would you like to set Face ID as your\n primary authorization method?`}
            style={{ textAlign: "center", marginBottom: 15 }}
            size={16}
          />

          <View style={{ alignItems: "center" }}>
            <Custom_Button
              text={unlockText}
              //   onPress={() =>}
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
            {/* {unlockMethod === unlockText && (
                <Image
                  source={Images.check}
                  style={{
                    tintColor: Colors.primary,
                    position: "absolute",
                    right: 15,
                  }}
                />
              )} */}
          </View>
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 60, alignSelf: "center" }}>
        <TouchableOpacity>
          <Custom_Text value="Skip this step >" style={{}} size={14} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

const mapStateToProps = ({ isPinCreated }) => ({
  isPinCreated,
});

const mapDispatchToProps = dispatch => ({
  createPin: data => dispatch(createPinSuccess(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePinScreen);
