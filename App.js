import React from "react";
import { Provider } from "react-redux";
import LoginScreen from "./components/LoginScreen";
import { createStore } from "redux";
import reducers from "./reducers";

export default () => (
  <Provider store={createStore(reducers)}>
    <LoginScreen />
  </Provider>
);