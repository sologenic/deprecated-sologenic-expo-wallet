import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

import Colors from "../../constants/Colors";
import Custom_Text from "../../components/shared/Custom_Text";
import Custom_HeaderButton from "./Custom_HeaderButton";
import Fonts from "../../constants/Fonts";

export default function ActivatingSoloModal({ modalVisible, onClose }) {
  return (
    <Modal visible={modalVisible} animationType="none" transparent={true}>
      <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
        <View style={styles.modalBody} activeOpacity={1}>
          <TouchableWithoutFeedback>
            <View>
                <View
                  style={[
                    styles.section,
                    { height: 70 }
                  ]}
                >
                  <Custom_Text
                    value="Activation SOLO..."
                    size={20}
                    color={Colors.text}
                    isBold
                  />
                </View>
                <View style={[styles.section, { marginTop: 20 }]}>
                  <Custom_Text
                    value="Please wait"
                    size={Fonts.size.small}
                    color={Colors.text}
                  />
                  <View style={{ marginTop: 15, marginBottom: 50 }}>
                    <ActivityIndicator size="small" color="#FFF" />
                  </View>
                </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

ActivatingSoloModal.propTypes = {
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape({})
};

ActivatingSoloModal.defaultProps = {
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
    marginHorizontal: 52,
  },
});
