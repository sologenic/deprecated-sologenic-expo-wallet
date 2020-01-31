import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import Colors from "../../constants/Colors";
import Custom_Text from "../../components/shared/Custom_Text";
import Custom_HeaderButton from "./Custom_HeaderButton";

export default function XrpWarningModal({ data, modalVisible, onClose }) {
  return (
    <Modal visible={modalVisible} animationType="none" transparent={true}>
      <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
        <View style={styles.modalBody} activeOpacity={1}>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                <View
                  style={[
                    styles.section,
                  ]}
                >
                  <Custom_Text
                    value="Warning"
                    size={20}
                    color={Colors.text}
                    isBold
                  />
                </View>
                <View style={{ position: 'absolute', right: -10, top: -10 }}>
                  <Custom_HeaderButton
                    onPress={onClose}
                    type="icon"
                    icon="ios-close"
                    iconColor={Colors.text}
                  />
                </View>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20, marginTop: 10 }}>
                <Custom_Text value="Your XRP balance is running low. You need at least 21 XRP to pay for transaction fees."  style={{textAlign: 'center'}}/>
              </View>
            </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

XrpWarningModal.propTypes = {
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape({})
};

XrpWarningModal.defaultProps = {
  onPress: () => {},
  onClose: () => {},
  pressed: false
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.cloud,
    paddingHorizontal: 40
  },
  modalBody: {
    backgroundColor: Colors.darkerGray,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  section: {
    justifyContent: "center",
    alignItems: "center"
  },
  line: {
    height: 1,
    backgroundColor: Colors.grayText
  }
});
