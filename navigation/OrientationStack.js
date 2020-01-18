import { createStackNavigator } from "react-navigation-stack";

import { handleTransition } from "./Transitions";
import OrientationScreen from "../containers/OrientationScreen";
import TermsScreen from "../containers/TermsScreen";

const OrientationStack = createStackNavigator(
  {
    OrientationScreen: OrientationScreen,
    TermsScreen: TermsScreen,
  },
  {
    headerMode: "none",
    initialRouteName: "OrientationScreen",
    transitionConfig: nav => handleTransition(nav),
  },
);

export default OrientationStack;
