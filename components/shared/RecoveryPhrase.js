import React from "react";
import { StyleSheet, View } from "react-native";

import RecoveryWord from './RecoveryWord';

export default function RecoveryPhrase({ phrase }) {
  return (
    <View style={styles.phraseContainer}>
      {phrase.map((item, index) => {
        return (
          <RecoveryWord word={item} index={String(index + 1)} key={index} />
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  phraseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
