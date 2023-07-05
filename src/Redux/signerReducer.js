let initialState = {
  signer: null,
};

let signerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SIGNER":
      return {
        ...state,
        signer: action.payload.signer,
      };
    default: {
      return state;
    }
  }
};

export default signerReducer;
