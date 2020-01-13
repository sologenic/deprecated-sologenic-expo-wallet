import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { screenWidth, screenHeight } from "../constants/Layout";
import Colors from "../constants/Colors";
import Custom_Text from "../components/shared/Custom_Text";
import Fonts from "../constants/Fonts";
import Custom_Button from "../components/shared/Custom_Button";
import { updateIsOrientationComplete } from "../actions";

const slides = [
  {
    key: "slide1",
    title: `Decentralized XRP & \nSOLO Wallet`,
    subtitle: "",
    // image: require("./"),
    style: { backgroundColor: Colors.background, flex: 1 },
  },
  {
    key: "slide2",
    title: `Add, Activate & Manage \nMultiple Wallets`,
    subtitle: "",
    // image: require("./"),
    style: { backgroundColor: Colors.background, flex: 1 },
  },
  {
    key: "slide3",
    title: `Live Market Prices, Recent \nTransactions & More`,
    subtitle: "",
    // image: require("./"),
    style: { backgroundColor: Colors.background, flex: 1 },
  },
  {
    key: "slide4",
    title: `Hodl and Transfer your XRP & SOLO \nfrom a single Wallet Address`,
    subtitle: "",
    // image: require("./"),
    style: { backgroundColor: Colors.background, flex: 1 },
  },
];

class OrientationScreen extends Component {
  constructor(props) {
    super(props);
    // this.requestData();
  }

  renderItem = ({ item }) => {
    const { completeOrientation } = this.props;
    return (
      <View style={item.style}>
        <View style={styles.mainContent}>
          {/* <Image style={styles.image} source={item.image} /> */}
          <Custom_Text
            value={item.title}
            size={Fonts.size.large}
            color={Colors.text}
            style={styles.title}
          />
          <Custom_Text
            value={item.subtitle}
            size={Fonts.size.large}
            color={Colors.text}
            style={styles.subtitle}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Custom_Button
            text="Get Started"
            onPress={() => completeOrientation(true)}
            color={Colors.darkRed}
            size={14}
            textStyle={{ letterSpacing: 0.24, color: Colors.darkRed }}
            style={{
              backgroundColor: Colors.secondaryBackground,
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginBottom: 24,
              opacity: item.key !== "slide4" ? 0.3 : 1,
            }}
            disabled={item.key !== "slide4"}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <AppIntroSlider
        renderItem={item => this.renderItem(item)}
        slides={slides}
        showDoneButton={false}
        // onDone={() => this.btnClicked()}
        showNextButton={false}
        paginationStyle={{
          position: "absolute",
          bottom: 70,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // width: screenWidth,
    // height: screenHeight,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    color: Colors.text,
  },
  subtitle: {
    fontSize: 50,
    textAlign: "center",
    color: Colors.text,
  },
  reward: {},
});

const mapDispatchToProps = dispatch => ({
  completeOrientation: isComplete =>
    dispatch(updateIsOrientationComplete(isComplete)),
});

export default connect(
  null,
  mapDispatchToProps,
)(OrientationScreen);
