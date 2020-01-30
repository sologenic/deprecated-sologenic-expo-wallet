const defaultState = {
  marketData: null,
  getMarketDataPending: null,
  getMarketDataSuccess: null,
  getMarketDataError: null,
  soloData: null,
  getSoloDataPending: null,
  getSoloDataSuccess: null,
  getSoloDataError: null,
  marketSevens: null,
  getMarketSevensPending: null,
  getMarketSevensSuccess: null,
  getMarketSevensError: null,
  balance: null,
  getBalancePending: null,
  getBalanceSuccess: null,
  getBalanceError: null,
  pullToRefreshBalancePending: null,
  pullToRefreshBalanceSuccess: null,
  pullToRefreshBalanceError: null,
  postPaymentTransactionPending: null,
  postPaymentTransactionSuccess: null,
  postPaymentTransactionError: null,
  resultPaymentTransaction: null,
  errors: null,
  getListenToTransactionPending: null,
  getListenToTransactionSuccess: null,
  getListenToTransactionError: null,
  transactions: null,
  connectToRippleApiPending: null,
  connectToRippleApiSuccess: null,
  connectToRippleApiError: null,
  getTrustlinesPending: false,
  getTrustlinesSuccess: false,
  getTrustlinesError: false,
  getTrustlinesErrorStr: "",
  isOrientationComplete: null,
  isPinCreated: null,
  pin: null,
  phraseTestValue1: "",
  phraseTestValue2: "",
  phraseTestValue3: "",
  newWallet: null,
  wallets: [],
  wallet: {
    id: "",
    nickname: "",
    details: {
      wallet: {
        id: "",
        privateKey: "",
        publicKey: "",
      },
    },
    balance: {
      xrp: "",
      solo: "",
      tokenizedAssets: "",
    },
    walletAddress: "",
    rippleClassicAddress: "",
    transactions: [],
  },
  nickname: "",
  createTrustlinePending: null,
  createTrustlineSuccess: null,
  createTrustlineError: null,
  transferSoloPending: null,
  transferSoloSuccess: null,
  transferSoloError: null,
  transferSoloErrorStr: null,
  transferXrpPending: null,
  transferXrpSuccess: null,
  transferXrpError: null,
  transferXrpErrorStr: null,
  transactions: null,
  soloTransactions: null,
  getTransactionsPending: null,
  getTransactionsSuccess: null,
  getTransactionsError: null,
  isAuthenticated: null,
  authSetupComplete: null,
  unlockMethod: null,
  baseCurrency: {
    label: "USD",
    value: "usd",
    key: "usd",
    symbol: "$",
    type: "fiat",
  },
  netinfo: null,
};

const getMarketData = (state, action) => {
  return Object.assign({}, state, {
    getMarketDataPending: true,
    getMarketDataSuccess: false,
    getMarketDataError: false,
  });
};

const getMarketDataSuccess = (state, action) => {
  return Object.assign({}, state, {
    marketData: action.payload,
    getMarketDataPending: false,
    getMarketDataSuccess: true,
    getMarketDataError: false,
  });
};

const getMarketDataError = (state, action) => {
  return Object.assign({}, state, {
    marketData: action.payload,
    getMarketDataPending: false,
    getMarketDataSuccess: false,
    getMarketDataError: true,
  });
};

const getSoloData = state => {
  return Object.assign({}, state, {
    getSoloDataPending: true,
    getSoloDataSuccess: false,
    getSoloDataError: false,
  });
};

const getSoloDataSuccess = (state, action) => {
  return Object.assign({}, state, {
    soloData: action.payload,
    getSoloDataPending: false,
    getSoloDataSuccess: true,
    getSoloDataError: false,
  });
};

const getSoloDataError = (state, action) => {
  return Object.assign({}, state, {
    marketData: action.payload,
    getSoloDataPending: false,
    getSoloDataSuccess: false,
    getSoloDataError: true,
  });
};

const getMarketSevens = (state, action) => {
  return Object.assign({}, state, {
    getMarketSevensPending: true,
    getMarketSevensSuccess: false,
    getMarketSevensError: false,
  });
};

