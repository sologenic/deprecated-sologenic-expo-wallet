import { call, put, takeEvery, all, take, select } from "redux-saga/effects";
import { create } from "apisauce";
// import { RippleAPI } from "ripple-lib";
// import s from "sologenic-xrpl-stream-js-non-redis";

import {
  getBalanceSuccess,
  getBalanceError,
  postPaymentTransactionSuccess,
  postPaymentTransactionError,
  getListenToTransactionSuccess,
  getListenToTransactionError,
  connectToRippleApi,
  connectToRippleApiSuccess,
  connectToRippleApiError,
  getMarketDataSuccess,
  getMarketDataError,
  getMarketSevensSuccess,
  getMarketSevensError,
} from "../actions";
import { createSevensObj, rippleApi, sologenic } from "../utils";

const api = create({
  baseURL: "https://api.coinfield.com/v1/",
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  },
  timeout: 10000
});

const getMarketData = defaultCurrency => api.get(`tickers/xrp${defaultCurrency}`);

function* requestGetMarketData(action) {
  try {
    const response = yield call(getMarketData, "usd");
    if (response.ok) {
      yield put(getMarketDataSuccess(response.data.markets[0]));
    } else {
      yield put(getMarketDataError(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

const mediatorApi = create({
  baseURL: "https://mediator.coinfield.com/",
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  },
  timeout: 10000
});

const getMarketSevens = () => mediatorApi.get('seven');

export function* requestMarketSevens() {
  const response = yield call(getMarketSevens);
  if (response.ok) {
    // convert sevens array into object with key value pairs where key = market id
    const sevensObj = yield createSevensObj(response.data);
    // console.log("sevensObj", sevensObj)
    yield put(getMarketSevensSuccess(sevensObj));
  } else {
    // yield put(currenciesError());
  }
}

const setAccount = () => {
  return sologenic.setAccount({
    address: "rsKfTxnDpmu8iMT5jhmqFbqthhDfrCv39W",
    secret: "snqvwE9tsgjLueu735zdrKvjMy2j7"
  });
}

const submit = () => {
  return sologenic.submit({
    TransactionType: "Payment",
    Account: "rsKfTxnDpmu8iMT5jhmqFbqthhDfrCv39W",
    Destination: "rHUnGTTgqoacevovPmK25hCqNJLAKx2wXh",
    SendMax: {
      currency: "534F4C4F00000000000000000000000000000000",
      issuer: "rEFgkRo5BTxXJiLVYMdEnQQ9J9Kj1F3Yvi",
      value: "10001"
    },
    Amount: {
      currency: "534F4C4F00000000000000000000000000000000",
      issuer: "rEFgkRo5BTxXJiLVYMdEnQQ9J9Kj1F3Yvi",
      value: "10000"
    }
  });
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

    console.log("start")
    yield call(setAccount);
    const tx =  yield call(submit);
    console.log("tx", tx)
    console.log(yield tx.promise);
    console.log("finish")
  } catch (error) {
    // yield put(connectToRippleApiError());
    console.log("REQUEST_CONNECT_RIPPLE_API_ERROR", error);
  }
}

// function* requestConnectToRippleApi() {
//   try {
//     yield rippleApi.connect();
//     yield rippleApi.on("connected", () => {
//       console.log("connected");
//     });
//     yield rippleApi.on("error", (errorCode, errorMessage) => {
//       console.log(errorCode + ": " + errorMessage);
//     });
//     yield rippleApi.on("disconnected", code => {
//       console.log("disconnected, code:", code);
//     });
//     yield put(connectToRippleApiSuccess());
//   } catch (error) {
//     yield put(connectToRippleApiError());
//     console.log("REQUEST_CONNECT_RIPPLE_API_ERROR", error);
//   }
// }

const getAccountInfo = address => {
  return rippleApi.getAccountInfo(address);
};

function* requestGetBalance(action) {
  try {
    // yield rippleApi.connect();
    const { id, address } = action;
    const response = yield call(getAccountInfo, address);
    // console.log("RESPONSE", response, "id", id);
    if (response) {
      yield put(getBalanceSuccess(id, response.xrpBalance));
      yield rippleApi.disconnect();
    } else {
      yield put(getBalanceError());
    }
  } catch (error) {
    console.log("REQUEST_GET_BALANCE_ERROR", error);
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
    takeEvery("GET_MARKET_SEVENS", requestMarketSevens),
    takeEvery("GET_BALANCE", requestGetBalance),
    takeEvery("CONNECT_TO_RIPPLE_API", requestConnectToRippleApi),
    // takeEvery("POST_PAYMENT_TRANSACTION", requestPostPaymentTransaction),
    // takeEvery("GET_LISTEN_TO_TRANSACTION", requestListenToTransaction),
  ]);
}
