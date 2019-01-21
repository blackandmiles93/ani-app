import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { StyleSheet, View, Text } from "react-native";

export default class AniInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>This will be details on the selected Anime</Text>
      </View>
    );
  }
}
