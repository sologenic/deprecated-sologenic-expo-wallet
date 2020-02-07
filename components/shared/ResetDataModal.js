import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

import Colors from "../../constants/Colors";
import Custom_Text from "../../components/shared/Custom_Text";
import Custom_TextInput from "../../components/shared/Custom_TextInput";
import Fonts from "../../constants/Fonts";
import Custom_Button from "./Custom_Button";
import { screenWidth } from "../../constants/Layout";

export default function ResetDataModal({
  modalVisible,
  onClose,
  onPress,
  code,
  onChangeCode,
  showError,
}) {
  return (
    <Modal visible={modalVisible} animationType="none" transparent={true}>
      <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
        <View style={styles.modalBody} activeOpacity={1}>
          <TouchableWithoutFeedback>
            <View>
              <View
                style={{
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Custom_Text
                  value="Are you sure?"
                  size={20}
                  color={Colors.text}
                  isBold
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <View style={{ marginHorizontal: 20, marginBottom: 15 }}>
                  <Custom_Text
                    value="Resetting your data will erase all of your wallets from the app."
                    color={Colors.text}
                  />
                </View>
                <Custom_TextInput
                  value={code}
                  onChangeText={text => {
                    onChangeCode(text);
                  }}
                  label="Enter Pin"
                  keyboardType="default"
                  returnKeyType="done"
                  secureTextEntry
                />
                {showError && (
                  <Custom_Text
                    value="Incorrect Pin. Please try again."
                    color={Colors.errorBackground}
                    style={{ marginLeft: 20, marginTop: 5 }}
                  />
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={[styles.section, { height: 50 }]}>
                  <Custom_Button
                    text="CANCEL"
                    onPress={onClose}
                    color={Colors.lightGray}
                    size={16}
                    textStyle={{ letterSpacing: 1.2 }}
                    style={{ backgroundColor: "transparent" }}
                  />
                </View>
                <View style={[styles.section, { height: 50 }]}>
                  <Custom_Button
                    text="CONFIRM"
                    onPress={onPress}
                    color={Colors.freshGreen}
                    size={16}
                    textStyle={{ letterSpacing: 1.2 }}
                    style={{ backgroundColor: "transparent" }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

ResetDataModal.propTypes = {
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape({}),
};

ResetDataModal.defaultProps = {
  onPress: () => {},
  onClose: () => {},
  pressed: false,
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.cloud,
    // zIndex: 50,
    // opacity: 0.8,
    // paddingHorizontal: 20,
  },
  modalBody: {
    backgroundColor: Colors.darkerGray,
    // backgroundColor: 'red',
    borderRadius: 10,
    // height: 100,
    width: screenWidth - 50,
    // zIndex: 20,
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 15,
  },
});
