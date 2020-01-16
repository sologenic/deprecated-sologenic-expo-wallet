import qrcode from "qrcode-generator";
import Colors from "../constants/Colors";
import { Wallet, Utils } from "xpring-common-js";
import { RippleAPI } from "ripple-lib";
import * as s from "sologenic-xrpl-stream-js-non-redis";

export const countWords = words => {
  const arrayOfWords = words
    .trim()
    .split(" ")
    .filter(item => item.lenght !== 0);
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
};

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
};

export const getPriceChange = (tickerLast, tickerOpen) => {
  return tickerLast - tickerOpen === 0
    ? "0%"
    : `${(((tickerLast - tickerOpen) / tickerOpen) * 100).toFixed(2)}%`;
};

export const getPriceColor = priceChange => {
  return priceChange.substring(0, 1) === "-"
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

// Generate a random wallet.
export const generateNewRandomWallet = () => {
  const result = Wallet.generateRandomWallet();
  return result;
};

// Generate a mnemonic array
export const generateMnemonicArray = input => {
  const result = input.trim().split(" ");
  return result;
};

// Get an address from generated random wallet
export const getAddress = input => {
  const wallet = input.wallet;
  const address = wallet.getAddress();
  return address;
};

// Get wallet from mnemonic
export const getWalletFromMnemonic = mnemonic => {
  const wallet = Wallet.generateWalletFromMnemonic(mnemonic);
  return wallet;
};

// Encode an X-Address
export const getXAddressFromRippleClassicAddress = (
  rippleClassicAddress,
  tag
) => {
  const xAddress = Utils.encodeXAddress(rippleClassicAddress, tag);
  return xAddress;
};

//Decode an X-Address
export const getRippleClassicAddressFromXAddress = xAddress => {
  const classicAddress = Utils.decodeXAddress(xAddress);
  return classicAddress;
};

//Validate ripple address or not
//bitcoin address returns false
export const isValidRippleAddress = address => {
  return address ? Utils.isValidAddress(address) : false;
};

//Validate ripple XAddress or not
//XAddress only returns true
export const isValidXAddress = address => {
  return address ? Utils.isValidXAddress(address) : false;
};

//Validate ripple classic address,'r' is the first letter, or not
//classic address only returns true
export const isValidClassicAddress = address => {
  return address ? Utils.isValidClassicAddress(address) : false;
};

export const isValidSecret = secret => {
  const api = new RippleAPI();
  return secret ? api.isValidSecret(secret) : false;
};

export const rippleApi = new RippleAPI({
  server: "wss://s.altnet.rippletest.net:51233"
});

export const sologenic = new s.SologenicTxHandler(
  // RippleAPI Options
  {
    server: "wss://testnet.xrpl-labs.com" // Kudos to Wietse Wind
  },
  // Sologenic Options, hash or redis
  {
    queueType: "hash",
    hash: {}
  }
);