import { Platform, Dimensions, PixelRatio } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const isIos = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;
export const headerHeight = isAndroid ? (screenHeight / 100) * 11  : (screenHeight / 100) * 12;
export const borderWidth = 1 / PixelRatio.get();
