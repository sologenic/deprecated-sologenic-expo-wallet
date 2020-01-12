import {
  fromLeft,
  fromRight,
  fromTop,
  fromBottom
} from "react-navigation-transitions";

export const handleTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
  if (
    prevScene &&
    prevScene.route.routeName === 'WalletsScreen' &&
    nextScene.route.routeName === 'AddWalletScreen'
  ) {
    return fromBottom();
  }

  return fromRight();
};
