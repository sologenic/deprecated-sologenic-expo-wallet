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

export default function EnterPasswordModal({
  modalVisible,
  onClose,
  onPress,
  password,
  onChangePassword,
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
                  value="Enter Password"
                  size={20}
                  color={Colors.text}
                  isBold
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <Custom_TextInput
                  value={password}
                  onChangeText={text => {
                    onChangePassword(text);
                  }}
                  label="Wallet Password"
                  keyboardType="default"
                  returnKeyType="done"
                  secureTextEntry
                />
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
                    text="ACTIVATE"
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

EnterPasswordModal.propTypes = {
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape({}),
};

EnterPasswordModal.defaultProps = {
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
    paddingHorizontal: 20,
  },
  modalBody: {
    backgroundColor: Colors.darkerGray,
    // backgroundColor: 'red',
    borderRadius: 10,
    // height: 100,
    width: screenWidth - 80,
    // zIndex: 20,
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 15,
  },
});
