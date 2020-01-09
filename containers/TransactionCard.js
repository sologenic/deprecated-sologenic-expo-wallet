import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import moment from "moment-timezone";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Custom_Modal from "../components/shared/Custom_Modal";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

export default function TransactionCard({ transactionType, amount, currency }) {
  const Circle = transactionType => {
    return (
      <View
        style={[
          styles.circle,
          {
            backgroundColor:
              transactionType === "send"
                ? Colors.freshGreen
                : Colors.errorBackground
          }
        ]}
      />
    );
  };
  const VerticalLine = () => {
    return <View style={styles.verticalLine} />;
  };

  const datetime = moment()
    .format("L.LT")
    .split(".");
  const date = datetime[0];
  const time = datetime[1];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.upperViewContainer}>
        <View style={styles.circleContainer}>{Circle()}</View>
        <View style={styles.dateContainer}>
          <Custom_Text value={date} size={Fonts.size.small} isBold />
          <Custom_Text value={time} size={Fonts.size.small} />
        </View>
        {VerticalLine()}
        <View style={styles.amountContainer}>
          <Custom_Text
            value={
              transactionType === "send"
                ? `+ ${currency.toUpperCase()} ${amount}`
                : `- ${currency.toUpperCase()} ${amount}`
            }
            size={Fonts.size.small}
            color={
              transactionType === "send"
                ? Colors.freshGreen
                : Colors.errorBackground
            }
            isBold
          />
        </View>
        {VerticalLine()}
        <View style={styles.statusContainer}>
          <Custom_Text
            value={"Completed"}
            size={Fonts.size.small}
            color={
              transactionType === "send"
                ? Colors.freshGreen
                : Colors.errorBackground
            }
            isBold
          />
        </View>
        <View style={styles.arrowIconContainer}> 
          <Custom_IconButton
            onPress={() => {}}
            icon="ios-arrow-down"
            size={Fonts.size.small}
            style={{
              height: 20,
              width: 20,
              borderRadius: 0,
              backgroundColor: "transparent"
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.headerBackground,
    marginHorizontal: 24,
    height: 40,
    borderRadius: 20
  },
  upperViewContainer: {
    flexDirection: "row"
  },
  circleContainer: {
    height: 40,
    justifyContent: "center",
    marginHorizontal: 15
  },
  circle: {
    height: 9,
    width: 9,
    borderRadius: 4.5
  },
  dateContainer: {
    paddingRight: 8
  },
  verticalLine: {
    backgroundColor: Colors.lighterGray,
    height: 40,
    width: 0.6
  },
  amountContainer: {
    height: 40,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 30,
  },
  statusContainer: {
    height: 40,
    justifyContent: "center",
  },
  arrowIconContainer: {
    height: 40,
    justifyContent: "center",
  }
});