const getMarketSevensSuccess = (state, action) => {
  return Object.assign({}, state, {
    marketSevens: action.payload,
    getMarketSevensPending: false,
    getMarketSevensSuccess: true,
    getMarketSevensError: false,
  });
};

const getMarketSevensError = (state, action) => {
  return Object.assign({}, state, {
    marketData: action.payload,
    getMarketSevensPending: false,
    getMarketSevensSuccess: false,
    getMarketSevensError: true,
  });
};

const updatePhraseTestValue1 = (state, action) => {
  return Object.assign({}, state, {
    phraseTestValue1: action.value,
  });
};

const updatePhraseTestValue2 = (state, action) => {
  return Object.assign({}, state, {
    phraseTestValue2: action.value,
  });
};

const updatePhraseTestValue3 = (state, action) => {
  return Object.assign({}, state, {
    phraseTestValue3: action.value,
  });
};

const getBalance = (state, action) => {
  return Object.assign({}, state, {
    getBalancePending: true,
    getBalanceSuccess: false,
    getBalanceError: false,
  });
};

const getBalanceSuccess = (state, action) => {
  const { wallets } = state;
  const walletsCopy = [...wallets];
  const { id, xrpBalance, soloBalance } = action;
  const updatedWallets = walletsCopy.map(item => {
    if (item.id === id) {
      item.balance.xrp = xrpBalance;
      item.balance.solo = soloBalance;
      return item;
    }
    return item;
  });

  return Object.assign({}, state, {
    balance: xrpBalance,
    soloBalance: soloBalance,
    wallets: updatedWallets,
    getBalancePending: false,
    getBalanceSuccess: true,
    getBalanceError: false,
  });
};

const getBalanceError = (state, action) => {
  return Object.assign({}, state, {
    errors: action.payload,
    getBalancePending: false,
    getBalanceSuccess: false,
    getBalanceError: true,
  });
};
const pullToRefresh = (state, action) => {
  return Object.assign({}, state, {
    pullToRefreshBalancePending: true,
    pullToRefreshBalanceSuccess: false,
    pullToRefreshBalanceError: false,
  });
};

const pullToRefreshSuccess = (state, action) => {
  const { wallets } = state;
  const walletsCopy = [...wallets];
  const { id, xrpBalance, soloBalance } = action;
  const updatedWallets = walletsCopy.map(item => {
    if (item.id === id) {
      item.balance.xrp = xrpBalance;
      item.balance.solo = soloBalance;
      return item;
    }
    return item;
  });
  return Object.assign({}, state, {
    balance: xrpBalance,
    soloBalance: soloBalance,
    wallets: updatedWallets,
    pullToRefreshBalancePending: false,
    pullToRefreshBalanceSuccess: true,
    pullToRefreshBalanceError: false,
  });
};

const pullToRefreshError = (state, action) => {
  return Object.assign({}, state, {
    errors: action.payload,
    pullToRefreshBalancePending: false,
    pullToRefreshBalanceSuccess: false,
    pullToRefreshBalanceError: true,
  });
};

const postPaymentTransaction = (state, action) => {
  return Object.assign({}, state, {
    postPaymentTransactionPending: true,
    postPaymentTransactionSuccess: false,
    postPaymentTransactionError: false,
  });
};

const postPaymentTransactionSuccess = (state, action) => {
  return Object.assign({}, state, {
    postPaymentTransactionPending: false,
    postPaymentTransactionSuccess: true,
    postPaymentTransactionError: false,
    resultPaymentTransaction: action.payload,
  });
};

const postPaymentTransactionError = (state, action) => {
  return Object.assign({}, state, {
    postPaymentTransactionPending: false,
    postPaymentTransactionSuccess: false,
    postPaymentTransactionError: true,
    errors: action.payload,
  });
};

const getListenToTransaction = (state, action) => {
  return Object.assign({}, state, {
    getListenToTransactionPending: true,
    getListenToTransactionSuccess: false,
    getListenToTransactionError: false,
  });
};

