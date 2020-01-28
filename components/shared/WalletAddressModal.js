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
import { generateQRCode } from "../../utils";

export default function WalletAddressModal({ data, modalVisible, onClose }) {
  const uri = generateQRCode(data);
  return (
    <Modal visible={modalVisible} animationType="none" transparent={true}>
      <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
        <View style={styles.modalBody} activeOpacity={1}>
          <TouchableWithoutFeedback>
            <View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={[
                    styles.section,
                    {
                      height: 70,
                      alignItems: "flex-start",
                      justifyContent: "center",
                      paddingLeft: 50,
                    },
                  ]}
                >
                  <Custom_Text
                    value="Wallet Address"
                    size={20}
                    color={Colors.text}
                    isBold
                  />
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Custom_HeaderButton
                    onPress={onClose}
                    type="icon"
                    icon="ios-close"
                    iconColor={Colors.text}
                  />
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <Image
                  source={{ uri }}
                  style={{
                    width: 150,
                    height: 150,
                    backgroundColor: Colors.headerBackground,
                  }}
                />
              </View>
              {/* <View
                style={[
                  styles.section,
                  { height: 50, position: "absolute", right: 0, bottom: 0 }
                ]}
              >
                <Custom_Button
                  text="CLOSE"
                  onPress={onClose}
                  color={Colors.lightGray}
                  size={16}
                  textStyle={{ letterSpacing: 1.2 }}
                  style={{ backgroundColor: "transparent" }}
                />
              </View> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

WalletAddressModal.propTypes = {
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape({}),
};

WalletAddressModal.defaultProps = {
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
