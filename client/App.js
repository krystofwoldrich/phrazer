import React from "react";
import Expo from "expo";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";

import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import createDismissableStackNavigator from "./navigation/helpers/createDissmissableStackNavigator";
import StackWrapper from "./navigation/BasicStackNavigatorWrapper";

import LoginScreen from "./components/LoginScreen";
import NewPhrazeScreen from "./containers/NewPhrazeScreen";
import PhrazeDetailScreen from "./containers/PhrazeDetailScreen";
import HomeScreen from "./containers/HomeScreen";

import { Provider as PaperProvider } from "react-native-paper";
import paperTheme from "./config/phrazer-paper-theme";

Expo.Font.loadAsync({
  Roboto: require("./fonts/Roboto/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./fonts/Roboto/Roboto-Black.ttf")
});

const NewPhrazeStack = createDismissableStackNavigator(
  {
    NewPhrazeScreen,
    PhrazeDetailScreen
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#4AA9A8"
      },
      headerTitleStyle: {
        fontFamily: "Roboto",
        color: "white"
      }
    }
  }
);

const RootStack = createStackNavigator(
  {
    HomeStack: StackWrapper("menu", "search", "Home", { HomeScreen }),
    NewPhrazeStack
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const Switch = createSwitchNavigator({
  LoginScreen,
  RootStack
});

export default () => (
  <Provider store={createStore(reducers)}>
    <PaperProvider theme={paperTheme}>
      <Switch />
    </PaperProvider>
  </Provider>
);
