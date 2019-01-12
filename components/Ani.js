import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";

const AniItem = props => (
  <View>
    <Image style={{ width: 50, height: 50 }} source={props.image} />
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
          }
          coverImage {
            large
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

      console.log(response.data);

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
      <View>
        {/* {items.map(item => (
          <AniItem key={item.id} image={item.coverImage.large} />
        ))} */}
        <Text>Hello</Text>
      </View>
    );
  }
}

export default Ani;
