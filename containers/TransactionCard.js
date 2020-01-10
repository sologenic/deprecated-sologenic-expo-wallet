import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Clipboard } from "react-native";
import moment from "moment-timezone";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

export default function TransactionCard({ transactionType, amount, currency }) {
  const [expanded, setExpanded] = useState(false);

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

  const datetime = moment()
    .format("L.LT")
    .split(".");
  const date = datetime[0];
  const time = datetime[1];

  const renderLowpperView = () => {
    return (
      <TouchableOpacity
        style={styles.lowerViewContainer}
        onPress={() => {
          setExpanded(!expanded);
        }}
        activeOpacity={0.9}
      >
        <View style={styles.confirmationContainer}>
          <Custom_Text value="Confirmation" size={Fonts.size.small} />
          <Custom_Text value={"4932091"} size={Fonts.size.small} isBold />
        </View>
        <View style={styles.feeContainer}>
          <Custom_Text value="Fee" size={Fonts.size.small} />
          <Custom_Text
            value={`${currency.toUpperCase()} ${amount}`}
            size={Fonts.size.small}
            isBold
          />
        </View>
        <View style={styles.copyAddressContainer}>
          <View
            style={{
              width: 86,
              borderRadius: 16.5,
              borderWidth: 0.5,
              borderColor: Colors.lighterGray
            }}
          >
            <Custom_Button
              text="Copy Address"
              onPress={() => writeToClipboard()}
              size={10}
              fontSize={Fonts.size.tiny}
              style={{ height: 23, width: 86, backgroundColor: "transparent" }}
              icon="content-copy"
              isBold={false}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const writeToClipboard = async () => {
    // const input = txid ? txid : rid;
    await Clipboard.setString();
  };

  return (
    <View style={[styles.container, { height: expanded ? 80 : 40 }]}>
      <TouchableOpacity
        style={styles.upperViewContainer}
        onPress={() => {
          setExpanded(!expanded);
        }}
        activeOpacity={0.9}
      >
        <View style={{ flex: 4, flexDirection: "row", paddingHorizontal: 15 }}>
          <View style={styles.circleContainer}>{Circle()}</View>
          <View style={styles.dateContainer}>
            <Custom_Text value={date} size={Fonts.size.small} isBold />
            <Custom_Text value={time} size={Fonts.size.small} />
          </View>
        </View>
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
        <View
          style={{
            flex: 4,
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 10
          }}
        >
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
              onPress={() => {
                setExpanded(!expanded);
                toggle();
              }}
              icon={expanded ? "ios-arrow-up" : "ios-arrow-down"}
              size={Fonts.size.normal}
              style={{
                height: 20,
                width: 20,
                borderRadius: 0,
                backgroundColor: "transparent"
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
      {expanded && renderLowpperView()}
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
    flexDirection: "row",
    justifyContent: "center"
  },
  lowerViewContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  circleContainer: {
    height: 40,
    justifyContent: "center",
    paddingRight: 15
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
    flex: 5,
    height: 40,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 30
  },
  statusContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  arrowIconContainer: {
    height: 40,
    justifyContent: "center",
    paddingLeft: 7.5
  },
  confirmationContainer: {
    flex: 4,
    paddingLeft: 14,
    paddingBottom: 5,
    height: 40,
    justifyContent: "center"
  },
  feeContainer: {
    flex: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  copyAddressContainer: {
    flex: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 13,
    paddingLeft: 12.5,
    paddingBottom: 5
  }
});
