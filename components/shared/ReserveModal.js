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

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import Custom_Text from "../../components/shared/Custom_Text";
import Custom_Button from "../../components/shared/Custom_Button";

export default function ReserveModal({
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
                  value="Network Reserves"
                  size={20}
                  color={Colors.text}
                  isBold
                />
                <Custom_Text
                  value="(Not available to send)"
                  size={12}
                  color={Colors.grayText}
                  isBold
                />
              </View>
              <View style={[styles.section, { marginBottom: 20 }]}>
                <View style={{ marginBottom: 10 }}>
                  <Custom_Text
                    value={`There is a 20 XRP reserve requirement to activate any XRP wallet. Once an XRP address is funded with the 20 XRP, the activation fee will be locked by the XRP ledger network and is non-refundable and non-recoverable unless the network lowers the reserve requirement.`}
                    size={Fonts.size.small}
                    color={Colors.text}
                  />
                  <Custom_Text
                    value={`After you activate your XRP Wallet, you can then activate your SOLO Wallet. SOLO Wallets have a reserve requirement of 5 XRP, so your Network Reserve will change to 25 XRP when you activate your SOLO Wallet. Fees can be paid out of reserve funds.`}
                    size={Fonts.size.small}
                    color={Colors.text}
                    style={{ marginTop: 10 }}
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
                  text="DISMISS"
                  onPress={onClose}
                  color={Colors.lightGray}
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

ReserveModal.propTypes = {
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape({}),
};

ReserveModal.defaultProps = {
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
    paddingHorizontal: 40,
  },
  modalBody: {
    backgroundColor: Colors.darkerGray,
    // backgroundColor: 'red',
    borderRadius: 10,
    // height: 100,
    // width: 200,
    // zIndex: 20,
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  line: {
    height: 1,
    backgroundColor: Colors.grayText,
  },
});