const getListenToTransactionSuccess = (state, action) => {
  return Object.assign({}, state, {
    getListenToTransactionPending: false,
    getListenToTransactionSuccess: true,
    getListenToTransactionError: false,
    transactions: action.payload,
  });
};

const getListenToTransactionError = (state, action) => {
  return Object.assign({}, state, {
    getListenToTransactionPending: false,
    getListenToTransactionSuccess: false,
    getListenToTransactionError: true,
    errors: action.payload,
  });
};

const connectToRippleApi = (state, action) => {
  return Object.assign({}, state, {
    connectToRippleApiPending: true,
    connectToRippleApiSuccess: false,
    connectToRippleApiError: false,
  });
};

const connectToRippleApiSuccess = (state, action) => {
  return Object.assign({}, state, {
    connectToRippleApiPending: false,
    connectToRippleApiSuccess: true,
    connectToRippleApiError: false,
  });
};

const connectToRippleApiError = (state, action) => {
  return Object.assign({}, state, {
    connectToRippleApiPending: false,
    connectToRippleApiSuccess: false,
    connectToRippleApiError: true,
  });
};

const updateIsOrientationComplete = (state, action) => {
  return Object.assign({}, state, {
    isOrientationComplete: action.payload,
  });
};

const createPinSuccess = (state, action) => {
  return Object.assign({}, state, {
    pin: action.payload,
  });
};

const setupAuthentication = state => {
  return Object.assign({}, state, {
    authSetupComplete: true,
  });
};

const authSuccess = state => {
  return Object.assign({}, state, {
    isAuthenticated: true,
  });
};

const updateUnlockMethod = (state, action) => {
  return Object.assign({}, state, {
    unlockMethod: action.payload,
  });
};

const updateBaseCurrency = (state, action) => {
  return Object.assign({}, state, {
    baseCurrency: action.payload,
  });
};

const generateNewWallet = (state, action) => {
  return Object.assign({}, state, {
    newWallet: action.newWallet,
  });
};

const addNewWallet = (state, action) => {
  const { wallets } = state;
  const {
    nickname,
    newWallet,
    walletAddress,
    rippleClassicAddress,
    trustline,
    encrypted,
    salt,
  } = action;
  const wallet = {
    id: rippleClassicAddress,
    nickname,
    details: newWallet,
    balance: {
      xrp: 0,
      solo: 0,
      tokenizedAssets: 0,
    },
    walletAddress: rippleClassicAddress,
    rippleClassicAddress,
    transactions: [],
    trustline,
    encrypted,
    salt,
  };
  console.log("REDUCER =====================", wallet);
  return Object.assign({}, state, {
    wallets: [...wallets, wallet],
  });
};

const saveNickname = (state, action) => {
  return Object.assign({}, state, {
    nickname: action.nickname,
  });
};

const changeNickname = (state, action) => {
  const { wallets } = state;
  const wallet = wallets.find(item => item.id === action.id);
  const newWallet = {
    ...wallet,
    nickname: action.nickname,
  };
  const newWallets = wallets.map(item => {
    if (item.id === action.id) {
      return newWallet;
    }
    return item;
  });
  return Object.assign({}, state, {
    wallet: newWallet,
    wallets: newWallets,
  });
};

const deleteWallet = (state, action) => {
  const { wallets } = state;
  const copyWallets = [...wallets];
  const updatedWallets = copyWallets.filter(wallet => {
    return wallet.id !== action.id;
  });
  return Object.assign({}, state, {
    wallets: updatedWallets,
  });
};

const createTrustline = (state, action) => {
  return Object.assign({}, state, {
    createTrustlinePending: true,
    createTrustlineSuccess: false,
    createTrustlineError: false,
  });
};

const createTrustlineSuccess = (state, action) => {
  console.log("HERE");
  const { id } = action;
  console.log("id", id);
  const { wallets } = state;
  const copyWallets = [...wallets];
  let w;
  const updatedWallets = copyWallets.map(wallet => {
    if (wallet.id === action.id) {
      wallet.trustline = true;
      w = {
        ...wallet,
        trustline: true,
      };
    }
    return wallet;
  });
  return Object.assign({}, state, {
    createTrustlinePending: false,
    createTrustlineSuccess: true,
    createTrustlineError: false,
    wallets: updatedWallets,
    wallet: w,
  });
};

