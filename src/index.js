import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./Redux/reduxStore";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from "react-dom/client";

let persistor = persistStore(store);

const root = createRoot(document.getElementById("root"));

// Initial render: Render an element to the root.
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
