const images = {
  face: require('../assets/images/icons/face.png'),
  fingerprint: require('../assets/images/icons/fingerprint.png'),
  help: require('../assets/images/icons/help.png'),
};

export default images;
export const imagesArray = Object.keys(images).map(k => images[k]);