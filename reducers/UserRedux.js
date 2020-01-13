const defaultState = {
  test: "User",
  testPending: null,
  testSuccess: null,
  testError: null,
};

const testUser = (state, action) => {
  return Object.assign({}, state, {
    testPending: true,
    testSuccess: false,
    testError: false,
  });
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "TEST_USER":
      return testUser(state, action);

    default:
      return state;
  }
};
