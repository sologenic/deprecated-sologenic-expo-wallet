const images = {
  face: require('../assets/images/icons/face.png'),
  fingerprint: require('../assets/images/icons/fingerprint.png'),
  help: require('../assets/images/icons/help.png'),
  solo: require('../assets/images/icons/solo.png'),
  xrp: require('../assets/images/icons/xrp.png'),
  soloSmall: require('../assets/images/icons/solo_small.png'),
  xrpSmall: require('../assets/images/icons/xrp_small.png'),
};

export default images;
export const imagesArray = Object.keys(images).map(k => images[k]);