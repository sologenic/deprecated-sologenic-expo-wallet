import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View, Modal, TouchableWithoutFeedback } from "react-native";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import Custom_Text from "../../components/shared/Custom_Text";
import Custom_Button from "../../components/shared/Custom_Button";

export default function TransferSummaryModal({ onPress, onClose, modalVisible, amountToSend, address, tag, currency, defaultCurrency, style }) {
  return (
    <Modal
      visible={modalVisible}
      animationType="none"
      transparent={true}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
      >
        <View style={styles.modalBody} activeOpacity={1}>
          <TouchableWithoutFeedback>
            <View>
              <View style={[styles.section, { height: 70 }]}>
                <Custom_Text
                  value="Transfer Summary"
                  size={20}
                  color={Colors.text}
                  isBold
                />
              </View>
              <View style={[styles.section, { marginBottom: 20 }]}>
                <Custom_Text
                  value="Amount to Send:"
                  size={Fonts.size.small}
                  color={Colors.lightGray}
                />
                <Custom_Text
                  value={`${amountToSend} ${currency.toUpperCase()}`}
                  size={24}
                  color={Colors.text}
                  isBold
                />
              </View>
              <View style={[styles.sectionAddress, { marginBottom: 20, width: 244 }]}>
                <Custom_Text
                  value="To Address:"
                  size={Fonts.size.small}
                  color={Colors.lightGray}
                />
                <Custom_Text
                  value={`${address}`}
                  size={Fonts.size.small}
                />
              </View>
              <View style={[styles.sectionTag, { marginBottom: 20 }]}>
                <Custom_Text
                  value="Destination Tag:"
                  size={Fonts.size.small}
                  color={Colors.lightGray}
                />
                <Custom_Text
                  value={`${tag}`}
                  size={Fonts.size.small}
                />
              </View>
              <View style={styles.line} />
              <View style={[styles.section, { height: 50 }]} />
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.section, { height: 50, position: 'absolute', right: 110, bottom: 0 }]}>
                  <Custom_Button
                    text="CANCEL"
                    onPress={onClose}
                    color={Colors.lightGray}
                    size={16}
                    textStyle={{ letterSpacing: 1.2 }}
                    style={{ backgroundColor: "transparent" }}
                  />
                </View>
                <View style={[styles.section, { height: 50, position: 'absolute', right: 0, bottom: 0 }]}>
                  <Custom_Button
                    text="CONFIRM"
                    onPress={onClose}
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

TransferSummaryModal.propTypes = {
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape({})
};

TransferSummaryModal.defaultProps = {
  onPress: () => { },
  onClose: () => { },
  pressed: false
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.cloud,
    paddingHorizontal: 40,
  },
  modalBody: {
    backgroundColor: Colors.darkerGray,
    borderRadius: 10,
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  sectionAddress: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
  },
  sectionTag: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
  },
  line: {
    height: 1,
    backgroundColor: Colors.grayText,
  }
});
