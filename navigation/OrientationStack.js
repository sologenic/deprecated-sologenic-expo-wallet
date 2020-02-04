import { createStackNavigator } from "react-navigation-stack";

import { handleTransition } from "./Transitions";
import OrientationScreen from "../containers/OrientationScreen";
import TermsScreen from "../containers/TermsScreen";
import LicenseAgreementScreen from "../containers/LicenseAgreementScreen";
import ReceiveEmailUpdatesScreen from "../containers/ReceiveEmailUpdatesScreen";

const OrientationStack = createStackNavigator(
  {
    OrientationScreen: OrientationScreen,
    TermsScreen: TermsScreen,
    LicenseAgreementScreen: LicenseAgreementScreen,
    ReceiveEmailUpdatesScreen: ReceiveEmailUpdatesScreen,
  },
  {
    headerMode: "none",
    initialRouteName: "OrientationScreen",
    transitionConfig: nav => handleTransition(nav),
  },
);

export default OrientationStack;
