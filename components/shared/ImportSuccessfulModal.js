import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import Custom_Text from "../../components/shared/Custom_Text";
import Custom_Button from "../../components/shared/Custom_Button";
import { screenWidth } from "../../constants/Layout";

export default function ImportSuccessfulModal({
  onPress,
  onClose,
  modalVisible,
  style,
}) {
  return (
    <Modal visible={modalVisible} animationType="none" transparent={true}>
      <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
        <View style={styles.modalBody} activeOpacity={1}>
          <TouchableWithoutFeedback>
            <View>
              <View
                style={[
                  styles.section,
                  { height: 70, alignItems: "flex-start" },
                ]}
              >
                <Custom_Text
                  value="Wallet Import Successful"
                  size={20}
                  color={Colors.text}
                  isBold
                />
              </View>
              <View
                style={[
                  styles.section,
                  { marginBottom: 20, flexDirection: "row" },
                ]}
              >
                <View style={{ flex: 8, marginBottom: 10 }}>
                  <Custom_Text
                    value={`Your wallet was imported \nsuccessfully.`}
                    size={Fonts.size.small}
                    color={Colors.text}
                  />
                </View>
                <View style={{ flex: 2, alignItems: "flex-end" }}>
                  <Ionicons
                    name="ios-checkmark-circle"
                    size={Fonts.size.h5}
                    color={Colors.freshGreen}
                  />
                </View>
              </View>
              <View style={styles.line} />
              <View style={[styles.section, { height: 50 }]} />
              <View
                style={[
                  styles.section,
                  { height: 50, position: "absolute", right: 0, bottom: 0 },
                ]}
              >
                <Custom_Button
                  text="VIEW WALLET"
                  onPress={onPress}
                  color={Colors.freshGreen}
                  size={16}
                  textStyle={{ letterSpacing: 1.2 }}
                  style={{ backgroundColor: "transparent" }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

ImportSuccessfulModal.propTypes = {
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape({}),
};

ImportSuccessfulModal.defaultProps = {
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
    paddingHorizontal: 10,
  },
  modalBody: {
    backgroundColor: Colors.darkerGray,
    // backgroundColor: 'red',
    borderRadius: 10,
    // height: 100,
    width: screenWidth - 60,
    // zIndex: 20,
  },
  section: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 24,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grayText,
  },
});
