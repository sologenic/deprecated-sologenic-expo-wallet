import React, { useState } from "react";
// import P from "prop-types";
import { StyleSheet, View, TouchableOpacity, Clipboard } from "react-native";
import moment from "moment-timezone";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

// const propTypes = {
//   transaction: P.shape({
//     address: P.string,
//     type: P.string,
//     outcome: P.shape({
//       deliveredAmount: P.shape({
//         currency: P.string,
//         value: P.number
//       }),
//     }),
//     fee: P.number,
//     timestamp: P.string,
//     result: P.string
//    })
// }

// const defaultProps = {
//   transaction: {
//     address: '',
//     type: '',
//     outcome: P.shape({
//       deliveredAmount: P.shape({
//         currency: '',
//         value: 0
//       }),
//     }),
//     fee: 0,
//     timestamp: '',
//     result: ''
//   }
// }

export default function TransactionCard({ transaction, walletAddress }) {
  const { outcome, specification } = transaction;
  // const failedTransaction = outcome.result === 'tecUNFUNDED_PAYMENT';
  const currency = outcome.deliveredAmount
    ? outcome.deliveredAmount.currency
    : "";
  const value = outcome.deliveredAmount ? outcome.deliveredAmount.value : "";
  const timestamp = outcome ? outcome.timestamp : "";
  const result = outcome ? outcome.result : "";
  const fee = outcome ? outcome.fee : "";
  const ledgerVersion = outcome ? outcome.ledgerVersion : "";
  const fundsRecevied =
    specification.destination &&
    specification.destination.address === walletAddress
      ? "+"
      : "-";
  const copyAddress =
    specification.destination &&
    specification.destination.address === walletAddress
      ? specification.source.address
      : specification.destination.address;
  const [expanded, setExpanded] = useState(false);

  const Circle = () => {
    return (
      <View
        style={[
          styles.circle,
          {
            backgroundColor:
              result === "tesSUCCESS"
                ? Colors.freshGreen
                : Colors.errorBackground,
          },
        ]}
      />
    );
  };

  const datetime = moment(timestamp)
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
          <Custom_Text value="Confirmations" size={10} />
          <Custom_Text value={ledgerVersion} size={Fonts.size.small} isBold />
        </View>
        <View style={styles.feeContainer}>
          <Custom_Text value="Fee" size={10} />
          <Custom_Text
            value={`${currency.toUpperCase()} ${fee}`}
            size={Fonts.size.small}
            isBold
          />
        </View>
        <View style={styles.copyAddressContainer}>
          <View
            style={{
              borderRadius: 16.5,
              borderWidth: 0.5,
              borderColor: Colors.lighterGray,
            }}
          >
            <Custom_Button
              text="Copy Address"
              onPress={() => writeToClipboard(copyAddress)}
              size={8}
              fontSize={Fonts.size.tiny}
              style={{
                paddingHorizontal: 8,
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
              icon="content-copy"
              isBold={false}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const writeToClipboard = async address => {
    // const input = txid ? txid : rid;
    await Clipboard.setString(address);
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
        <View style={{ flex: 4, flexDirection: "row" }}>
          <View style={styles.circleContainer}>{Circle()}</View>
          <View style={styles.dateContainer}>
            <Custom_Text value={date} size={10} isBold />
            <Custom_Text value={time} size={10} />
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Custom_Text
            value={`${fundsRecevied} ${currency.toUpperCase()} ${value}`}
            // value={
            //   result === "tesSUCCESS"
            //     ? ` ${currency.toUpperCase()} ${value}`
            //     : `- ${currency.toUpperCase()} ${value}`
            // }
            size={Fonts.size.small}
            color={
              result === "tesSUCCESS"
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
          }}
        >
          <View style={styles.statusContainer}>
            <Custom_Text
              value={result === "tesSUCCESS" ? "Completed" : "Failed"}
              size={Fonts.size.small}
              color={
                result === "tesSUCCESS"
                  ? Colors.freshGreen
                  : Colors.errorBackground
              }
            />
          </View>
          <View style={styles.arrowIconContainer}>
            <Custom_IconButton
              onPress={() => {
                setExpanded(!expanded);
                // toggle();
              }}
              icon={expanded ? "ios-arrow-up" : "ios-arrow-down"}
              size={10}
              style={{
                height: 20,
                width: 20,
                borderRadius: 0,
                backgroundColor: "transparent",
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
      {expanded && renderLowpperView()}
    </View>
  );
}

// TransactionCard.propTypes = propTypes;
// TransactionCard.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.headerBackground,
    marginHorizontal: 24,
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
  upperViewContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  lowerViewContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  circleContainer: {
    height: 40,
    justifyContent: "center",
    paddingRight: 10,
  },
  circle: {
    height: 9,
    width: 9,
    borderRadius: 4.5,
  },
  dateContainer: {
    // paddingRight: 8,
    justifyContent: "center",
  },
  verticalLine: {
    backgroundColor: Colors.lighterGray,
    height: 40,
    width: 0.6,
  },
  amountContainer: {
    flex: 4,
    height: 40,
    justifyContent: "center",
    // paddingLeft: 10,
    // paddingRight: 30,
  },
  statusContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  arrowIconContainer: {
    height: 40,
    justifyContent: "center",
    // paddingLeft: 7.5,
  },
  confirmationContainer: {
    flex: 4,
    // paddingLeft: 14,
    // paddingBottom: 5,
    height: 40,
    justifyContent: "center",
  },
  feeContainer: {
    flex: 4,
    // paddingLeft: 25,
    // paddingBottom: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  copyAddressContainer: {
    flex: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    // paddingRight: 13,
    // paddingLeft: 12.5,
    // paddingBottom: 5,
  },
});
