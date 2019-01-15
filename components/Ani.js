import React, { Component } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import axios from "axios";

const styles = StyleSheet.create({
  ani: {
    flexDirection: "row",
    justifyContent: "center"
  },
  aniItem: {
    flexDirection: "column",
    justifyContent: "center"
  }
});

const AniItem = props => (
  <View style={styles.aniItem}>
    <Text>{props.title}</Text>
    <Image
      source={{ uri: `${props.image}` }}
      style={{ height: 50, width: 50 }}
    />
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
      <View style={{ flexDirection: "row" }}>
        <FlatList
          style={{ flexDirection: "column" }}
          data={items}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <AniItem
              style={{}}
              image={item.coverImage.large}
              title={item.title.romaji}
            />
          )}
        />
      </View>
    );
  }
}

export default Ani;
