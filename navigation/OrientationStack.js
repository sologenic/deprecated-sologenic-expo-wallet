import { createStackNavigator } from "react-navigation-stack";

import { handleTransition } from "./Transitions";
import OrientationScreen from "../containers/OrientationScreen";
import TermsScreen from "../containers/TermsScreen";
import LicenseAgreementScreen from "../containers/LicenseAgreementScreen";

const OrientationStack = createStackNavigator(
  {
    OrientationScreen: OrientationScreen,
    TermsScreen: TermsScreen,
    LicenseAgreementScreen: LicenseAgreementScreen,
  },
  {
    headerMode: "none",
    initialRouteName: "OrientationScreen",
    transitionConfig: nav => handleTransition(nav),
  },
);

export default OrientationStack;
