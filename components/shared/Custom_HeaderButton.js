import React from "react";
import PropTypes from "prop-types";
import { Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Custom_HeaderButton({
  onPress,
  type,
  icon,
  image,
  iconColor,
  imageColor,
  style,
  size,
}) {
  if (type === "icon") {
    if (icon === "dots-vertical") {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[style, { paddingHorizontal: 15 }]}
        >
          <MaterialCommunityIcons
            name={icon}
            size={size ? size : 24}
            color={iconColor}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[style, { paddingHorizontal: 15 }]}
      >
        <Ionicons name={icon} size={size ? size : 24} color={iconColor} />
      </TouchableOpacity>
    );
  } else if (type === "image") {
    return (
      <TouchableOpacity onPress={onPress} style={{ padding: 5 }}>
        <Image source={image} style={[style, { tintColor: imageColor }]} />
      </TouchableOpacity>
    );
  }
}

Custom_HeaderButton.propTypes = {
  onPress: PropTypes.func,
};

Custom_HeaderButton.defaultProps = {
  onPress: () => {},
};
