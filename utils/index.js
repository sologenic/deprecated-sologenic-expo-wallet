import qrcode from "qrcode-generator";
import numbro from "numbro";
const forge = require("node-forge");
const crypto = require("crypto");

import Colors from "../constants/Colors";
import { Wallet, Utils } from "xpring-common-js";
// import { RippleAPI } from "ripple-lib";
// import * as s from "sologenic-xrpl-stream-js";
import * as s from "sologenic-xrpl-stream-js-non-redis";
import appConfig from "../app.config";

export const countWords = words => {
  const arrayOfWords = words
    .trim()
    .split(" ")
    .filter(item => item.lenght !== 0);
  return arrayOfWords.length === 12 ? true : false;
};

export const generateQRCode = data => {
  const typeNumber = 0;
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
  tag,
) => {
  const xAddress = Utils.encodeXAddress(rippleClassicAddress, tag);
  return xAddress;
};

//Decode an X-Address
export const getRippleClassicAddressFromXAddress = xAddress => {
  const classicAddress = Utils.decodeXAddress(xAddress);
  return classicAddress.address;
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

export const sologenic = new s.SologenicTxHandler(
  // RippleAPI Options
  {
    server: "wss://testnet.xrpl-labs.com", // Kudos to Wietse Wind
  },
  // Sologenic Options, hash or redis
  {
    queueType: "hash",
    hash: {},
  },
);

export const isValidSecret = secret => {
  const rippleApi = sologenic.getRippleApi();
  return secret ? rippleApi.isValidSecret(secret) : false;
};

// export const rippleApi = new RippleAPI({
//   server: "wss://s.altnet.rippletest.net:51233"
// });

export const rippleApi = sologenic.getRippleApi();

export const getAccountInfo = address => {
  return rippleApi.getAccountInfo(address);
};

// export const setAccount = (address, secret, keypair) => {
//   return sologenic.setAccount({
//     address,
//     secret: secret ? secret : "",
//     keypair: keypair ? keypair : "",
//   });
// };

// export const transferSolo = (issuer, account, destination, value) => {
//   const valueSendMax = value + 1;
//   const valueAmount = value;
//   const solo = appConfig.soloHash;

//   return sologenic.submit({
//     TransactionType: "Payment",
//     Account: account,
//     Destination: destination,
//     SendMax: {
//       currency: solo,
//       issuer: appConfig.soloIssuer,
//       value: `${valueSendMax}`,
//     },
//     Amount: {
//       currency: solo,
//       issuer: appConfig.soloIssuer,
//       value: `${valueAmount}`,
//     },
//   });
// };
// // Create a trustline linking the account (a certain address) with issuer
// export const createTrustline = account => {
//   const solo = appConfig.soloHash;
//   return sologenic.submit({
//     TransactionType: "TrustSet",
//     Account: account,
//     LimitAmount: {
//       currency: solo,
//       issuer: appConfig.soloIssuer, //this is a test issuer for solo which is generated by sologenic-issuarance
//       value: "400000000",
//     },
//     Flags: 0x00020000,
//   });
// };

export const transferXrp = (account, destination, value) => {
  const valueAmount = value / 0.000001;

  return sologenic.submit({
    TransactionType: "Payment",
    Account: account,
    Destination: destination,
    Amount: `${valueAmount}`,
  });
};

export const formatWalletTotalBalance = number => {
  return parseFloat(number)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const extractSeparatorFromText = text => {
  if (typeof text === "undefined") {
    return "";
  }

  if (typeof text !== "string") {
    text = String(text);
  }

  return text.replace(/,/g, "");
};

export const checkWalletExists = (walletAddress, wallets) => {
  let walletAlreadyExists = false;
  wallets.forEach(item => {
    if (item.walletAddress === walletAddress) {
      console.log(item.walletAddress, " ======= ", walletAddress);
      walletAlreadyExists = true;
    }
  });
  return walletAlreadyExists;
};

export const checkMnemoicExists = (mnemonic, wallets) => {
  let walletAlreadyExists = false;
  wallets.forEach(item => {
    console.log(mnemonic);
    if (
      item.details &&
      item.details.mnemonic &&
      item.details.mnemonic === mnemonic
    ) {
      walletAlreadyExists = true;
    }
  });
  return walletAlreadyExists;
};

export const filterTransactions = (transactions, currentLedger) => {
  let xrpTransactions = [];
  let soloTransactions = [];
  transactions.filter(item => {
    if (item.type === "payment" && item.outcome.result === "tesSUCCESS") {
      if (item.outcome.deliveredAmount.currency === appConfig.soloHash) {
        soloTransactions.push({
          ...item,
          outcome: {
            ...item.outcome,
            ledgerVersion: currentLedger - item.outcome.ledgerVersion,
          },
        });
      } else {
        xrpTransactions.push({
          ...item,
          outcome: {
            ...item.outcome,
            ledgerVersion: currentLedger - item.outcome.ledgerVersion,
          },
        });
      }
    } else {
      if (item.outcome.result === "tecUNFUNDED_PAYMENT") {
        // console.log(item.specification.source.maxAmount);
        if (
          item.specification.source.maxAmount.currency === appConfig.soloHash
        ) {
          soloTransactions.push({
            ...item,
            outcome: {
              ...item.outcome,
              ledgerVersion: currentLedger - item.outcome.ledgerVersion,
            },
          });
        } else if (item.specification.source.maxAmount.currency === "XRP") {
          xrpTransactions.push({
            ...item,
            outcome: {
              ...item.outcome,
              ledgerVersion: currentLedger - item.outcome.ledgerVersion,
            },
          });
        }
      }
    }
  });
  return {
    xrpTransactions,
    soloTransactions,
  };
};

export function formatBalance(value, precision = 6) {
  const regex = new RegExp("^-?\\d+(?:\\.\\d{0," + precision + "})?", "g");
  const a = value.toString().match(regex)[0];
  const dot = a.indexOf(".");

  if (dot === -1) {
    return a + "." + "0".repeat(precision);
  }

  const b = precision - (a.length - dot) + 1;
  return b > 0 ? a + "0".repeat(b) : a;
}

export function format(value, precision = 6) {
  const regex = new RegExp("^-?\\d+(?:\\.\\d{0," + precision + "})?", "g");
  const a = value.toString().match(regex)[0];
  const dot = a.indexOf(".");

  if (dot === -1) {
    return a + "." + "0".repeat(precision);
  }

  const b = precision - (a.length - dot) + 1;
  return b > 0
    ? a + "0".repeat(b).replace(/\d(?=(\d{3})+\.)/g, "$&,")
    : a.replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function getPositionOfLeadingZeros(data) {
  var a = data.split(".");

  if (typeof a[1] === "undefined") {
    return 0;
  }
  a = a[1];
  a = a.split("");
  a.shift();
  a.shift();
  a.reverse();
  var position = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== "0") {
      break;
    }
    position++;
  }
  var result = data.length - position;
  if (position > 7) {
    return a.length - 7;
  } else {
    return result;
  }
}

export const encrypt = (string, salt, address, passphrase) => {
  var cipher = forge.cipher.createCipher("AES-CBC", "FdlPhVMO4Ho_Pb9a");
  cipher.start({
    iv: crypto
      .createHmac("sha256", salt + passphrase)
      .update(address)
      .digest("hex"),
  });
  cipher.update(forge.util.createBuffer(string));
  cipher.finish();
  var encrypted = cipher.output;
  var encodedB64 = forge.util.encode64(encrypted.data);
  return encodedB64;
};

export const decrypt = (encrypted, salt, address, passphrase) => {
  var decipher = forge.cipher.createDecipher("AES-CBC", "FdlPhVMO4Ho_Pb9a");
  decipher.start({
    iv: crypto
      .createHmac("sha256", salt + passphrase)
      .update(address)
      .digest("hex"),
  });
  decipher.update(forge.util.createBuffer(forge.util.decode64(encrypted)));
  decipher.finish();
  return decipher.output.data;
};

// console.log(
//   encrypt(
//     "PRIVATE KEY123",
//     salt,
//     "rGfRVfHBdAiwveepHTy1vJbqugUfmdYMSP",
//     "aB123456",
//   ),
// );

// console.log(
//   decrypt(
//     "rBuyaAXf8G9uqVxpHdVSBg==",
//     salt,
//     "rGfRVfHBdAiwveepHTy1vJbqugUfmdYMSP",
//     "aB123456",
//   ),
// );
