import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ani from "./components/Ani";
import Header from "./components/Header/Header";

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Header />
        <Ani />
      </View>
    );
  }
}