const createTrustlineError = (state, action) => {
  return Object.assign({}, state, {
    createTrustlinePending: false,
    createTrustlineSuccess: true,
    createTrustlineError: false,
  });
};

const createTrustlineReset = (state, action) => {
  return Object.assign({}, state, {
    createTrustlinePending: false,
    createTrustlineSuccess: false,
    createTrustlineError: false,
  });
};

const transferXrp = (state, action) => {
  return Object.assign({}, state, {
    transferXrpPending: true,
    transferXrpSuccess: false,
    transferXrpError: false,
  });
};

const transferXrpSuccess = (state, action) => {
  return Object.assign({}, state, {
    transferXrpPending: false,
    transferXrpSuccess: true,
    transferXrpError: false,
  });
};

const transferXrpError = (state, action) => {
  return Object.assign({}, state, {
    transferXrpPending: false,
    transferXrpSuccess: false,
    transferXrpError: true,
    transferXrpErrorStr: action.payload,
  });
};

const transferXrpReset = (state, action) => {
  return Object.assign({}, state, {
    transferXrpPending: false,
    transferXrpSuccess: false,
    transferXrpError: false,
    transferXrpErrorStr: "",
  });
};

const transferSolo = (state, action) => {
  return Object.assign({}, state, {
    transferSoloPending: true,
    transferSoloSuccess: false,
    transferSoloError: false,
  });
};

const transferSoloSuccess = (state, action) => {
  return Object.assign({}, state, {
    transferSoloPending: false,
    transferSoloSuccess: true,
    transferSoloError: false,
  });
};

const transferSoloError = (state, action) => {
  return Object.assign({}, state, {
    transferSoloPending: false,
    transferSoloSuccess: false,
    transferSoloError: true,
    transferSoloErrorStr: action.payload,
  });
};

const transferSoloReset = (state, action) => {
  return Object.assign({}, state, {
    transferSoloPending: false,
    transferSoloSuccess: false,
    transferSoloError: false,
    transferSoloErrorStr: "",
  });
};

const getTransactions = (state, action) => {
  return Object.assign({}, state, {
    getTransactionsPending: true,
    getTransactionsSuccess: false,
    getTransactionsError: false,
  });
};

const getMoreTransactions = (state, action) => {
  return Object.assign({}, state, {
    getMoreTransactionsPending: true,
    getMoreTransactionsSuccess: false,
    getMoreTransactionsError: false,
  });
};

const getMoreTransactionsSuccess = (state, action) => {
  return Object.assign({}, state, {
    getMoreTransactionsPending: false,
    getMoreTransactionsSuccess: true,
    getMoreTransactionsError: false,
    transactions: action.payload.xrpTransactions,
    soloTransactions: action.payload.soloTransactions,
  });
};

const getMoreTransactionsError = (state, action) => {
  return Object.assign({}, state, {
    getMoreTransactionsPending: false,
    getMoreTransactionsSuccess: false,
    getMoreTransactionsError: true,
  });
};

const clearTransactions = state => {
  return Object.assign({}, state, {
    transactions: null,
    getTransactionsPending: false,
    getTransactionsSuccess: false,
    getTransactionsError: false,
  });
};

const getTransactionsSuccess = (state, action) => {
  console.log(action.payload.xrpTransactions);
  return Object.assign({}, state, {
    getTransactionsPending: false,
    getTransactionsSuccess: true,
    getTransactionsError: false,
    transactions: action.payload.xrpTransactions,
    soloTransactions: action.payload.soloTransactions,
  });
};

const getTransactionsError = (state, action) => {
  return Object.assign({}, state, {
    getTransactionsPending: false,
    getTransactionsSuccess: false,
    getTransactionsError: true,
    error: action.payload,
  });
};

