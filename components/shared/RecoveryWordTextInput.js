import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { connect } from "react-redux";

import Custom_Text from "./Custom_Text";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import {
  updatePhraseTestValue1,
  updatePhraseTestValue2,
  updatePhraseTestValue3,
} from "../../actions"

function RecoveryWordTextInput({ color, indexColor, count, phraseLength, placeholder, returnKeyType, keyboardType, onBlur, onFocus, index, updatePhraseTestValue1, updatePhraseTestValue2, updatePhraseTestValue3, phraseTestValue1, phraseTestValue2, phraseTestValue3 }) { 
  // const [value, onChangeText] = useState("");

  const generateLengthArray = phraseLength => {
    const array = [];
    for (let i = 0; i < phraseLength; i += 1) {
      array.push(i);
    }
    return array;
  }
  const lengthArray = generateLengthArray(phraseLength);
  
  if (count === 1) {
    return (
      <View style={styles.wordContainer}>
        <View style={styles.word}>
          <TextInput
            placeholder={placeholder}
            // value={value}
            // onChangeText={onChangeText}
            value={phraseTestValue1}
            onChangeText={text => {
              updatePhraseTestValue1(text);
              // onChangeText(text);
              // if (count === 1) {
              //   updatePhraseTestValue1(text);
              // } else if (count === 2) {
              //   updatePhraseTestValue2(text);
              // } else if (count === 3) {
              //   updatePhraseTestValue3(text);
              // }
            }}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onFocus={onFocus}
            autoCapitalize="none"
            style={[styles.defaultTextInput, { color: color }]}
          />
          <View style={{ flexDirection: "row"}}>
            {lengthArray.map(item => {
              return (
                <View style={{ height: 1, width: 5, backgroundColor: indexColor, marginRight: 1 }}/>
              );
            })}
          </View>
        </View>
        <View style={styles.index}>
          <Custom_Text
            value={index}
            size={Fonts.size.small}
            color={indexColor}
          />
        </View>
      </View>
    );
  }

  if (count === 2) {
    return (
      <View style={styles.wordContainer}>
        <View style={styles.word}>
          <TextInput
            placeholder={placeholder}
            value={phraseTestValue2}
            onChangeText={text => {
              updatePhraseTestValue2(text);
            }}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onFocus={onFocus}
            autoCapitalize="none"
            style={[styles.defaultTextInput, { color: color }]}
          />
          <View style={{ flexDirection: "row"}}>
            {lengthArray.map(item => {
              return (
                <View style={{ height: 1, width: 5, backgroundColor: indexColor, marginRight: 1 }}/>
              );
            })}
          </View>
        </View>
        <View style={styles.index}>
          <Custom_Text
            value={index}
            size={Fonts.size.small}
            color={indexColor}
          />
        </View>
      </View>
    );
  }

  if (count === 3) {
    return (
      <View style={styles.wordContainer}>
        <View style={styles.word}>
          <TextInput
            placeholder={placeholder}
            value={phraseTestValue3}
            onChangeText={text => {
              updatePhraseTestValue3(text);
            }}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onFocus={onFocus}
            autoCapitalize="none"
            style={[styles.defaultTextInput, { color: color }]}
          />
          <View style={{ flexDirection: "row"}}>
            {lengthArray.map(item => {
              return (
                <View style={{ height: 1, width: 5, backgroundColor: indexColor, marginRight: 1 }}/>
              );
            })}
          </View>
        </View>
        <View style={styles.index}>
          <Custom_Text
            value={index}
            size={Fonts.size.small}
            color={indexColor}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wordContainer: {
    height: 30,
    width: 95,
    borderRadius: 15,
    borderColor: Colors.headerBackground,
    borderWidth: 0.5,
    paddingLeft: 10,
    paddingRight: 8,
    flexDirection: "row",
    marginRight: 10,
    marginLeft: 5,
    paddingVertical: 5,
    marginVertical: 5,
    backgroundColor: Colors.headerBackground,
  },
  word: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  index: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  defaultTextInput: {
    fontFamily: "DMSans",
    fontSize: Fonts.size.small,
    color: Colors.text,
    backgroundColor: Colors.headerBackground,
    width: 70,
  }
});

const mapStateToProps = ({
  phraseTestValue1,
  phraseTestValue2,
  phraseTestValue3,
}) => ({
  phraseTestValue1,
  phraseTestValue2,
  phraseTestValue3,
});

const mapDispatchToProps = dispatch => ({
  updatePhraseTestValue1: value => dispatch(updatePhraseTestValue1(value)),
  updatePhraseTestValue2: value => dispatch(updatePhraseTestValue2(value)),
  updatePhraseTestValue3: value => dispatch(updatePhraseTestValue3(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecoveryWordTextInput);