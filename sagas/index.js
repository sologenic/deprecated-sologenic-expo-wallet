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
  requestNewsLetterSignupSuccess,
  requestNewsLetterSignupError,
  addNewWalletWithTrustlineSuccess,
  getReserveSuccess,
  getReserveError,
  updateAccountObjects,
} from "../actions";
import {
  createSevensObj,
  sologenic,
  filterTransactions,
  decrypt,
  roundDown,
  setAccountObjects,
  convertXrpPriceToSoloPrice,
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

const sologenicApi = create({
  baseURL: "https://sologenic.com/",
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  },
  timeout: 10000,
});

const getMarketData = defaultCurrency =>
  api.get(`tickers/xrp${defaultCurrency}`);

const getSoloData = defaultCurrency =>
  api.get(`tickers/solo${defaultCurrency}`);

function* requestGetMarketData(action) {
  const baseCurrency = action.payload;
  try {
    const response = yield call(getMarketData, baseCurrency);
    // console.log("GET MARKET: ", response.data);
    if (response.ok) {
      yield put(getMarketDataSuccess(response.data.markets[0]));
    } else {
      yield put(getMarketDataError(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

const postNewsLetterSignup = email =>
  sologenicApi.post(`newsletter-solo-wallet?email=${email}`);

function* requestNewsLetterSignup(action) {
  const { email } = action;
  try {
    const response = yield call(postNewsLetterSignup, email);
    console.log("post email for newsletter response", response);
    if (response.ok) {
      yield put(requestNewsLetterSignupSuccess(response.data));
    } else {
      yield put(requestNewsLetterSignupError(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

// const getSoloData = () => api.get("https://ops.coinfield.com/solo_rates.json");

export function* requestGetSoloData(action) {
  const baseCurrency = action.payload;
  try {
    const response = yield call(getSoloData, baseCurrency);
    // console.log("GET SOLO: ", response.data);
    if (response.ok) {
      yield put(getSoloDataSuccess(response.data.markets[0]));
    } else if (!response.ok) {
      const xrpInBaseCurrency = yield call(getMarketData, baseCurrency);
      const xrpInUsd = yield call(getMarketData, "usd");
      const soloInUsd = yield call(getSoloData, "usd");
      if (xrpInBaseCurrency.ok && xrpInUsd.ok && soloInUsd.ok) {
        const soloData = yield call(
          convertXrpPriceToSoloPrice,
          xrpInBaseCurrency.data.markets[0],
          xrpInUsd.data.markets[0],
          soloInUsd.data.markets[0],
        );
        yield put(getSoloDataSuccess({ last: soloData.formatted }));
      }
    } else {
      yield put(
        getSoloDataError("There was an error fetching the Solo market price"),
      );
    }
  } catch (error) {
    console.log(error);
  }

  // try {
  //   const response = yield call(getMarketData, baseCurrency);
  //   if (response.ok) {
  //     yield put(getMarketDataSuccess(response.data.markets[0]));
  //   } else {
  //     yield put(getMarketDataError(response.data));
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
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
    // yield call(requestGetReserve, address);
    // const response = yield call(getAccountInfo, address);
    // console.log("action ----", action);
    // console.log("id ----", id);
    // console.log("add----", address);
    const response = yield call(getBalances, address);
    const xrpBalance = response.find(item => item.currency === "XRP");
    const soloBalance = response.find(
      item => item.currency === appConfig.soloHash,
    );
    // console.log("response is", response)
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

function* requestGetReserve(action) {
  const { payload } = action;
  const reserve = yield call(calculateReserve, payload);
  if (reserve) {
    yield put(getReserveSuccess(reserve));
  } else {
    yield put(getReserveError());
  }
}

function* requestGetAccountObjects(action) {
  const { payload } = action;
  const accountObjects = yield call(getAccountObjects, payload);
  const state = yield accountObjects
    ? call(setAccountObjects, accountObjects.account_objects)
    : null;
  if (state) {
    yield put(updateAccountObjects(state));
  } else {
    console.log("requestGetAccountObjects ERROR");
  }
}

function* requestPullToRefresh(action) {
  try {
    const { id, address } = action;
    const response = yield call(getBalances, address);
    const xrpBalance = response.find(item => item.currency === "XRP");
    const soloBalance = response.find(
      item => item.currency === appConfig.soloHash,
    );
    if (response) {
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
    yield put(pullToRefreshBalanceError());
    console.log("REQUEST_PULL_TO_REFRESH_ERROR", error);
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
  const isValidSecret = rippleApi.isValidSecret(decrypted);
  const isValidPrivateKey = /[0-9A-Fa-f]{66}/g;
  if (isValidSecret) {
    return sologenic.setAccount({
      address,
      secret: decrypted,
    });
  } else if (isValidPrivateKey.test(decrypted)) {
    return sologenic.setAccount({
      address,
      keypair: {
        publicKey: publicKey,
        privateKey: decrypted,
      },
    });
  }
  return "invalid";
};

const setTrustline = account => {
  const solo = appConfig.soloHash;
  return sologenic.submit({
    TransactionType: "TrustSet",
    Account: account,
    LimitAmount: {
      currency: solo,
      issuer: appConfig.soloIssuer, //this is a test issuer for solo which is generated by sologenic-issuarance
      value: appConfig.soloValue,
    },
    Flags: appConfig.soloFlags,
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
    const validCredentials = yield call(
      setAccount,
      address,
      passphrase,
      salt,
      encrypted,
      publicKey,
    );
    // yield call(setAccount, address, secret, keypair);
    // const ts = yield call(checkTrustlineExists, address);
    // console.log("REQUEST_CREATE_TRUSTLINE TS", ts);
    // if (ts) {
    //   yield put(createTrustlineSuccess(id));
    // } else {
    if (validCredentials === "invalid") {
      yield put(
        createTrustlineError(
          "Activation failed. Please make sure you enetered the correct password.",
        ),
      );
    } else {
      const tx = yield call(setTrustline, address);
      console.log("tx", tx);
      const response = yield tx.promise;
      console.log(response);
      if (response.result && response.result.status === "failed") {
        if (response.result.reason === "invalid_xrp_address") {
          yield put(
            createTrustlineError(
              "Sorry, something went wrong! Please try again later.",
            ),
          );
        } else {
          yield put(createTrustlineError(response.result.reason));
        }
      } else if (response) {
        yield put(createTrustlineSuccess(id));
        yield put(createTrustlineReset());
      } else {
        yield put(createTrustlineError());
      }
    }
  } catch (error) {
    yield put(createTrustlineError(error));
    console.log("REQUEST_CREATE_TRUSTLINE", error);
  }
}

const transferXrp = (account, destination, tag, value) => {
  const valueAmount = (value / 0.000001).toFixed(0);
  console.log(
    "#$%^$#%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^#$%^",
  );
  return tag
    ? sologenic.submit({
        TransactionType: "Payment",
        Account: account,
        Destination: destination,
        DestinationTag: Number(tag),
        Amount: `${valueAmount}`,
      })
    : sologenic.submit({
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
      tag,
      value,
      passphrase,
      salt,
      encrypted,
      publicKey,
      reserve,
    } = action;
    // const secret = keypair ? keypair : "";
    // console.log("REQUEST_TRANSFER_XRP account ", account);
    // console.log("REQUEST_TRANSFER_XRP destination ", destination);
    // console.log("REQUEST_TRANSFER_XRP value ", value);
    // passphrase, salt, encrypted, publicKey
    const validCredentials = yield call(
      setAccount,
      account,
      passphrase,
      salt,
      encrypted,
      publicKey,
    );

    if (validCredentials === "invalid") {
      yield put(
        transferXrpError(
          "Transfer failed. Please make sure you enetered the correct password.",
        ),
      );
    } else {
      const tx = yield call(transferXrp, account, destination, tag, value);
      // console.log("REQUEST_TRANSFER_XRP BEFORE ", tx);
      const response = yield tx.promise;
      // console.log("REQUEST_TRANSFER_XRP AFTER", response);
      if (response.cause && response.cause.status === "failed") {
        console.log("REQUEST_TRANSFER_XRP ERROR", response.cause);
        console.log("REQUEST_TRANSFER_XRP ERROR", response.cause.reason);
        // yield put(transferXrpError(response.result.reason));
        if (response.cause.reason === "tecPATH_DRY") {
          yield put(
            transferXrpError(
              "Transfer failed. Please make sure the address you're sending to has activated their wallet.",
            ),
          );
        } else if (response.cause.reason === "tecUNFUNDED_PAYMENT") {
          yield put(
            transferXrpError(
              `Please make sure you have a minimum of ${Number(value) +
                Number(
                  reserve,
                )} XRP in your wallet to make this transaction. \n\nNote: Network Reserve = ${reserve}`,
            ),
          );
        } else if (
          response.cause.reason.includes(
            "is not a valid hex representation of a byte",
          )
        ) {
          yield put(
            transferXrpError(
              "Transfer failed due to invalid destination address. Please try again.",
            ),
          );
        } else if (response.cause.reason === "temBAD_AMOUNT") {
          yield put(
            transferXrpError(
              "Transfer failed due to invalid amount. Please try again.",
            ),
          );
        } else if (response.cause.reason === "tecNO_DST_INSUF_XRP") {
          yield put(
            transferXrpError(
              "Transfer failed. You must have enough XRP in your wallet to cover the network reserve.",
            ),
          );
        } else if (response.cause.reason === "tefMAX_LEDGER") {
          yield put(transferXrpError("Transfer failed. Please try again."));
        } else if (response.cause.reason === "unable_to_sign_transaction") {
          yield put(
            transferXrpError(
              "Unable to sign transaction. Please check the destination address",
            ),
          );
        } else {
          yield put(transferXrpError(response.cause.reason));
        }
      } else if (response) {
        yield put(transferXrpSuccess(response));
        yield call(requestGetBalance, { id: account, address: account });
        yield call(requestGetMoreTransactions, { address: account, limit: 10 });
        yield call(requestGetBalance, {
          id: destination,
          address: destination,
        });
        console.log("REQUEST_TRANSFER_XRP_SUCCESS: ", response);
      }
    }
  } catch (error) {
    console.log("REQUEST_TRANSFER_XRP_ERROR", error);
    yield put(
      transferXrpError(
        `Your transfer could not be processed. Please try again.`,
      ),
    );
  }
}

const transferSolo = (account, destination, tag, value) => {
  console.log("tag= ", tag);
  return tag
    ? sologenic.submit({
        TransactionType: "Payment",
        Account: account,
        Destination: destination,
        DestinationTag: Number(tag),
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
      })
    : sologenic.submit({
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
      tag,
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
    const validCredentials = yield call(
      setAccount,
      account,
      passphrase,
      salt,
      encrypted,
      publicKey,
    );

    if (validCredentials === "invalid") {
      yield put(
        transferSoloError(
          "Transfer failed. Please make sure you entered the correct password.",
        ),
      );
    } else {
      const tx = yield call(transferSolo, account, destination, tag, value);
      const response = yield tx.promise;
      console.log("REQUEST_TRANSFER_SOLO ", response);
      if (response.cause && response.cause.status === "failed") {
        console.log("REQUEST_TRANSFER_SOLO_ERROR", response);
        if (response.cause.status === "tecPATH_DRY") {
          yield put(
            transferSoloError(
              "Transfer failed. Please make sure you have enough funds, or that the address you're sending to has activated their Solo wallet.",
            ),
          );
        } else if (response.cause.status === "tecUNFUNDED_PAYMENT") {
          yield put(
            transferSoloError(
              "Transfer failed. Please make sure you have enough funds in your wallet.",
            ),
          );
        } else if (
          response.cause.status.includes(
            "is not a valid hex representation of a byte",
          )
        ) {
          yield put(
            transferSoloError(
              "Transfer failed due to invalid destination address. Please try again.",
            ),
          );
        } else if (response.cause.status === "tecPATH_PARTIAL") {
          yield put(
            transferSoloError(
              "The transaction failed because the provided paths did not have enough liquidity to send the full amount.",
            ),
          );
        } else if (response.cause.reason === "unable_to_sign_transaction") {
          yield put(
            transferSoloError(
              "Unable to sign transaction. Please check the destination address",
            ),
          );
        } else if (response.cause.reason === "tecNO_DST_INSUF_XRP") {
          yield put(
            transferSoloError(
              "Transfer failed. You must have enough XRP in your wallet to cover the network reserve.",
            ),
          );
        } else {
          console.log("REQUEST_TRANSFER_SOLO_ERROR data", response.result.data);
          yield put(transferSoloError(response.result.reason));
        }
      } else if (response) {
        yield put(transferSoloSuccess(response));
        console.log("REQUEST_TRANSFER_SOLO_SUCCESS: ", response);
        yield call(requestGetBalance, { id: account, address: account });
        yield call(requestGetMoreTransactions, { address: account, limit: 10 });
        yield call(requestGetBalance, {
          id: destination,
          address: destination,
        });
      }
    }
  } catch (error) {
    console.log("REQUEST_TRANSFER_SOLO_ERROR", error);

    yield put(
      transferSoloError(
        "Your transfer could not be processed. Please try again.",
      ),
    );
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

const calculateReserve = async address => {
  try {
    const rippleApi = sologenic.getRippleApi();
    const serverInfo = await rippleApi.getServerInfo();
    const accountInfo = await rippleApi.getAccountInfo(address);
    const ownerCount = accountInfo.ownerCount;
    const reserveBaseXRP = serverInfo.validatedLedger.reserveBaseXRP;
    const reserveIncrementXRP = serverInfo.validatedLedger.reserveIncrementXRP;
    const additionalReserve = Number(reserveIncrementXRP * ownerCount);
    return additionalReserve + Number(reserveBaseXRP);
  } catch (err) {
    return 20;
  }
};

const getAccountObjects = async address => {
  try {
    const rippleApi = sologenic.getRippleApi();
    return await rippleApi.getAccountObjects(address);
  } catch (err) {
    console.log(err);
  }
};

const getFormattedTransactions = async transactions => {
  const rippleApi = sologenic.getRippleApi();
  const currentLedger = await rippleApi.getLedgerVersion();
  const formattedTransactions = filterTransactions(transactions, currentLedger);
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
    console.log("HERE 1");
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
    // yield put(getTrustlinesError(error));
    yield put(
      addNewWallet({
        newWallet: details,
        nickname: nickname ? nickname : "",
        walletAddress,
        rippleClassicAddress,
        trustline: false,
        encrypted,
        salt,
      }),
    );
    yield call(requestGetBalance, {
      address: walletAddress,
      id: walletAddress,
    });
  }
}

function* requestAddNewWalletWithTrustline(action) {
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
      yield put(addNewWalletWithTrustlineSuccess());
      yield call(requestGetBalance, {
        address: walletAddress,
        id: walletAddress,
      });
    }
  } catch (error) {
    console.log("ADD_NEW_WALLET_WITH_TRUSTLINE_ERROR", error);
    yield put(
      addNewWallet({
        newWallet: details,
        nickname: nickname ? nickname : "",
        walletAddress,
        rippleClassicAddress,
        trustline: false,
        encrypted,
        salt,
      }),
    );
    yield put(addNewWalletWithTrustlineSuccess());
    yield call(requestGetBalance, {
      address: walletAddress,
      id: walletAddress,
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery("GET_MARKET_DATA", requestGetMarketData),
    takeEvery("GET_SOLO_DATA", requestGetSoloData),
    takeEvery("GET_MARKET_SEVENS", requestMarketSevens),
    takeEvery("GET_BALANCE", requestGetBalance),
    takeEvery("PULL_TO_REFRESH", requestPullToRefresh),
    takeEvery("GET_RESERVE", requestGetReserve),
    takeEvery("GET_ACCOUNT_OBJECTS", requestGetAccountObjects),
    takeEvery("CONNECT_TO_RIPPLE_API", requestConnectToRippleApi),
    takeEvery("CREATE_TRUSTLINE", requestCreateTrustline),
    takeEvery("TRANSFER_XRP", requestTransferXrp),
    takeEvery("TRANSFER_SOLO", requestTransferSolo),
    takeEvery("GET_TRANSACTIONS", requestGetTransactions),
    takeEvery("GET_MORE_TRANSACTIONS", requestGetMoreTransactions),
    takeEvery("GET_TRUSTLINES", requestGetTrustlines),
    takeEvery("NEWS_LETTER_SIGNUP", requestNewsLetterSignup),
    takeEvery(
      "ADD_NEW_WALLET_WITH_TRUSTLINE",
      requestAddNewWalletWithTrustline,
    ),
    // takeEvery("POST_PAYMENT_TRANSACTION", requestPostPaymentTransaction),
    // takeEvery("GET_LISTEN_TO_TRANSACTION", requestListenToTransaction),
  ]);
}
