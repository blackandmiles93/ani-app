import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Ani from "./components/Ani/Ani";
import AniInfo from "./components/Ani/AniInfo";

const RootStack = createStackNavigator(
  {
    Home: { screen: Ani },
    Details: { screen: AniInfo }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
