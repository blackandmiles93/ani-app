import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: "#555"
  },
  navItem: {
    color: "#fff"
  }
});

class Header extends Component {
  render() {
    return (
      <View style={styles.navContainer}>
        <Text style={styles.navItem}>Home</Text>
        <Text style={styles.navItem}>Profile</Text>
        <Text style={styles.navItem}>Settings</Text>
        <Text style={styles.navItem}>Search</Text>
      </View>
    );
  }
}

export default Header;
