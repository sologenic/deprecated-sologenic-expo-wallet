import React, { useState } from "react";
// import P from "prop-types";
import { StyleSheet, View, TouchableOpacity, Clipboard } from "react-native";
import moment from "moment-timezone";
import * as WebBrowser from "expo-web-browser";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Button from "../components/shared/Custom_Button";
import Custom_IconButton from "../components/shared/Custom_IconButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import appConfig from "../app.config";
import config from "../constants/config";
import { formatBalance } from "../utils";

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

export default function TransactionCard({
  transaction,
  walletAddress,
  writeToClipboard,
}) {
  const { outcome, specification, type, id } = transaction;
  // const failedTransaction = outcome.result === 'tecUNFUNDED_PAYMENT';
  const currency = outcome.deliveredAmount
    ? outcome.deliveredAmount.currency
    : "";
  const isSolo = currency === appConfig.soloHash;
  const value = outcome.deliveredAmount ? outcome.deliveredAmount.value : "";
  const timestamp = outcome ? outcome.timestamp : "";
  const result = outcome ? outcome.result : "";
  const fee = outcome ? outcome.fee : "";

  const burnAmount = Number(value) * 0.0001;

  const ledgerVersion = outcome ? outcome.ledgerVersion : "";
  const fundsRecevied =
    specification &&
    specification.destination &&
    specification.destination.address === walletAddress
      ? "+"
      : "-";
  const copyAddress =
    specification &&
    specification.destination &&
    specification.destination.address === walletAddress
      ? specification.source.address
      : specification.destination.address;
  const txId = id;
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
      <View>
        <TouchableOpacity
          style={styles.lowerViewContainer}
          onPress={() => {
            setExpanded(!expanded);
          }}
          activeOpacity={0.9}
        >
          <View style={styles.confirmationContainer}>
            <Custom_Text value="Confirmations" size={10} />
            <Custom_Text
              value={ledgerVersion}
              size={Fonts.size.small}
              isBold
              numberOfLines={1}
            />
          </View>
          <View style={styles.feeContainer}>
            {fundsRecevied === "-" && (
              <View>
                <Custom_Text value="Tx Fee" size={10} numberOfLines={1} />
                <View style={{ flexDirection: "row" }}>
                  <Custom_Text
                    // value={isSolo ? "Ƨ" : currency.toUpperCase()}
                    value="XRP"
                    size={9}
                    style={{ marginTop: 2 }}
                  />
                  <Custom_Text
                    value={` ${fee}`}
                    size={Fonts.size.small}
                    isBold
                    numberOfLines={1}
                  />
                </View>
              </View>
            )}
          </View>
          <View style={styles.burnAmountContainer}>
            {isSolo && fundsRecevied === "-" && (
              <View>
                <Custom_Text value="Burn Amount" size={10} />
                <View style={{ flexDirection: "row" }}>
                  <Custom_Text
                    value={isSolo ? "Ƨ" : currency.toUpperCase()}
                    size={9}
                    style={{ marginTop: 2 }}
                  />
                  <Custom_Text
                    value={` ${burnAmount.toFixed(4)}`}
                    size={Fonts.size.small}
                    isBold
                    numberOfLines={1}
                  />
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.lowerViewContainer}
          onPress={() => {
            setExpanded(!expanded);
          }}
          activeOpacity={0.9}
        >
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
          <View style={styles.copyTxIdContainer}>
            <View
              style={{
                borderRadius: 16.5,
                borderWidth: 0.5,
                borderColor: Colors.lighterGray,
              }}
            >
              <Custom_Button
                text="Copy TX ID"
                onPress={() => writeToClipboard(txId)}
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
          <View style={styles.viewBithompContainer}>
            <TouchableOpacity
              style={{ borderBottomColor: Colors.text, borderBottomWidth: 0.5 }}
              onPress={() => {
                WebBrowser.openBrowserAsync(`${config.bithompUrl}/${txId}`);
              }}
            >
              <Custom_Text
                value="View on Bithomp"
                size={9}
                style={{ marginTop: 2 }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { height: expanded ? 120 : 40 }]}>
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
            value={`${fundsRecevied} ${isSolo ? "Ƨ" : currency.toUpperCase()}`}
            size={9}
            style={{ marginTop: 1 }}
          />
          <Custom_Text
            // value={` ${formatBalance(value)}`}
            value={` ${value}`}
            // value={
            //   result === "tesSUCCESS"
            //     ? ` ${currency.toUpperCase()} ${value}`
            //     : `- ${currency.toUpperCase()} ${value}`
            // }
            size={Fonts.size.small}
            // color={
            //   result === "tesSUCCESS"
            //     ? Colors.freshGreen
            //     : Colors.errorBackground
            // }
            numberOfLines={1}
            isBold
          />
        </View>
        <View
          style={{
            flex: 4,
            flexDirection: "row",
            // justifyContent: "flex-start",
            justifyContent: "space-between",
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
    alignItems: "center",
    flexDirection: "row",
    // paddingLeft: 10,
  },
  statusContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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
  burnAmountContainer: {
    flex: 4,
    // height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  copyAddressContainer: {
    flex: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    // marginRight: 10,
  },
  copyTxIdContainer: {
    flex: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  viewBithompContainer: {
    flex: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
