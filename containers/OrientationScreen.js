import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { screenWidth, screenHeight } from "../constants/Layout";
import Colors from "../constants/Colors";
import Custom_Text from "../components/shared/Custom_Text";
import Fonts from "../constants/Fonts";
import Custom_Button from "../components/shared/Custom_Button";
// import { updateIsOrientationComplete } from "../actions";
import images from "../constants/Images";

const width = 360;
const height = 312;
const widthChangeFrac = screenWidth / width;
const newHeight = height * widthChangeFrac;

const slides = [
  {
    key: "slide1",
    title: `Decentralized SOLO, XRP &\nTokenized Assets Wallet`,
    subtitle: "",
    image: images.slide1,
    imageOverlay: images.slide1Overlay,
    style: { backgroundColor: Colors.background, flex: 1 },
  },
  {
    key: "slide2",
    title: `Add, Activate & Manage \nMultiple Wallets`,
    subtitle: "",
    image: images.slide2,
    imageOverlay: images.slide2Overlay,
    style: { backgroundColor: Colors.background, flex: 1 },
  },
  {
    key: "slide3",
    title: `Live Market Prices, Recent \nTransactions & More`,
    subtitle: "",
    image: images.slide3,
    imageOverlay: images.slide3Overlay,
    style: { backgroundColor: Colors.background, flex: 1 },
  },
  {
    key: "slide4",
    title: `Hodl and Transfer your XRP & \nSOLO from a single Wallet Address`,
    subtitle: "",
    image: images.slide4,
    imageOverlay: images.slide4Overlay,
    style: { backgroundColor: Colors.background, flex: 1 },
  },
];

class OrientationScreen extends Component {
  constructor(props) {
    super(props);
    // this.requestData();
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <View style={item.style}>
        <Image style={styles.image} source={item.image} />
        <View style={styles.mainContent}>
          <Image source={item.imageOverlay} />
          <Custom_Text
            value={item.title}
            size={20}
            color={Colors.text}
            style={styles.title}
          />
        </View>
        <View
          style={{
            alignSelf: "center",
            // backgroundColor: "blue",
            marginBottom: 20,
          }}
        >
          <Custom_Button
            text="Get Started"
            onPress={() =>
              navigation.navigate({
                key: "TermsScreen",
                routeName: "TermsScreen",
              })
            }
            color={Colors.darkRed}
            size={14}
            textStyle={{ letterSpacing: 0.24, color: Colors.darkRed }}
            style={{
              backgroundColor: Colors.secondaryBackground,
              paddingHorizontal: 15,
              paddingVertical: 10,
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
          bottom: "8%",
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
    position: "absolute",
    bottom: 0,
    width: screenWidth,
    height: newHeight,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    color: Colors.text,
    fontFamily: "DMSansMedium",
    marginTop: 30,
  },
  subtitle: {
    fontSize: 50,
    textAlign: "center",
    color: Colors.text,
  },
  reward: {},
});

const mapDispatchToProps = dispatch => ({
  // completeOrientation: isComplete =>
  //   dispatch(updateIsOrientationComplete(isComplete)),
});

export default connect(
  null,
  mapDispatchToProps,
)(OrientationScreen);
