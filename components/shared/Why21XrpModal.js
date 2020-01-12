import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Text
} from "react-native";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import Custom_Text from "../../components/shared/Custom_Text";
import Custom_Button from "../../components/shared/Custom_Button";

export default function Why21XRPModal({
  onPress,
  onClose,
  modalVisible,
  style
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
                  { height: 70, alignItems: "flex-start" }
                ]}
              >
                <Custom_Text
                  value="Why 21 XRP?"
                  size={20}
                  color={Colors.text}
                  isBold
                />
              </View>
              <View style={[styles.section, { marginBottom: 20 }]}>
                <View style={{ marginBottom: 10 }}>
                  <Custom_Text
                    value={`Similar to some bank accounts, Ripple Wallets require a minimum balance of 20 XRP to facilitate use of the XRP Ledger.`}
                    size={Fonts.size.small}
                    color={Colors.text}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "DMSans",
                    color: Colors.text,
                    fontSize: Fonts.size.small,
                    // textAlign: "center"
                  }}
                  // numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  We ask you to deposit
                  <Text> </Text>
                  <Text
                    style={{
                      fontFamily: "DMSansBold",
                      color: Colors.text,
                      fontSize: Fonts.size.small,
                      textAlign: "center"
                    }}
                  >
                    21 XRP
                  </Text>
                  <Text> </Text>
                  here instead, in order to facilitate the activation of your
                  SOLO Wallet, which you can do as soon as your XRP Wallet is
                  activated.
                </Text>
              </View>
              <View style={styles.line} />
              <View style={[styles.section, { height: 50 }]} />
              <View
                style={[
                  styles.section,
                  { height: 50, position: "absolute", right: 0, bottom: 0 }
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
              {/* <View style={{ flexDirection: 'row'}}>
                <View style={[ styles.section, { height: 50, position: 'absolute', right: 110, bottom: 0 }]}>
                  <Custom_Button
                    text="CANCEL"
                    onPress={onClose}
                    color={Colors.lightGray}
                    size={16}
                    textStyle={{ letterSpacing: 1.2 }}
                    style={{ backgroundColor: "transparent" }}
                  />
                </View>
                <View style={[ styles.section, { height: 50, position: 'absolute', right: 0, bottom: 0 }]}>
                  <Custom_Button
                    text="CONFIRM"
                    onPress={onClose}
                    color={Colors.lightGray}
                    size={16}
                    textStyle={{ letterSpacing: 1.2 }}
                    style={{ backgroundColor: "transparent" }}
                  />
                </View>
              </View> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

Why21XRPModal.propTypes = {
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape({})
};

Why21XRPModal.defaultProps = {
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
    // zIndex: 50,
    // opacity: 0.8,
    paddingHorizontal: 40
  },
  modalBody: {
    backgroundColor: Colors.darkerGray,
    // backgroundColor: 'red',
    borderRadius: 10
    // height: 100,
    // width: 200,
    // zIndex: 20,
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20
  },
  line: {
    height: 1,
    backgroundColor: Colors.grayText
  }
});
