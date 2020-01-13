import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

export default function Custom_TextInput({
  value,
  onChangeText,
  returnKeyType,
  keyboardType,
  label,
  placeholder,
  currency,
}) {
  const [isFocused, handleIsFocused] = useState(false);
  const handleFocus = () => handleIsFocused(true);
  const handleBlur = () => handleIsFocused(false);
  return (
    <TouchableOpacity onPress={handleFocus}>
      <Text style={{
        position: 'absolute',
        left: 40,
        top: !isFocused && !value ? 16 : 5,
        fontSize: !isFocused && !value ? 16 : 12,
        color: Colors.lightGray,
        zIndex: 50,
      }}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={styles.defaultTextInput}
        autoCapitalize="none"
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
  )
}

Custom_TextInput.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  textContentType: PropTypes.string,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  autoFocus: PropTypes.bool,
  showSecureTextEntryButton: PropTypes.bool,
};

Custom_TextInput.defaultProps = {
  value: '',
  onChangeText: () => {},
  placeholder: '',
  autoCapitalize: 'none',
  autoCorrect: false,
  textContentType: 'none',
  keyboardType: 'default',
  secureTextEntry: false,
  returnKeyType: 'done',
  autoFocus: false,
  showSecureTextEntryButton: false,
};

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
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
  }
});