import React from "react";
import { StyleSheet, View, Platform } from "react-native";

import Custom_Text from "./Custom_Text";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

export default function RecoveryWord({ word, index }) {
  return (
    <View style={styles.wordContainer}>
      <View style={styles.word}>
        <Custom_Text value={word} size={Fonts.size.small} />
      </View>
      <View style={styles.index}>
        <Custom_Text
          value={index}
          size={Fonts.size.small}
          color={Colors.headerBackground}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wordContainer: {
    height: 30,
    width: Platform.OS === "android" ? 90 : 95,
    borderRadius: 15,
    borderColor: Colors.lightGray,
    borderWidth: 0.5,
    paddingLeft: 10,
    paddingRight: 8,
    flexDirection: "row",
    marginRight: 10,
    marginLeft: 5,
    paddingVertical: 5,
    marginVertical: 5,
  },
  word: {
    flex: 8,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  index: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-end"
  }
});
