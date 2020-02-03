import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
import colors from "../../constants/Colors";

export default function Custom_TextInput({
  value,
  onChangeText,
  returnKeyType,
  keyboardType,
  secureTextEntry,
  label,
  placeholder,
  placeholderTextColor,
  currency,
  editable,
}) {
  const [isFocused, handleIsFocused] = useState(false);
  const handleFocus = () => handleIsFocused(true);
  const handleBlur = () => handleIsFocused(false);
  return (
    <TouchableOpacity onPress={handleFocus} activeOpacity={0.5}>
      <Text
        style={{
          position: "absolute",
          left: 40,
          top: 5,
          fontSize: 12,
          // top: !isFocused && !value ? 16 : 5,
          // fontSize: !isFocused && !value ? 16 : 12,
          color: Colors.lightGray,
          zIndex: 50,
        }}
      >
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={styles.defaultTextInput}
        autoCapitalize="none"
        editable={editable}
      />
      {currency && (
        <Text
          style={{
            fontFamily: "DMSansBold",
            color: Colors.text,
            fontSize: Fonts.size.medium,
            textAlign: "center",
            position: "absolute",
            right: 30,
            top: 15,
          }}
        >
          {currency.toUpperCase()}
        </Text>
      )}
    </TouchableOpacity>
  );
}

Custom_TextInput.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  autoCapitalize: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  autoCorrect: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  textContentType: PropTypes.string,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  autoFocus: PropTypes.bool,
  showSecureTextEntryButton: PropTypes.bool,
  editable: PropTypes.bool,
};

Custom_TextInput.defaultProps = {
  value: "",
  onChangeText: () => {},
  placeholder: "",
  placeholderTextColor: colors.grayText,
  autoCapitalize: "none",
  autoCorrect: false,
  textContentType: "none",
  keyboardType: "default",
  secureTextEntry: false,
  returnKeyType: "done",
  autoFocus: false,
  showSecureTextEntryButton: false,
  editable: true,
};

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    borderRadius: 25,
    backgroundColor: Colors.headerBackground,
    marginHorizontal: 15,
    paddingLeft: 25,
    paddingVertical: 25,
  },
  defaultTextInput: {
    fontFamily: "Titillium",
    fontSize: Fonts.size.medium,
    color: Colors.text,
    backgroundColor: Colors.headerBackground,
    paddingLeft: 25,
    marginHorizontal: 15,
    paddingTop: 18,
    paddingBottom: 10,
    borderRadius: 25,
  },
});
