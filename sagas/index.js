import { call, put, takeEvery, all, take, select } from "redux-saga/effects";
import { create } from "apisauce";

import {
  getBalanceSuccess,
  getBalanceError,
  // postPaymentTransactionSuccess,
  // postPaymentTransactionError,
  // getListenToTransactionSuccess,
  // getListenToTransactionError,
  // connectToRippleApi,
  // connectToRippleApiSuccess,
  // connectToRippleApiError,
  getMarketDataSuccess,
  getMarketDataError,
  getMarketSevensSuccess,
  getMarketSevensError,
  createTrustlineSuccess,
  createTrustlineError,
  transferXrpSuccess,
  transferXrpError,
  getTransactionsSuccess,
  getTransactionsError,
  getTrustlinesSuccess,
  getTrustlinesError,
  addNewWallet,
  getMoreTransactionsSuccess,
  getMoreTransactionsError,
  pullToRefreshBalanceSuccess,
  pullToRefreshBalanceError,
  transferSoloError,
  transferSoloSuccess,
  getSoloDataSuccess,
  getSoloDataError,
  createTrustlineReset,
} from "../actions";
import {
  createSevensObj,
  sologenic,
  filterTransactions,
  decrypt,
} from "../utils";
import appConfig from "../app.config";

const api = create({
  baseURL: "https://api.coinfield.com/v1/",
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  },
  timeout: 10000,
});

const getMarketData = defaultCurrency =>
  api.get(`tickers/xrp${defaultCurrency}`);

