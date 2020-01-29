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

export default function InstructionsModal({
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
                  value="Instructions"
                  size={20}
                  color={Colors.text}
                  isBold
                />
              </View>
              <View
                style={[
                  styles.section,
                  { marginBottom: 20, alignItems: "flex-start" },
                ]}
              >
                <View
                  style={{
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <View style={{ paddingTop: 6, paddingRight: 8 }}>
                    <View
                      style={{
                        height: 4,
                        width: 4,
                        borderRadius: 2,
                        backgroundColor: "#FFF",
                      }}
                    />
                  </View>
                  <View>
                    <Custom_Text
                      value={`Enter the amount of XRP you want to withdraw.`}
                      size={Fonts.size.small}
                      color={Colors.text}
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <View style={{ paddingTop: 6, paddingRight: 8 }}>
                    <View
                      style={{
                        height: 4,
                        width: 4,
                        borderRadius: 2,
                        backgroundColor: "#FFF",
                      }}
                    />
                  </View>
                  <View>
                    <Custom_Text
                      value={`Enter the destination wallet address that you want to send your XRP to. Please double check that you have entered the correct address or your funds will be lost forever. XRP addresses begin with an 'r' or 'X'.`}
                      size={Fonts.size.small}
                      color={Colors.text}
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <View style={{ paddingTop: 6, paddingRight: 8 }}>
                    <View
                      style={{
                        height: 4,
                        width: 4,
                        borderRadius: 2,
                        backgroundColor: "#FFF",
                      }}
                    />
                  </View>
                  <View>
                    <Custom_Text
                      value={`Destination tags are used by exchanges and custodians to distiguish thier clients wallets. Please ensure that you enter the correct tag if you are withdrawing to these organizations or your funds may be lost forever. You may leave this section blank if you are withdrawing to personal wallets.`}
                      size={Fonts.size.small}
                      color={Colors.text}
                    />
                  </View>
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

InstructionsModal.propTypes = {
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape({}),
};

InstructionsModal.defaultProps = {
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
