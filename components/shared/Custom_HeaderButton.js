import React from "react";
import PropTypes from "prop-types";
import { Image, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function Custom_HeaderButton({
  onPress,
  type,
  icon,
  image,
  iconColor,
  imageColor,
  style,
}) {
  if (type === "icon") {
    return (
      <TouchableOpacity onPress={onPress} style={[ style, { paddingHorizontal: 15 } ]}>
        <Ionicons name={icon} size={30} color={iconColor}/>
      </TouchableOpacity>
    );
  } else if (type === "image") {
    return (
      <TouchableOpacity onPress={onPress} style={{ padding: 5 }}>
        <Image source={image} style={[ style, { tintColor: imageColor }]} />
      </TouchableOpacity>
    );
  }
}

Custom_HeaderButton.propTypes = {
  onPress: PropTypes.func
};

Custom_HeaderButton.defaultProps = {
  onPress: () => {}
};