function* requestGetMarketData(action) {
  const baseCurrency = action.payload;
  try {
    const response = yield call(getMarketData, baseCurrency);
    if (response.ok) {
      yield put(getMarketDataSuccess(response.data.markets[0]));
    } else {
      yield put(getMarketDataError(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

const getSoloData = () => api.get("https://ops.coinfield.com/solo_rates.json");

export function* requestGetSoloData() {
  try {
    const response = yield call(getSoloData);
    if (response.ok) {
      yield put(getSoloDataSuccess(response.data));
    } else {
      yield put(
        getSoloDataError("There was an error fetching the Solo market price"),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

const mediatorApi = create({
  baseURL: "https://mediator.coinfield.com/",
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  },
  timeout: 10000,
});

const getMarketSevens = () => mediatorApi.get("seven");

export function* requestMarketSevens() {
  const response = yield call(getMarketSevens);
  if (response.ok) {
    // convert sevens array into object with key value pairs where key = market id
    const sevensObj = yield createSevensObj(response.data);
    yield put(getMarketSevensSuccess(sevensObj));
  } else {
    // yield put(currenciesError());
  }
}

function* requestConnectToRippleApi() {
  try {
    yield sologenic.connect();

    yield sologenic.on("queued", (id, tx) => {
      console.log("TX QUEUED: ", id);
    });
    yield sologenic.on("dispatched", (id, tx) => {
      console.log("TX DISPATCHED:", id);
    });
    yield sologenic.on("requeued", (id, tx) => {
      console.log("TX requeued:", id);
    });
    yield sologenic.on("warning", (id, type, tx) => {
      console.log("TX WARNING:", id, type, tx);
    });
    yield sologenic.on("validated", (id, tx) => {
      console.log("TX VALIDATED:", id);
    });
    yield sologenic.on("failed", (id, type, tx) => {
      console.log("TX FAILED:", id, type, tx);
    });
    console.log("start");
  } catch (error) {
    // yield put(connectToRippleApiError());
    console.log("REQUEST_CONNECT_RIPPLE_API_ERROR", error);
  }
}

const getAccountInfo = address => {
  const rippleApi = sologenic.getRippleApi();
  return rippleApi.getAccountInfo(address);
};

const getBalances = address => {
  const rippleApi = sologenic.getRippleApi();
  return rippleApi.getBalances(address);
};

function* requestGetBalance(action) {
  try {
    const { id, address } = action;
    // const response = yield call(getAccountInfo, address);
    console.log("action ----", action);
    console.log("id ----", id);
    console.log("add----", address);
    const response = yield call(getBalances, address);
    const xrpBalance = response.find(item => item.currency === "XRP");
    const soloBalance = response.find(
      item => item.currency === appConfig.soloHash,
    );
    if (response) {
      // const { xrpBalance, soloBalance } = yield call(filterBalances, response);
      // console.log("==", xrpBalance);
      // console.log("======", soloBalance);
      yield put(
        getBalanceSuccess(id, {
          xrp: xrpBalance ? Number(xrpBalance.value) : 0,
          solo: soloBalance ? Number(soloBalance.value) : 0,
        }),
      );
    } else {
      yield put(getBalanceError());
    }
  } catch (error) {
    console.log("REQUEST_GET_BALANCE_ERROR", error);
  }
}

function* requestPullToRefresh(action) {
  try {
    const { id, address } = action;
    // const response = yield call(getAccountInfo, address);
    console.log("action ----", action);
    console.log("id ----", id);
    console.log("add----", address);
    const response = yield call(getBalances, address);
    console.log("----", response);
    const xrpBalance = response.find(item => item.currency === "XRP");
    const soloBalance = response.find(
      item => item.currency === appConfig.soloHash,
    );
    if (response) {
      // const { xrpBalance, soloBalance } = yield call(filterBalances, response);
      yield put(
        pullToRefreshBalanceSuccess(id, {
          xrp: xrpBalance ? Number(xrpBalance.value) : 0,
          solo: soloBalance ? Number(soloBalance.value) : 0,
        }),
      );
    } else {
      yield put(pullToRefreshBalanceError());
    }
  } catch (error) {
    console.log("REQUEST_GET_BALANCE_ERROR", error);
  }
}

const setAccount = (address, passphrase, salt, encrypted, publicKey) => {
  console.log("SET ACCOUNT =====", {
    address,
    passphrase,
    salt,
    encrypted,
    publicKey,
  });
  const decrypted = decrypt(encrypted, salt, address, passphrase);
  const rippleApi = sologenic.getRippleApi();
  const isSecret = rippleApi.isValidSecret(decrypted);
  console.log("SET ACCOUNT DESCRYPTED =====", {
    decrypted,
    isSecret,
  });
  if (isSecret) {
    return sologenic.setAccount({
      address,
      secret: decrypted,
    });
  }
  return sologenic.setAccount({
    address,
    keypair: {
      publicKey: publicKey,
      privateKey: decrypted,
    },
  });
};

const setTrustline = account => {
  const solo = appConfig.soloHash;
  return sologenic.submit({
    TransactionType: "TrustSet",
    Account: account,
    LimitAmount: {
      currency: solo,
      issuer: appConfig.soloIssuer, //this is a test issuer for solo which is generated by sologenic-issuarance
      value: "400000000",
    },
    Flags: 131072,
  });
};

const checkTrustlineExists = async address => {
  const rippleApi = sologenic.getRippleApi();
  return rippleApi.getTrustlines(address, {
    counterparty: appConfig.soloIssuer,
  });
};

function* requestCreateTrustline(action) {
  const { address, id, passphrase, salt, encrypted, publicKey } = action;
  console.log("REQUEST_CREATE_TRUSTLINE  ===> ", passphrase);
  console.log("REQUEST_CREATE_TRUSTLINE  ===> ", salt);
  console.log("REQUEST_CREATE_TRUSTLINE  ===> ", encrypted);
  try {
    // address, passphrase, salt, encrypted, publicKey
    yield call(setAccount, address, passphrase, salt, encrypted, publicKey);
    // yield call(setAccount, address, secret, keypair);
    // const ts = yield call(checkTrustlineExists, address);
    // console.log("REQUEST_CREATE_TRUSTLINE TS", ts);
    // if (ts) {
    //   yield put(createTrustlineSuccess(id));
    // } else {
    const tx = yield call(setTrustline, address);
    console.log("tx", tx);

    yield tx.events
      .on("queued", tx => {
        console.log("QUEUED", tx);
      })
      .on("dispatched", (tx, dispatched) => {
        console.log("DISPATCHED", tx, dispatched);
      })
      .on("requeued", (tx, result) => {
        console.log("REQUEUED", tx, result);
      })
      .on("warning", (type, code) => {
        console.log("warning:", type, code);
      })
      .on("validated", (dispatched, result) => {
        console.log("VALIDATED", dispatched, result);
      })
      .on("failed", (type, code) => {
        console.log("failed:", type, code);
      });

    const response = tx.promise;
    console.log(response);
    if (response) {
      yield put(createTrustlineSuccess(id));
      yield put(createTrustlineReset());
    } else {
      yield put(createTrustlineError());
    }
    // }
  } catch (error) {
    yield put(createTrustlineError());
    console.log("REQUEST_CREATE_TRUSTLINE", error);
  }
}

const transferXrp = (account, destination, value) => {
  const valueAmount = value / 0.000001;
  console.log(
    "#$%^$#%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^",
  );
  return sologenic.submit({
    TransactionType: "Payment",
    Account: account,
    Destination: destination,
    Amount: `${valueAmount}`,
  });
};

function* requestTransferXrp(action) {
  try {
    const {
      account,
      destination,
      value,
      passphrase,
      salt,
      encrypted,
      publicKey,
    } = action;
    // const secret = keypair ? keypair : "";
    console.log("REQUEST_TRANSFER_XRP account ", account);
    console.log("REQUEST_TRANSFER_XRP destination ", destination);
    console.log("REQUEST_TRANSFER_XRP value ", value);
    // passphrase, salt, encrypted, publicKey
    yield call(setAccount, account, passphrase, salt, encrypted, publicKey);

    const tx = yield call(transferXrp, account, destination, value);
    console.log("REQUEST_TRANSFER_XRP BEFORE ", tx);
    const response = tx.promise;
    console.log("REQUEST_TRANSFER_XRP AFTER", response);
    if (response.result && response.result.status === "failed") {
      console.log("REQUEST_TRANSFER_XRP_ERROR");
      yield put(transferXrpError(response.result.reason));
    } else if (response) {
      yield put(transferXrpSuccess(response));
      yield call(requestGetBalance, { id: account, address: account });
      yield call(requestGetTransactions, { address: account, limit: 5 });
      yield call(requestGetBalance, { id: destination, address: destination });
      yield call(requestGetTransactions, { address: destination, limit: 5 });
      console.log("REQUEST_TRANSFER_XRP_SUCCESS: ", response);
    }
  } catch (error) {
    console.log("REQUEST_TRANSFER_XRP_ERROR", error);
    yield put(transferXrpError());
  }
}

const transferSolo = (account, destination, value) => {
  return sologenic.submit({
    TransactionType: "Payment",
    Account: account,
    Destination: destination,
    SendMax: {
      currency: appConfig.soloHash,
      issuer: appConfig.soloIssuer,
      value: String(value),
    },
    Amount: {
      currency: appConfig.soloHash,
      issuer: appConfig.soloIssuer,
      value: String(value - value * 0.0001),
    },
  });
};

function* requestTransferSolo(action) {
  try {
    const {
      account,
      destination,
      value,
      passphrase,
      salt,
      encrypted,
      publicKey,
    } = action;
    // const secret = keypair ? keypair : "";
    console.log("REQUEST_TRANSFER_SOLO account ", account);
    console.log("REQUEST_TRANSFER_SOLO destination ", destination);
    console.log("REQUEST_TRANSFER_SOLO value ", value);
    yield call(setAccount, account, passphrase, salt, encrypted, publicKey);
    const tx = yield call(transferSolo, account, destination, value);
    const response = tx.promise;
    console.log("REQUEST_TRANSFER_SOLO ", response);
    if (response.result && response.result.status === "failed") {
      console.log("REQUEST_TRANSFER_SOLO_ERROR", response);
      yield put(transferSoloError(response.result.reason));
    } else if (response) {
      yield put(transferSoloSuccess(response));
      console.log("REQUEST_TRANSFER_SOLO_SUCCESS: ", response);
      yield call(requestGetBalance, { id: account, address: account });
      yield call(requestGetTransactions, { address: account, limit: 5 });
      yield call(requestGetBalance, { id: destination, address: destination });
      yield call(requestGetTransactions, { address: destination, limit: 5 });
    }
  } catch (error) {
    console.log("REQUEST_TRANSFER_SOLO_ERROR", error);
    yield put(transferSoloError());
  }
}

const getTransactions = async (address, limit = 500, walletType) => {
  console.log("walletType------- ", walletType);
  const rippleApi = sologenic.getRippleApi();
  // console.log("getTransactions address ", address);
  // console.log("currentLedger", currentLedger);
  const serverInfo = await rippleApi.getServerInfo();
  const ledgers = serverInfo.completeLedgers.split("-");
  const minLedgerVersion = Number(ledgers[0]);
  const maxLedgerVersion = Number(ledgers[1]);

  // return (txs = await rippleApi.getTransactions(address, {
  //   minLedgerVersion: minLedgerVersion,
  //   maxLedgerVersion: maxLedgerVersion,
  // }));
  return (txs = await rippleApi.getTransactions(address, {
    minLedgerVersion: minLedgerVersion,
    maxLedgerVersion: maxLedgerVersion,
    limit,
  }));

  // return rippleApi.getTransactions(address, {
  //   minLedgerVersion: currentLedger - 500,
  //   maxLedgerVersion: currentLedger,
  // });
};

const getFormattedTransactions = async transactions => {
  const rippleApi = sologenic.getRippleApi();
  const currentLedger = await rippleApi.getLedgerVersion();
  const formattedTransactions = filterTransactions(transactions, currentLedger);
  console.log("FORMATTE TRANSAC ++++++++++", formattedTransactions);
  return formattedTransactions;
};

function* requestGetTransactions({ address, limit, walletType }) {
  // const { address } = action;
  try {
    const response = yield call(getTransactions, address, limit, walletType);
    const { xrpTransactions, soloTransactions } = yield call(
      getFormattedTransactions,
      response,
    );
    // const filteredResponse = getPaymentTransactions(response);
    // console.log("TRANSACTIONS = " , response);
    if (xrpTransactions) {
      yield put(getTransactionsSuccess({ xrpTransactions, soloTransactions }));
    }
  } catch (error) {
    console.log("REQUEST_GET_TRANSACTIONS_ERROR", error);
    yield put(getTransactionsError());
  }
}

function* requestGetMoreTransactions({ address, limit, walletType }) {
  // const { address } = action;
  console.log("moreTransactions address", address);
  try {
    const response = yield call(getTransactions, address, limit, walletType);
    const { xrpTransactions, soloTransactions } = yield call(
      getFormattedTransactions,
      response,
    );
    if (xrpTransactions) {
      yield put(
        getMoreTransactionsSuccess({ xrpTransactions, soloTransactions }),
      );
    }
  } catch (error) {
    console.log("REQUEST_GET_TRANSACTIONS_ERROR", error);
    yield put(getMoreTransactionsError());
  }
}

const getTrustlines = (address, issuer) => {
  const rippleApi = sologenic.getRippleApi();
  return rippleApi.getTrustlines(address, {
    counterparty: issuer,
  });
};

const issuer = appConfig.soloIssuer; //this is a test issuer for solo which is generated by sologenic-issuarance

function* requestGetTrustlines(action) {
  const {
    walletAddress,
    rippleClassicAddress,
    nickname,
    salt,
    encrypted,
    details,
  } = action;
  try {
    const response = yield call(getTrustlines, walletAddress, issuer);
    if (response) {
      const trustline = response.length > 0 ? true : false;
      yield put(
        addNewWallet({
          newWallet: details,
          nickname: nickname ? nickname : "",
          walletAddress,
          rippleClassicAddress,
          trustline,
          encrypted,
          salt,
        }),
      );
      yield put(getTrustlinesSuccess());
      yield call(requestGetBalance, {
        address: walletAddress,
        id: walletAddress,
      });
    }
  } catch (error) {
    console.log("REQUEST_GET_TRUSTLINES_ERROR", error);
    yield put(getTrustlinesError(error));
  }
}

// const preparePayment = (address, payment) => {
//   return rippleLibApi.preparePayment(address, payment);
// };

// const sign = (txJSON, secret) => {
//   return rippleLibApi.sign(txJSON, secret);
// };

// const submit = signedTransaction => {
//   return rippleLibApi.submit(signedTransaction);
// };

// function* requestPostPaymentTransaction(action) {
//   yield rippleLibApi.connect();
//   try {
//     const { address, destinationAddress, amountValue, secret } = action;

//     const payment = {
//       source: {
//         address: address,
//         maxAmount: {
//           value: amountValue,
//           currency: "XRP"
//         }
//       },
//       destination: {
//         address: destinationAddress,
//         amount: {
//           value: amountValue,
//           currency: "XRP"
//         }
//       }
//     };

//     const prepared = yield call(preparePayment, address, payment);
//     console.log("prepared", prepared);
//     try {
//       const responseSign = yield call(sign, prepared.txJSON, secret);
//       console.log("sign", responseSign);
//       try {
//         const { signedTransaction } = responseSign;
//         const responseSubmit = yield call(submit, signedTransaction);
//         console.log("submit", responseSubmit);
//         try {
//           yield put(postPaymentTransactionSuccess(responseSubmit));
//           // yield rippleLibApi.disconnect();
//           // console.log("done and disconnected.");
//         } catch (error) {
//           console.log("Put postpostPaymentTransaction failed.", error);
//           yield put(postPaymentTransactionError(error));
//         }
//       } catch (error) {
//         console.log("submit failed", error);
//       }
//     } catch (error) {
//       console.log("sign failed", error);
//     }
//   } catch (error) {
//     console.log("REQUEST_PAYMENT_PREPARE_ERROR", error);
//   }
// }

// const requestSubscribe = account => {
//   return rippleLibApi.request("subscribe", {
//     accounts: [account]
//   });
// };

// const requestUnsubscribe = account => {
//   return rippleLibApi.request("unsubscribe", {
//     accounts: [account]
//   });
// };

// function* requestListenToTransaction(action) {
//   yield rippleLibApi.connect();
//   const { account } = action;
//   try {
//     yield rippleLibApi.connection.on("transaction", event => {
//       console.log(
//         JSON.stringify(event, null, 2),
//         "------------------------------"
//       );

//       return rippleLibApi
//         .request("unsubscribe", {
//           accounts: [account]
//         })
//         .then(response => {
//           console.log("Successfully unsubscribed", response);
//           rippleLibApi.disconnect();
//         })
//         .catch(error => {
//           console.log("unsubscription error", error);
//         });
//     });
//     try {
//       const response = yield call(requestSubscribe, account);
//       try {
//         console.log(
//           "Listen to transactions",
//           JSON.stringify(response, null, 2)
//         );
//         // if (response.status) {
//         yield put(getListenToTransactionSuccess(response));
//         console.log("Successfully subscribed");

//         // yield rippleLibApi.disconnect();
//         // console.log("done and disconnected.");
//         // }
//       } catch (error) {
//         console.log("Put getListenToTransactionSuccess failed.", error);
//         yield put(getListenToTransactionError(error));
//       }
//     } catch (error) {
//       console.log("subscribed failed.", error);
//     }
//   } catch (error) {
//     console.log("REQUEST_LISTEN_TO_TRANSACTION", error);
//   }
// }

export default function* rootSaga() {
  yield all([
    takeEvery("GET_MARKET_DATA", requestGetMarketData),
    takeEvery("GET_SOLO_DATA", requestGetSoloData),
    takeEvery("GET_MARKET_SEVENS", requestMarketSevens),
    takeEvery("GET_BALANCE", requestGetBalance),
    takeEvery("PULL_TO_REFRESH", requestPullToRefresh),
    takeEvery("CONNECT_TO_RIPPLE_API", requestConnectToRippleApi),
    takeEvery("CREATE_TRUSTLINE", requestCreateTrustline),
    takeEvery("TRANSFER_XRP", requestTransferXrp),
    takeEvery("TRANSFER_SOLO", requestTransferSolo),
    takeEvery("GET_TRANSACTIONS", requestGetTransactions),
    takeEvery("GET_MORE_TRANSACTIONS", requestGetMoreTransactions),
    takeEvery("GET_TRUSTLINES", requestGetTrustlines),
    // takeEvery("POST_PAYMENT_TRANSACTION", requestPostPaymentTransaction),
    // takeEvery("GET_LISTEN_TO_TRANSACTION", requestListenToTransaction),
  ]);
}
