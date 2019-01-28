import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { StyleSheet, View, Text, Image } from "react-native";

const styles = StyleSheet.create({
  aniDetailContainer: {
    display: "flex"
  },
  aniDetailItem: {
    display: "flex",
    padding: 10
  }
});

class AniInfo extends Component {
  // This may not be performant so might need some refactoring
  truncateDesc = desc => {
    return desc
      .split("<br>")
      .sort()
      .pop();
  };

  render() {
    const title = this.props.navigation.getParam("title");
    const image = this.props.navigation.getParam("image");
    const description = this.props.navigation.getParam("description");
    // console.log(this.props.navigation.state.params);
    return (
      <View style={styles.aniDetailContainer}>
        <View>
          <Image source={{ uri: image }} style={{ width: 170, height: 200 }} />
        </View>
        <View>
          <Text>{title}</Text>
        </View>
        <View style={styles.aniDetailItem}>
          <Text>{this.truncateDesc(description)}</Text>
        </View>
      </View>
    );
  }
}

export default AniInfo;
