const defaultState = {
  marketData: null,
  getMarketDataPending: null,
  getMarketDataSuccess: null,
  getMarketDataError: null,
  marketSevens: null,
  getMarketSevensPending: null,
  getMarketSevensSuccess: null,
  getMarketSevensError: null,
  balance: null,
  getBalancePending: null,
  getBalanceSuccess: null,
  getBalanceError: null,
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
  phraseTestValue1: "",
  phraseTestValue2: "",
  phraseTestValue3: "",
  newWallet: null,
  wallets: [],
  nickname: "",
};

const getMarketData = (state, action) => {
  return Object.assign({}, state, {
    getMarketDataPending: true,
    getMarketDataSuccess: false,
    getMarketDataError: false
  });
};

const getMarketDataSuccess = (state, action) => {
  return Object.assign({}, state, {
    marketData: action.payload,
    getMarketDataPending: false,
    getMarketDataSuccess: true,
    getMarketDataError: false
  });
};

const getMarketDataError = (state, action) => {
  return Object.assign({}, state, {
    marketData: action.payload,
    getMarketDataPending: false,
    getMarketDataSuccess: false,
    getMarketDataError: true
  });
};

const getMarketSevens = (state, action) => {
  return Object.assign({}, state, {
    getMarketSevensPending: true,
    getMarketSevensSuccess: false,
    getMarketSevensError: false
  });
};

const getMarketSevensSuccess = (state, action) => {
  return Object.assign({}, state, {
    marketSevens: action.payload,
    getMarketSevensPending: false,
    getMarketSevensSuccess: true,
    getMarketSevensError: false
  });
};

const getMarketSevensError = (state, action) => {
  return Object.assign({}, state, {
    marketData: action.payload,
    getMarketSevensPending: false,
    getMarketSevensSuccess: false,
    getMarketSevensError: true
  });
};

const testTodoReset = (state, action) => {
  return Object.assign({}, state, {
    test: "Default",
    testPending: null,
    testSuccess: null,
    testError: null
  });
};

const updatePhraseTestValue1 = (state, action) => {
  return Object.assign({}, state, {
    phraseTestValue1: action.value,
  });
}

const updatePhraseTestValue2 = (state, action) => {
  return Object.assign({}, state, {
    phraseTestValue2: action.value,
  });
}

const updatePhraseTestValue3 = (state, action) => {
  return Object.assign({}, state, {
    phraseTestValue3: action.value,
  });
}

const getBalance = (state, action) => {
  return Object.assign({}, state, {
    getBalancePending: true,
    getBalanceSuccess: false,
    getBalanceError: false
  });
};

const getBalanceSuccess = (state, action) => {
  return Object.assign({}, state, {
    balance: action.payload,
    getBalancePending: false,
    getBalanceSuccess: true,
    getBalanceError: false
  });
};

const getBalanceError = (state, action) => {
  return Object.assign({}, state, {
    errors: action.payload,
    getBalancePending: false,
    getBalanceSuccess: false,
    getBalanceError: true
  });
};

const postPaymentTransaction = (state, action) => {
  return Object.assign({}, state, {
    postPaymentTransactionPending: true,
    postPaymentTransactionSuccess: false,
    postPaymentTransactionError: false
  });
};

const postPaymentTransactionSuccess = (state, action) => {
  return Object.assign({}, state, {
    postPaymentTransactionPending: false,
    postPaymentTransactionSuccess: true,
    postPaymentTransactionError: false,
    resultPaymentTransaction: action.payload
  });
};

const postPaymentTransactionError = (state, action) => {
  return Object.assign({}, state, {
    postPaymentTransactionPending: false,
    postPaymentTransactionSuccess: false,
    postPaymentTransactionError: true,
    errors: action.payload
  });
};

const getListenToTransaction = (state, action) => {
  return Object.assign({}, state, {
    getListenToTransactionPending: true,
    getListenToTransactionSuccess: false,
    getListenToTransactionError: false
  });
};

const getListenToTransactionSuccess = (state, action) => {
  return Object.assign({}, state, {
    getListenToTransactionPending: false,
    getListenToTransactionSuccess: true,
    getListenToTransactionError: false,
    transactions: action.payload
  });
};

const getListenToTransactionError = (state, action) => {
  return Object.assign({}, state, {
    getListenToTransactionPending: false,
    getListenToTransactionSuccess: false,
    getListenToTransactionError: true,
    errors: action.payload
  });
};

const connectToRippleApi = (state, action) => {
  return Object.assign({}, state, {
    connectToRippleApiPending: true,
    connectToRippleApiSuccess: false,
    connectToRippleApiError: false
  });
};

const connectToRippleApiSuccess = (state, action) => {
  return Object.assign({}, state, {
    connectToRippleApiPending: false,
    connectToRippleApiSuccess: true,
    connectToRippleApiError: false
  });
};

const connectToRippleApiError = (state, action) => {
  return Object.assign({}, state, {
    connectToRippleApiPending: false,
    connectToRippleApiSuccess: false,
    connectToRippleApiError: true
  });
};

const generateNewWallet = (state, action) => {
  return Object.assign({}, state, {
    newWallet: action.newWallet,
  });
}

const addNewWallet = (state, action) => {
  const { wallets } = state;
  const {
    nickname,
    newWallet,
    walletAddress,
    rippleClassicAddress,
  } = action;
  const wallet = {
    nickname,
    details: newWallet,
    balance: {
      xrp: 0,
      solo: 0,
      tokenizedAssets: 0,
    },
    walletAddress,
    rippleClassicAddress,
    transactions: [],
  };
  return Object.assign({}, state, {
    wallets: [ ...wallets, wallet ],
  });
}

const saveNickname = (state, action) => {
  return Object.assign({}, state, {
    nickname: action.nickname,
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
    case "GET_MARKET_SEVENS":
      return getMarketSevens(state, action);
    case "GET_MARKET_SEVENS_SUCCESS":
      return getMarketSevensSuccess(state, action);
    case "GET_MARKET_SEVENS_ERROR":
      return getMarketSevensError(state, action);

    case "TEST_TODO_RESET":
      return testTodoReset(state, action);
    
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
     
    default:
      return state;
  }
};
