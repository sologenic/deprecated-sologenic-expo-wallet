export const getMarketData = data => {
  return {
    type: "GET_MARKET_DATA",
    payload: data,
  };
};

export const getMarketDataSuccess = data => {
  return {
    type: "GET_MARKET_DATA_SUCCESS",
    payload: data,
  };
};

export const getMarketDataError = data => {
  return {
    type: "GET_MARKET_DATA_ERROR",
    payload: data,
  };
};

export const getMarketSevens = () => {
  return {
    type: "GET_MARKET_SEVENS",
  };
};

export const getMarketSevensSuccess = data => {
  return {
    type: "GET_MARKET_SEVENS_SUCCESS",
    payload: data,
  };
};

export const getMarketSevensError = data => {
  return {
    type: "GET_MARKET_SEVENS_ERROR",
    payload: data,
  };
};

export const testTodoReset = () => {
  return {
    type: "TEST_TODO_RESET",
  };
};

export const updatePhraseTestValue1 = value => {
  return {
    type: "UPDATE_PHRASE_TEST_VALUE_1",
    value,
  };
};

export const updatePhraseTestValue2 = value => {
  return {
    type: "UPDATE_PHRASE_TEST_VALUE_2",
    value,
  };
};

export const updatePhraseTestValue3 = value => {
  return {
    type: "UPDATE_PHRASE_TEST_VALUE_3",
    value,
  };
};

export const getBalance = (id, address) => {
  return {
    type: "GET_BALANCE",
    id,
    address,
  };
};

export const getBalanceSuccess = (id, data) => {
  return {
    type: "GET_BALANCE_SUCCESS",
    id,
    payload: data,
  };
};

export const getBalanceError = data => {
  return {
    type: "GET_BALANCE_ERROR",
    payload: data,
  };
};

export const postPaymentTransaction = (
  address,
  destinationAddress,
  amountValue,
  secret,
) => {
  return {
    type: "POST_PAYMENT_TRANSACTION",
    address,
    secret,
    destinationAddress,
    amountValue,
  };
};

export const postPaymentTransactionSuccess = data => {
  return {
    type: "POST_PAYMENT_TRANSACTION_SUCCESS",
    payload: data,
  };
};

export const postPaymentTransactionError = data => {
  return {
    type: "POST_PAYMENT_TRANSACTION_ERROR",
    payload: data,
  };
};

export const getListenToTransaction = account => {
  return {
    type: "GET_LISTEN_TO_TRANSACTION",
    account,
  };
};

export const getListenToTransactionSuccess = data => {
  return {
    type: "GET_LISTEN_TO_TRANSACTION_SUCCESS",
    payload: data,
  };
};

export const getListenToTransactionError = data => {
  return {
    type: "GET_LISTEN_TO_TRANSACTION_ERROR",
    payload: data,
  };
};

export const connectToRippleApi = () => {
  return {
    type: "CONNECT_TO_RIPPLE_API",
  };
};

export const connectToRippleApiSuccess = () => {
  return {
    type: "CONNECT_TO_RIPPLE_API_SUCCESS",
  };
};

export const connectToRippleApiError = () => {
  return {
    type: "CONNECT_TO_RIPPLE_API_ERROR",
  };
};

export const updateIsOrientationComplete = data => {
  return {
    type: "UPDATE_ORIENTATION_COMPLETE",
    payload: data,
  };
};

export const createPinSuccess = data => {
  return {
    type: "CREATE_PIN",
    payload: data,
  };
};

export const setupAuthentication = () => {
  return {
    type: "SETUP_AUTH_SUCCESS",
  };
};

export const authSuccess = () => {
  return {
    type: "AUTH_SUCCESS",
  };
};

export const updateUnlockMethod = data => {
  return {
    type: "UPDATE_UNLOCK_METHOD",
    payload: data,
  };
};

export const updateBaseCurrency = data => {
  return {
    type: "UPDATE_BASE_CURRENCY",
    payload: data,
  };
};

export const generateNewWallet = newWallet => {
  return {
    type: "GENERATE_NEW_WALLET",
    newWallet,
  };
};

export const addNewWallet = (
  newWallet,
  nickname,
  walletAddress,
  rippleClassicAddress,
  trustline,
) => {
  return {
    type: "ADD_NEW_WALLET",
    newWallet,
    nickname,
    walletAddress,
    rippleClassicAddress,
    trustline,
  };
};

export const saveNickname = nickname => {
  return {
    type: "SAVE_NICKNAME",
    nickname,
  };
};

export const changeNickname = (id, nickname) => {
  return {
    type: "CHANGE_NICKNAME",
    nickname,
    id,
  };
};

export const deleteWallet = id => {
  return {
    type: "DELETE_WALLET",
    id,
  };
};

export const createTrustline = (address, secret, keypair, id) => {
  console.log("HEHERE id", id);
  return {
    type: "CREATE_TRUSTLINE",
    address,
    secret,
    keypair,
    id,
  };
};

export const createTrustlineSuccess = id => {
  console.log("HEHEREFFFFFF id", id);
  return {
    type: "CREATE_TRUSTLINE_SUCCESS",
    id,
  };
};

export const createTrustlineError = () => {
  return {
    type: "CREATE_TRUSTLINE_ERROR",
  };
};

export const transferXrp = (account, keypair, destination, value) => {
  return {
    type: "TRANSFER_XRP",
    account,
    keypair,
    destination,
    value,
  };
};

export const transferXrpSuccess = () => {
  return {
    type: "TRANSFER_XRP_SUCCESS",
  };
};

export const transferXrpError = () => {
  return {
    type: "TRANSFER_XRP_ERROR",
  };
};

export const getTransactions = address => {
  return {
    type: "GET_TRANSACTIONS",
    address,
  };
};

export const getTransactionsSuccess = payload => {
  return {
    type: "GET_TRANSACTIONS_SUCCESS",
    payload,
  };
};

export const getTransactionsError = payload => {
  return {
    type: "GET_TRANSACTIONS_ERROR",
    payload,
  };
};

export const getTrustlines = (
  walletAddress,
  rippleClassicAddress,
  nickname,
  mnemonic,
  details,
) => {
  return {
    type: "GET_TRUSTLINES",
    walletAddress,
    rippleClassicAddress,
    nickname,
    mnemonic,
    details,
  };
};

export const getTrustlinesSuccess = (address, trustline) => {
  return {
    type: "GET_TRUSTLINES_SUCCESS",
    address,
    trustline,
  };
};

export const getTrustlinesError = () => {
  return {
    type: "GET_TRUSTLINES_ERROR",
  };
};

export const activateWallet = id => {
  return {
    type: "ACTIVATE_WALLET",
    payload: id,
  };
};
