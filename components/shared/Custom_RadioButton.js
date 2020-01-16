import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Colors from "../../constants/Colors";

export default function Custom_RadioButton({ onPress, pressed, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.radioButton,
        { borderColor: pressed ? Colors.darkRed : Colors.text },
        { ...style },
      ]}
      activeOpacity={0.5}
    >
      <View
        style={[
          styles.innerButton,
          { backgroundColor: pressed ? Colors.darkRed : "transparent" },
        ]}
      />
    </TouchableOpacity>
  );
}

Custom_RadioButton.propTypes = {
  onPress: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape({}),
};

Custom_RadioButton.defaultProps = {
  onPress: () => {},
  pressed: false,
};

const styles = StyleSheet.create({
  radioButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12.5,
    borderColor: Colors.text,
    borderWidth: 2,
    height: 25,
    width: 25,
    backgroundColor: "transparent",
  },
  innerButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    height: 12,
    width: 12,
    backgroundColor: "transparent",
  },
});
