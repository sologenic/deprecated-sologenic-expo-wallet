import React from "react";
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
import CreatePinScreen from "../containers/CreatePinScreen";
import ChangePinScreen from "../containers/ChangePinScreen";
import UnlockScreen from "../containers/UnlockScreen";
import SetupUnlockScreen from "../containers/SetupUnlockScreen";
import ChangeUnlockScreen from "../containers/ChangeUnlockScreen";
import ReceiveScreen from "../containers/ReceiveScreen";
import SendScreen from "../containers/SendScreen";
import ActivateWalletScreen from "../containers/ActivateWalletScreen";
import RecoveryPhraseTestScreen from "../containers/RecoveryPhraseTestScreen";
import ChangeWalletNicknameScreen from "../containers/ChangeWalletNicknameScreen";
import ConfirmUnlockMethodScreen from "../containers/ConfirmUnlockMethodScreen";
import TermsScreen from "../containers/TermsScreen";
import LicenseAgreementScreen from "../containers/LicenseAgreementScreen";
import ReceiveEmailUpdatesScreen from "../containers/ReceiveEmailUpdatesScreen";

const MainStack = createStackNavigator(
  {
    // HomeScreen: HomeScreen,
    HomeScreen: {
      name: "HomeScreen",
      screen: ({ navigation, screenProps }) => {
        if (!screenProps.isAuthenticated) {
          if (!screenProps.authSetupComplete) {
            return (
              <CreatePinScreen
                screenProps={{
                  rootNavigation: navigation,
                }}
              />
            );
          } else {
            return (
              <UnlockScreen
                screenProps={{
                  rootNavigation: navigation,
                }}
              />
            );
          }
        } else {
          return <WalletsScreen screenProps={{ rootNavigation: navigation }} />;
        }
      },
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    // HomeScreen: ({ navigation, screenProps }) => {
    //   if (!screenProps.isAuthenticated) {
    //     if (!screenProps.authSetupComplete) {
    //       return (
    //         <CreatePinScreen
    //           screenProps={{
    //             rootNavigation: navigation,
    //           }}
    //         />
    //       );
    //     } else {
    //       return (
    //         <UnlockScreen
    //           screenProps={{
    //             rootNavigation: navigation,
    //           }}
    //         />
    //       );
    //     }
    //   } else {
    //     return <WalletsScreen screenProps={{ rootNavigation: navigation }} />;
    //   }
    // },
    LinksScreen: LinksScreen,
    SettingsScreen: SettingsScreen,
    WalletsScreen: WalletsScreen,
    WalletScreen: WalletScreen,
    AddWalletScreen: AddWalletScreen,
    CreateNewWalletScreen: CreateNewWalletScreen,
    YourRecoveryPhraseScreen: YourRecoveryPhraseScreen,
    ImportExistingWalletScreen: ImportExistingWalletScreen,
    SetupUnlockScreen: SetupUnlockScreen,
    ChangeUnlockScreen: ChangeUnlockScreen,
    ConfirmUnlockMethodScreen: ConfirmUnlockMethodScreen,
    CreatePinScreen: CreatePinScreen,
    ChangePinScreen: ChangePinScreen,
    ReceiveScreen: ReceiveScreen,
    ActivateWalletScreen: ActivateWalletScreen,
    SendScreen: SendScreen,
    RecoveryPhraseTestScreen: RecoveryPhraseTestScreen,
    ChangeWalletNicknameScreen: ChangeWalletNicknameScreen,
    TermsScreen: TermsScreen,
    LicenseAgreementScreen: LicenseAgreementScreen,
    ReceiveEmailUpdatesScreen: ReceiveEmailUpdatesScreen,
  },
  {
    headerMode: "none",
    initialRouteName: "HomeScreen",
    transitionConfig: nav => handleTransition(nav),
  },
);

export default MainStack;
