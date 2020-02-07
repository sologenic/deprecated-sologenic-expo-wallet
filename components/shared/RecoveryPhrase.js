import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import RecoveryWord from './RecoveryWord';
import RecoveryWordTextInput from './RecoveryWordTextInput';

export default function RecoveryPhrase({ phrase, randomNumbers, color, indexColor }) {
  let count = 0;
  if (randomNumbers && randomNumbers.length) {
    return (
      <View style={styles.phraseContainer}>
        {phrase.map((item, index) => {
          if (randomNumbers.includes(index + 1)) {
            count = count + 1;
            return (
              <RecoveryWordTextInput color={color} indexColor={indexColor} count={count} phraseLength={item.length} index={String(index + 1)} key={`${index}${count}`}/>
            )
          } else {
            return (
              <RecoveryWord word={item} index={String(index + 1)} key={index} />
            )
          }
        })}
      </View>
    );
  } else {
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
}

const styles = StyleSheet.create({
  phraseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
