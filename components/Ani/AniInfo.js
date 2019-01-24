import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { StyleSheet, View, Text } from "react-native";

export default class AniInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const title = this.props.navigation.getParam("title");
    const image = this.props.navigation.getParam("image");
    const description = this.props.navigation.getParam("description");
    console.log(this.props.navigation.state.params);
    return (
      <View>
        <Image src={image} />
        <Text>{title}</Text>
        <Text>{description}</Text>
      </View>
    );
  }
}
