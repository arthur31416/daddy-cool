import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {
  ScrollView,
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import PlayCover from "../components/PlayerCover";
import PlayerBanner from "../components/PlayerBanner";
import PlayerTrack from "../components/PlayerTrack";
import { metrics } from '../themes';
import Colors from '../constants/Colors';
import { path } from "ramda";

const BookQuery = gql`
  query BookQuery($id: ID!) {
    Book(id: $id) {
      id
      reader
      time
      size
      tracks
    }
  }
`;

type Props = {
  data: {
    error: any,
    loading: boolean,
    networkStatus: number,
    variables: Object,
    books: Array<{
      id: string,
      size?: number,
      reader: {
        id: ?number,
        name: ?string
      },
      tracks: Array<Object>
    }>
  },
  route: {
    params: {
      coverArt: string,
      coverArtLarge: string,
      title: string,
      author: string
    }
  }
};

const MAX_NB_CHARACTERS = 24;
function shortenTitle(title: string): string {
  const nbCharacters = title.length;

  if (nbCharacters <= MAX_NB_CHARACTERS + 1) {
    return title;
  }

  return `${title.slice(0, MAX_NB_CHARACTERS)}...`;
}

class BookScreen extends Component {
  props: Props;
  static route = {
    navigationBar: {
      title(params) {
        return `${shortenTitle(params.title)}`;
      },
      backgroundColor: '#fff',
      tintColor: Colors.charcoal
    }
  };

  _onPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error("An error occurred", err));
  };

  _onPressCoverPlay = () => {
    const urlHd = path(["data", "Book", "tracks", 0, "url_mp3_hd"], this.props);
    const urlLd = path(["data", "Book", "tracks", 0, "url_mp3_ld"], this.props);

    const url = urlHd || urlLd; // TODO: be smarter and pick the right track at the right time
    if (url) {
      this._onPress(url);
    }
  };
  render() {
    const { error, loading, Book } = this.props.data;
    const { author, title, coverArt, coverArtLarge } = this.props.route.params;

    if (error) {
      return (
        <Text>
          Unexpected error
        </Text>
      );
    }

    const { id, reader, time, size, tracks } = loading ? {} : Book;

    return (
      <ScrollView>
        <PlayCover
          author={author}
          title={title}
          onPress={this._onPressCoverPlay}
          coverArt={coverArt}
          coverArtLarge={coverArtLarge}
        />

        {!loading &&
          <PlayerBanner
            nbTracks={tracks.length}
            time={time}
            onPress={() => {
              console.log("pressed playerBanner");
            }}
          />}

        <View style={styles.containerTracks}>
          {!loading &&
            tracks.map((track, index) => (
              <PlayerTrack
                key={index}
                coverArt={coverArt}
                author={author}
                section={track.section}
                chapter={track.chapter}
                time={track.time}
                onPress={() => this._onPress(track["url_mp3_ld"])}
              />
            ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerTracks: {
    backgroundColor: Colors.background,
    paddingTop: metrics.smallPadding
  }
})

const BookScreenWithData = graphql(BookQuery, {
  options: ({ route }) => ({
    variables: { id: route.params.id }
  })
})(BookScreen);

export default BookScreenWithData;
