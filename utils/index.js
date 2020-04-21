import qrcode from "qrcode-generator";
import numbro from "numbro";
const forge = require("node-forge");
const crypto = require("crypto");

import Colors from "../constants/Colors";
import { Wallet, Utils } from "xpring-common-js";
// import { RippleAPI } from "ripple-lib";
import * as s from "sologenic-xrpl-stream-js";
// import * as s from "sologenic-xrpl-stream-js-non-redis";
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

export const isValidRippleAddressWithSecret = (address, secret) => {
  const rippleApi = sologenic.getRippleApi();
  const keypair = rippleApi.deriveKeypair(secret);
  const drivedAddressFromSecret = rippleApi.deriveAddress(keypair.publicKey);
  return address ? address === drivedAddressFromSecret : true;
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
    server: appConfig.server, // Kudos to Wietse Wind
  },
  // Sologenic Options, hash or redis
  {
    // clearCache: true,
    queueType: "hash",
    hash: {},
  },
);

export const initializeSologenicTxHandler = (clientType, xummOn) => {
  return new s.SologenicTxHandler(
    // RippleAPI Options
    {
      server: appConfig.server, // Kudos to Wietse Wind
    },
    // Sologenic Options, hash or redis
    {
      queueType: "hash",
      hash: {},
      clientType,
      signingMechanism: xummOn ? {} : {},
    },
  );  
}

export const isValidSecret = secret => {
  const rippleApi = sologenic.getRippleApi();
  return secret ? rippleApi.isValidSecret(secret) : false;
};

// export const rippleApi = new RippleAPI({
//   server: "wss://s.altnet.rippletest.net:51233"
// });

export const rippleApi = sologenic.getRippleApi();
// console.log("ASJHVASDJASHLVASJHVASF", rippleApi);

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

export const roundDown = (value, precision) => {
  const regExp = new RegExp(`(\\d+\\.\\d{${precision}})`, "g");
  const result = String(value).match(regExp);
  return result ? result[0] : String(value);
};

export const groupThousandsInText = text => {
  if (typeof text !== "string") {
    text = String(text);
  }
  if (text.split("").filter(word => word === ".").length > 0) {
    const integerPortion = text
      .split(".")[0]
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    const fractionalPortion = text.split(".")[1];
    return integerPortion + "." + fractionalPortion;
  }
  return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const formatInput = (text, numberOfDecimals) => {
  if (text.split("").filter(word => word === ".").length > 1) {
    text = text.slice(0, -1);
  } else if (
    text.split("").filter(word => word === ".").length > 0 &&
    text.split(".")[1].length > numberOfDecimals
  ) {
    const difference = text.split(".")[1].length - numberOfDecimals;
    text = text.slice(0, -difference);
  }
  return text;
};

export const excludeLettersExceptForNumber = text => {
  if (text.split("").filter(word => word === ".").length > 0) {
    const integerPortion = extractNumbers(text.split(".")[0]);
    const fractionalPortion = extractNumbers(text.split(".")[1]);
    return integerPortion + "." + fractionalPortion;
  } else {
    return extractNumbers(text);
  }
};

export const extractNumbers = text => {
  let result = "";
  for (let i = 0; i < text.length; i += 1) {
    if (Number(text[i]) || Number(text[i]) === 0) {
      result = result + text[i];
    }
  }
  return result;
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

export function formatBalance(value, precision = 6) {
  var p = "0,0.";
  for (var i = 0; i < precision; i++) {
    p += "0";
  }

  var styledVolume = numbro(value).format(p);
  var position = getPositionOfLeadingZeros(styledVolume);
  var a = styledVolume.substring(0, position);
  var b = styledVolume.substring(position);

  if (a === "") {
    return 0;
  }

  a = a.split(".");

  return a[0] + "." + a[1].replace(".", "");
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

export const formatRecoveryWord = string => {
  return string.replace(/\s+/g, "");
};

export const getDigits = data => {
  const exponentialNotatedData = parseFloat(data).toExponential();
  const position = exponentialNotatedData.indexOf("e");
  return Math.abs(exponentialNotatedData.substring(position + 1));
};

// export const formatBurnAmount = data => {
//   const point = getDigits(data);
//   return data.toFixed(point);
// };

export const formatBurnAmount = data => {
  if (typeof data !== "number") {
    return data;
  }

  const fixedData = data.toFixed(10);
  const lastNonZeroPosition = getPositionLastNonZeroInDigits(fixedData);
  const result = fixedData.substring(0, lastNonZeroPosition + 1);
  if (result[result.length - 1] === ".") {
    return result.substring(0, result.length - 1);
  }
  return result;
};

export const getPositionLastNonZeroInDigits = data => {
  if (typeof data !== "string") {
    return 0;
  }

  const array = data.split("");
  let result;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] !== "0") {
      result = i;
    }
  }

  return result;
};

export const splitAddress = address => {
  return address ? address.split("?dt") : "";
};

export const setAccountObjects = accountObjects => {
  let t = 0,
    e = 0,
    c = 0,
    p = 0,
    s = 0,
    o = 0;

  accountObjects.map(x => {
    switch (x.LedgerEntryType) {
      case "RippleState":
        t++;
        break;
      case "Offer":
        o++;
        break;
      case "SignerList":
        s++;
        break;
      case "Escrow":
        e++;
        break;
      case "PayChannel":
        p++;
        break;
      case "Check":
        c++;
        break;
    }

    return x;
  });

  return {
    objs: [...accountObjects],
    trustlines: t,
    offers: o,
    escrows: e,
    signLists: s,
    payChannels: p,
    checks: c,
    updated: true,
  };
};

export const convertXrpPriceToSoloPrice = (
  xrpInBaseCurrency,
  xrpInUsd,
  soloInUsd,
) => {
  return {
    formatted: formatBalance(
      (soloInUsd.last / xrpInUsd.last) * xrpInBaseCurrency.last,
      4,
    ),
    raw: (soloInUsd.last / xrpInUsd.last) * xrpInBaseCurrency.last,
  };
};
