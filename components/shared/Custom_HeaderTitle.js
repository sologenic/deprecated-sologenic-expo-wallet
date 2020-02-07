import React from "react";
import P from "prop-types";
import { StyleSheet, View } from "react-native";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import Custom_Text from "./Custom_Text";

const propTypes = {
  size: P.number,
};
const defaultProps = {
  size: 20,
};
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

Custom_HeaderTitle.propTypes = propTypes;
Custom_HeaderTitle.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
