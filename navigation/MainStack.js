import { createStackNavigator } from "react-navigation-stack";

import { handleTransition } from "./Transitions";
import HomeScreen from "../containers/HomeScreen";
import LinksScreen from "../containers/LinksScreen";
import SettingsScreen from "../containers/SettingsScreen";
import WalletsScreen from "../containers/WalletsScreen";
import AddWalletScreen from "../containers/AddWalletScreen";
import CreateNewWalletScreen from "../containers/CreateNewWalletScreen";
import YourRecoveryPhraseScreen from "../containers/YourRecoveryPhraseScreen";
import ImportExistingWalletScreen from "../containers/ImportExistingWalletScreen";
import WalletScreen from "../containers/WalletScreen";
import ReceiveScreen from "../containers/ReceiveScreen";
import SendScreen from "../containers/SendScreen";
import ActivateWalletScreen from "../containers/ActivateWalletScreen";

const MainStack = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    LinksScreen: LinksScreen,
    SettingsScreen: SettingsScreen,
    WalletsScreen: WalletsScreen,
    WalletScreen: WalletScreen,
    AddWalletScreen: AddWalletScreen,
    CreateNewWalletScreen: CreateNewWalletScreen,
    YourRecoveryPhraseScreen: YourRecoveryPhraseScreen,
    ImportExistingWalletScreen: ImportExistingWalletScreen,
    ReceiveScreen: ReceiveScreen,
    ActivateWalletScreen: ActivateWalletScreen,
    SendScreen: SendScreen,
  },
  {
    initialRouteName: 'WalletsScreen',
    transitionConfig: nav => handleTransition(nav),
  }
);

export default MainStack;
