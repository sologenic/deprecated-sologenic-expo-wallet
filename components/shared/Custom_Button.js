import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Custom_Text from '../shared/Custom_Text';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

export default function Custom_Button({
  icon,
  onPress,
  text,
  textStyle,
  disabled,
  color,
  style,
  size,
  isBold,
}) {
  if (icon) {
    if (icon === "content-copy" || icon === "qrcode") {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.button, { ...style }]}
          disabled={disabled}
          activeOpacity={0.5}
        >
          <View style={styles.withIcons}>
            <View style={styles.textContainer}>
              <Custom_Text
                value={text}
                size={Fonts.size.normal}
                color={color}
                isBold={isBold}
                style={textStyle}
              />
            </View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={icon} size={Fonts.size.regular} color={color}/>
            </View>
          </View>
        </TouchableOpacity>
      )      
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, { ...style }]}
        disabled={disabled}
        activeOpacity={0.5}
      >
        <View style={styles.withIcons}>
          <View style={styles.textContainer}>
            <Custom_Text
              value={text}
              size={Fonts.size.normal}
              color={color}
              isBold={isBold}
              style={textStyle}
            />
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={Fonts.size.regular} color={color}/>
          </View>
        </View>
      </TouchableOpacity>      
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { ...style }]}
      disabled={disabled}
      activeOpacity={0.5}
    >
      <Custom_Text
        value={text}
        size={size ? size : Fonts.size.normal}
        color={color}
        isBold={isBold}
        style={textStyle}
      />
    </TouchableOpacity>
  );
}

Custom_Button.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
};

Custom_Button.defaultProps = {
  onPress: () => {},
  disabled: false,
  color: Colors.text,
  isBold: true,
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.darkRed,
  },
  withIcons: {
    flexDirection: 'row',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    paddingLeft: 6,
    marginTop: 2,
  }
});
