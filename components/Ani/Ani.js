import React, { Component } from "react";
import { StyleSheet, Text, View, Image, FlatList, Button } from "react-native";
import axios from "axios";
import { withNavigation } from "react-navigation";

const styles = StyleSheet.create({
  aniItemTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    paddingLeft: 15
  },
  aniItemContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#61ABFF"
  },
  aniItemImage: {
    borderColor: "#fff",
    borderWidth: 3
  }
});

const AniItem = props => (
  <View style={styles.aniItemContainer}>
    <View style={styles.aniItemImage}>
      <Image
        source={{ uri: `${props.image}` }}
        style={{ height: 150, width: 150 }}
      />
    </View>

    <View style={styles.aniItemTitle}>
      <Text>{props.title}</Text>
    </View>
  </View>
);

class Ani extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const query = ` 
      query {
        Page {
          media(isAdult: false, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
          }
        }
      }
    `;

    const variables = {};

    this.getAnime(query, variables);
  }

  getAnime = async (query, variables) => {
    try {
      const response = await axios.post("https://graphql.anilist.co", {
        query,
        variables
      });

      this.setState({
        isLoaded: true,
        items: response.data.data.Page.media
      });
    } catch (error) {
      this.setState(() => ({ error }));
    }
  };

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return (
        <View>
          <Text>{error.message}</Text>
        </View>
      );
    } else if (!isLoaded) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={{ flexDirection: "row", backgroundColor: "#fff" }}>
        <FlatList
          style={{ flexDirection: "column" }}
          data={items}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            // <AniItem image={item.coverImage.large} title={item.title.romaji} />
            <View style={styles.aniItemContainer}>
              <View style={styles.aniItemImage}>
                <Image
                  source={{ uri: `${item.coverImage.large}` }}
                  style={{ height: 150, width: 150 }}
                />
              </View>

              <View style={styles.aniItemTitle}>
                <Button
                  title={item.title.romaji}
                  onPress={() => this.props.navigation.navigate("Details")}
                />
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

export default Ani;
