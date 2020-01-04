import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import Custom_Text from "./Custom_Text";

export default function Custom_HeaderTitle({ text, color, size }) {
  return (
    <View style={styles.container}>
      <Custom_Text
        type="headerTitle"
        value={text}
        color={color}
        size={size}
        numberOfLines={1}
        isBold
      />
    </View>
  );
}

Custom_HeaderTitle.propTypes = {};
Custom_HeaderTitle.defaultProps = {
  size: Fonts.size.input,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
  }
});
