import qrcode from "qrcode-generator";

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
