import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ani from "./components/Ani/Ani";
import Header from "./components/Header/Header";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./components/Home";
import AniInfo from "./components/Ani/AniInfo";
import AppContainer from "./Routes";

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
