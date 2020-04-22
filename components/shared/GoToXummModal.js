import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Linking,
} from "react-native";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import Custom_Text from "../../components/shared/Custom_Text";
import Custom_Button from "../../components/shared/Custom_Button";

export default function GoToXummModal({
  onPress,
  onClose,
  modalVisible,
  deepLink,
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
                  value="Progressing..."
                  size={20}
                  color={Colors.text}
                  isBold
                />
              </View>
              <View style={[styles.section, { marginTop: 10, marginBottom: 20 }]}>
                <ActivityIndicator size="small" color={Colors.freshGreen} />
                <View style={{ marginVertical: 10 }}>
                  <Custom_Text
                    value={`Progressing`}
                    size={Fonts.size.small}
                    color={Colors.text}
                  />
                </View>
              </View>
              <View style={[styles.section, { marginBottom: 20 }]}>
                <View style={{ marginBottom: 10 }}>
                  <Custom_Text
                    value={`Press the bottun below and open the XUMM app to proceed with your first transaction with XUMM.`}
                    size={Fonts.size.small}
                    color={Colors.text}
                  />
                </View>
                <View>
                  <Custom_Text
                    value={deepLink}
                    size={Fonts.size.small}
                    color={Colors.text}
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
                  text="GO TO XUMM"
                  onPress={() => {
                    console.log("GO TO XUMM")
                    Linking.openURL(deepLink);
                  }}
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

GoToXummModal.propTypes = {
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape({}),
};

GoToXummModal.defaultProps = {
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
