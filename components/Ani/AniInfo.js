import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { StyleSheet, View, Text, Image } from "react-native";

const styles = StyleSheet.create({
  aniDetailContainer: {
    display: "flex"
  }
});

class AniInfo extends Component {
  constructor(props) {
    super(props);
  }

  truncateDesc() {
    let desc = this.props.navigation.getParam("description");
    // split the description into an array, either by space or each letter (although each would be very not performant)
    desc = desc.split(" ");
    // iterate through the array and look for the string "<br> <br>"
    console.log(desc);
    // if found
    //(possibly split into a sub array and then search through that and remove each character within the <br> tag)
    // else
    //do nothing
  }

  render() {
    const title = this.props.navigation.getParam("title");
    const image = this.props.navigation.getParam("image");
    const description = this.props.navigation.getParam("description");
    this.truncateDesc();
    // console.log(this.props.navigation.state.params);
    return (
      <View style={styles.aniDetailContainer}>
        <View>
          <Image source={{ uri: image }} style={{ width: 170, height: 200 }} />
        </View>
        <View>
          <Text>{title}</Text>
        </View>
        <View>
          <Text>{description}</Text>
        </View>
      </View>
    );
  }
}

export default AniInfo;
