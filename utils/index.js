import qrcode from "qrcode-generator";
import Colors from "../constants/Colors";

export const countWords = words => {
  const arrayOfWords = words.trim().split(" ").filter(item => item.lenght !== 0);
  return arrayOfWords.length === 12 ? true : false;
};

export const generateQRCode = data => {
  const typeNumber = 4;
  const errorCorrectionLevel = "L";
  const QRCode = qrcode(typeNumber, errorCorrectionLevel);
  QRCode.addData(data);
  QRCode.make();
  const uri = QRCode.createDataURL(2, 4);
  return uri;
}

export const genereateRandomNumbers = () => {
  const randoms = [];
  for (let i = 0; i < 3; i += 1) {
    while (true) {
      const tmp = Math.floor(Math.random() * 12) + 1;
      if (!randoms.includes(tmp)) {
        randoms.push(tmp);
        break;
      }
    }
  }
  return randoms;
}

export const getPriceChange = (tickerLast, tickerOpen) => {
  return tickerLast - tickerOpen === 0
    ? '0%'
    : `${(((tickerLast - tickerOpen) / tickerOpen) * 100).toFixed(2)}%`;
};

export const getPriceColor = priceChange => {
  return priceChange.substring(0, 1) === '-'
    ? Colors.errorBackground
    : Colors.freshGreen;
};

export const createSevensObj = arr => {
  let sevensObj = {};
  arr.map(item => {
    sevensObj[item.market] = item.seven;
  });
  return sevensObj;
};