const getTrustlines = (state, action) => {
  return Object.assign({}, state, {
    getTrustlinesPending: true,
    getTrustlinesSuccess: false,
    getTrustlinesError: false,
  });
};

const getTrustlinesSuccess = (state, action) => {
  const { wallets } = state;
  const copyWallets = [...wallets];
  const updatedWallets = copyWallets.map(wallet => {
    if (wallet.id === action.address) {
      wallet.trustline = action.trustline;
    }
    return wallet;
  });
  return Object.assign({}, state, {
    getTrustlinesPending: false,
    getTrustlinesSuccess: true,
    getTrustlinesError: false,
    // wallets: updatedWallets,
  });
};

const getTrustlinesError = (state, action) => {
  return Object.assign({}, state, {
    getTrustlinesPending: false,
    getTrustlinesSuccess: false,
    getTrustlinesError: true,
    getTrustlinesErrorStr: action.payload,
  });
};

const getTrustlinesReset = state => {
  return Object.assign({}, state, {
    getTrustlinesPending: false,
    getTrustlinesSuccess: false,
    getTrustlinesError: false,
    getTrustlinesErrorStr: "",
  });
};

const activateWallet = (state, action) => {
  const { wallets } = state;
  const copyWallets = [...wallets];
  let updatedWallet;
  const updatedWallets = copyWallets.map(wallet => {
    if (wallet.id === action.payload) {
      updatedWallet = { ...wallet, isActive: true };
      return { ...wallet, isActive: true };
    }
    return wallet;
  });
  return Object.assign({}, state, {
    wallets: updatedWallets,
    wallet: updatedWallet,
  });
};

const setWallet = (state, action) => {
  const { wallets } = state;
  const wallet = wallets.find(item => item.id === action.payload);
  return Object.assign({}, state, {
    wallet,
  });
};

const resetWallet = state => {
  return Object.assign({}, state, {
    wallet: defaultState.wallet,
  });
};

