import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";

import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
import Custom_Text from "./Custom_Text";
import images from "../../constants/Images";

export default function Custom_NavButton({ value, handleOnPress }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity
        onPress={handleOnPress}
        style={buttonStyle}
        activeOpacity={0.5}
      >
        <Custom_Text value={value} size={12} />
        <Image
          source={images.arrowRight}
          style={{ position: "absolute", right: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
}
const buttonStyle = {
  flex: 1,
  justifyContent: "center",
  borderRadius: 25,
  backgroundColor: Colors.headerBackground,
  paddingLeft: 25,
  height: 40,
};

Custom_NavButton.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  handleOnPress: PropTypes.func,
};

Custom_NavButton.defaultProps = {
  value: "",
  title: "",
  handleOnPress: () => {},
};
