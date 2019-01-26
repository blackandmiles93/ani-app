import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  ImageBackground,
  Dimensions
} from "react-native";
import axios from "axios";
import { withNavigation } from "react-navigation";

const styles = StyleSheet.create({
  aniItemTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    paddingLeft: 15
  },
  aniImage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: Dimensions.get("window").width,
    height: 170
  },
  aniItemImage: {
    borderColor: "#fff",
    borderWidth: 3
  },
  aniItemContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#000"
  }
});

// const AniItem = props => (
//   <View style={styles.aniItemContainer}>
//     <View style={styles.aniItemImage}>
//       <Image
//         source={{ uri: `${props.image}` }}
//         style={{ height: 150, width: 150 }}
//       />
//     </View>

//     <View style={styles.aniItemTitle}>
//       <Text>{props.title}</Text>
//     </View>
//   </View>
// );

class Ani extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };

    // this.getImageSize = this.getImageSize.bind(this);
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
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            coverImage {
              large
            }
            bannerImage
            description
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

  // getImageSize() {
  //   const imgSize = Image.getSize(
  //     this.state.items.bannerImage,
  //     (width, height) => {
  //       this.setState({
  //         width: width,
  //         height: height
  //       });
  //     }
  //   );
  //   console.log(imgSize);
  //   return imgSize;
  // }

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
              {/* <View style={styles.aniItemImage}> */}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Details", {
                    title: item.title.romaji,
                    description: item.description,
                    image: item.coverImage.large
                  })
                }
              >
                <ImageBackground
                  source={{ uri: `${item.bannerImage}` }}
                  imageStyle={{
                    resizeMode: "cover",
                    opacity: 0.5
                  }}
                  style={styles.aniImage}
                >
                  <Text style={{ fontSize: 20, color: "#fff" }}>
                    {item.title.romaji}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              {/* </View> */}

              {/* <View style={styles.aniItemTitle}>
                <Button
                  title={item.title.romaji}
                  onPress={() =>
                    this.props.navigation.navigate("Details", {
                      title: item.title.romaji,
                      description: item.description,
                      image: item.coverImage.large
                    })
                  }
                />
              </View> */}
            </View>
          )}
        />
      </View>
    );
  }
}

export default Ani;
