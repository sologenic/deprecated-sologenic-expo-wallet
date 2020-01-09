import { Platform } from "react-native";

const fonts =
  Platform.OS === "ios"
    ? {
        Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
        RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
        "Material Icons": require("../assets/fonts/MaterialIcons.ttf"),
        Titillium: require("../assets/fonts/TitilliumWeb-Regular.ttf"),
        TitilliumSemiBold: require("../assets/fonts/TitilliumWeb-SemiBold.ttf"),
        TitilliumBold: require("../assets/fonts/TitilliumWeb-Bold.ttf")
      }
    : {
        Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
        RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
        MaterialIcons: require("../assets/fonts/MaterialIcons.ttf"),
        Titillium: require("../assets/fonts/TitilliumWeb-Regular.ttf"),
        TitilliumSemiBold: require("../assets/fonts/TitilliumWeb-SemiBold.ttf"),
        TitilliumBold: require("../assets/fonts/TitilliumWeb-Bold.ttf")
      };

const type = {
  base: Platform.OS === "ios" ? "Avenir-Book" : "sans-serif",
  bold: Platform.OS === "ios" ? "Avenir-Black" : "sans-serif-condensed",
  emphasis: Platform.OS === "ios" ? "HelveticaNeue-Italic" : "sans-serif"
};

const size = {
  h1: 38,
  h2: 34,
  h3: 32,
  h4: 24,
  h5: 20,
  h6: 19,
  input: 18,
  large: 17,
  medium: 16,
  normal: 14,
  small: 12,
  tiny: 8.5,
  largeModal: 24
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: "bold",
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
};

if (Platform.OS !== "ios") {
  style.h3.fontStyle = "italic";
  style.h6.fontStyle = "italic";
}

export default {
  fonts,
  type,
  size,
  style
};