const getNetInfo = (state, action) => {
  const { netinfo } = action;
  return Object.assign({}, state, {
    netinfo,
  });
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_MARKET_DATA":
      return getMarketData(state, action);
    case "GET_MARKET_DATA_SUCCESS":
      return getMarketDataSuccess(state, action);
    case "GET_MARKET_DATA_ERROR":
      return getMarketDataError(state, action);
    case "GET_SOLO_DATA":
      return getSoloData(state, action);
    case "GET_SOLO_DATA_SUCCESS":
      return getSoloDataSuccess(state, action);
    case "GET_SOLO_DATA_ERROR":
      return getSoloDataError(state, action);
    case "GET_MARKET_SEVENS":
      return getMarketSevens(state, action);
    case "GET_MARKET_SEVENS_SUCCESS":
      return getMarketSevensSuccess(state, action);
    case "GET_MARKET_SEVENS_ERROR":
      return getMarketSevensError(state, action);
    case "UPDATE_PHRASE_TEST_VALUE_1":
      return updatePhraseTestValue1(state, action);
    case "UPDATE_PHRASE_TEST_VALUE_2":
      return updatePhraseTestValue2(state, action);
    case "UPDATE_PHRASE_TEST_VALUE_3":
      return updatePhraseTestValue3(state, action);
    case "GET_BALANCE":
      return getBalance(state, action);
    case "GET_BALANCE_SUCCESS":
      return getBalanceSuccess(state, action);
    case "GET_BALANCE_ERROR":
      return getBalanceError(state, action);
    case "PULL_TO_REFRESH":
      return pullToRefresh(state, action);
    case "PULL_TO_REFRESH_SUCCESS":
      return pullToRefreshSuccess(state, action);
    case "PULL_TO_REFRESH_ERROR":
      return pullToRefreshError(state, action);
    case "POST_PAYMENT_TRANSACTION":
      return postPaymentTransaction(state, action);
    case "POST_PAYMENT_TRANSACTION_SUCCESS":
      return postPaymentTransactionSuccess(state, action);
    case "POST_PAYMENT_TRANSACTION_ERROR":
      return postPaymentTransactionError(state, action);
    case "GET_LISTEN_TO_TRANSACTION":
      return getListenToTransaction(state, action);
    case "GET_LISTEN_TO_TRANSACTION_SUCCESS":
      return getListenToTransactionSuccess(state, action);
    case "GET_LISTEN_TO_TRANSACTION_ERROR":
      return getListenToTransactionError(state, action);
    case "CONNECT_TO_RIPPLE_API":
      return connectToRippleApi(state, action);
    case "CONNECT_TO_RIPPLE_API_SUCCESS":
      return connectToRippleApiSuccess(state, action);
    case "CONNECT_TO_RIPPLE_API_ERROR":
      return connectToRippleApiError(state, action);
    case "GENERATE_NEW_WALLET":
      return generateNewWallet(state, action);
    case "ADD_NEW_WALLET":
      return addNewWallet(state, action);
    case "SAVE_NICKNAME":
      return saveNickname(state, action);
    case "CHANGE_NICKNAME":
      return changeNickname(state, action);
    case "DELETE_WALLET":
      return deleteWallet(state, action);
    case "CREATE_TRUSTLINE":
      return createTrustline(state, action);
    case "CREATE_TRUSTLINE_SUCCESS":
      return createTrustlineSuccess(state, action);
    case "CREATE_TRUSTLINE_ERROR":
      return createTrustlineError(state, action);
    case "CREATE_TRUSTLINE_RESET":
      return createTrustlineReset(state, action);
    case "TRANSFER_XRP":
      return transferXrp(state, action);
    case "TRANSFER_XRP_SUCCESS":
      return transferXrpSuccess(state, action);
    case "TRANSFER_XRP_ERROR":
      return transferXrpError(state, action);
    case "TRANSFER_XRP_RESET":
      return transferXrpReset(state, action);
    case "TRANSFER_SOLO":
      return transferSolo(state, action);
    case "TRANSFER_SOLO_SUCCESS":
      return transferSoloSuccess(state, action);
    case "TRANSFER_SOLO_ERROR":
      return transferSoloError(state, action);
    case "TRANSFER_SOLO_RESET":
      return transferSoloReset(state, action);
    case "GET_TRANSACTIONS":
      return getTransactions(state, action);
    case "GET_MORE_TRANSACTIONS":
      return getMoreTransactions(state, action);
    case "GET_MORE_TRANSACTIONS_SUCCESS":
      return getMoreTransactionsSuccess(state, action);
    case "GET_MORE_TRANSACTIONS_ERROR":
      return getMoreTransactionsError(state, action);
    case "CLEAR_TRANSACTIONS":
      return clearTransactions(state, action);
    case "GET_TRANSACTIONS_SUCCESS":
      return getTransactionsSuccess(state, action);
    case "GET_TRANSACTIONS_ERROR":
      return getTransactionsError(state, action);
    case "GET_TRUSTLINES":
      return getTrustlines(state, action);
    case "GET_TRUSTLINES_SUCCESS":
      return getTrustlinesSuccess(state, action);
    case "GET_TRUSTLINES_ERROR":
      return getTrustlinesError(state, action);
    case "GET_TRUSTLINES_RESET":
      return getTrustlinesReset(state);
    case "UPDATE_ORIENTATION_COMPLETE":
      return updateIsOrientationComplete(state, action);
    case "CREATE_PIN":
      return createPinSuccess(state, action);
    case "SETUP_AUTH_SUCCESS":
      return setupAuthentication(state, action);
    case "AUTH_SUCCESS":
      return authSuccess(state, action);
    case "UPDATE_UNLOCK_METHOD":
      return updateUnlockMethod(state, action);
    case "UPDATE_BASE_CURRENCY":
      return updateBaseCurrency(state, action);
    case "ACTIVATE_WALLET":
      return activateWallet(state, action);
    case "SET_WALLET":
      return setWallet(state, action);
    case "RESET_WALLET":
      return resetWallet(state, action);
    case "GET_NET_INFO":
      return getNetInfo(state, action);

    default:
      return state;
  }
};
