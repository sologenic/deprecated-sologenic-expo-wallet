const defaultState = {
  test: "Default",
  testPending: null,
  testSuccess: null,
  testError: null,
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
  isOrientationComplete: null,
  isPinCreated: null,
  pin: null,
};

const testTodo = (state, action) => {
  return Object.assign({}, state, {
    testPending: true,
    testSuccess: false,
    testError: false,
  });
};

const testTodoSuccess = (state, action) => {
  return Object.assign({}, state, {
    test: action.payload,
    testPending: false,
    testSuccess: true,
    testError: false,
  });
};

const testTodoReset = (state, action) => {
  return Object.assign({}, state, {
    test: "Default",
    testPending: null,
    testSuccess: null,
    testError: null,
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
  return Object.assign({}, state, {
    balance: action.payload,
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
  console.log("here");
  return Object.assign({}, state, {
    isPinCreated: true,
    pin: action.payload,
  });
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "TEST_TODO":
      return testTodo(state, action);
    case "TEST_TODO_SUCCESS":
      return testTodoSuccess(state, action);
    case "TEST_TODO_RESET":
      return testTodoReset(state, action);
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
    case "UPDATE_ORIENTATION_COMPLETE":
      return updateIsOrientationComplete(state, action);
    case "CREATE_PIN":
      return createPinSuccess(state, action);

    default:
      return state;
  }
};
