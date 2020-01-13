export const testTodo = () => {
  return {
    type: "TEST_TODO",
  };
};

export const testTodoSuccess = data => {
  return {
    type: "TEST_TODO_SUCCESS",
    payload: data,
  };
};

export const testTodoReset = () => {
  return {
    type: "TEST_TODO_RESET",
  };
};

export const getBalance = () => {
  return {
    type: "GET_BALANCE",
  };
};

export const getBalanceSuccess = data => {
  return {
    type: "GET_BALANCE_SUCCESS",
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
