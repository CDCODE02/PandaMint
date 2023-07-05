import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleWare from "redux-thunk";
import multi from "redux-multi";
import commonReducer from "./commonReducer";
import signerReducer from "./signerReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "counter",
  storage,
  whitelist: ["common"],
};

let reducers = combineReducers({
  common: commonReducer,
  signer: signerReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleWare, multi)
);

window.store = store;

export default store;
