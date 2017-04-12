import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  ScrollView,
  View,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';

const BookQuery = gql`
  query BookQuery($id: ID!) {
    Book(id: $id) {
      id,
      title,
      reader,
      time,
      size,
      author,
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
      title: string,
      author: string,
      size?: number,
      reader: {
        id: ?number,
        name: ?string
      },
      tracks: Array<Object>
    }>
  }
};

class BookScreen extends Component {
  props: Props;
  static route = {
    navigationBar: {
      title(params) {
        return `${params.title}`;
      }
    }
  };

  _onPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };
  render() {
    const {
      error,
      loading,
      Book
    } = this.props.data;

    if (error) {
      return (
        <Text>
          Unexpected error
        </Text>
      );
    }
    if (loading || !Book) {
      return (
        <Text>
          Loading...
        </Text>
      );
    }

    const {
      id,
      title,
      reader,
      time,
      size,
      author,
      tracks
    } = Book;

    return (
      <ScrollView>
        <View
          style={{
            padding: 20
          }}
        >
          <Text>
            title: {title}
          </Text>

          <Text>
            author: {author}
          </Text>

          <Text>
            time: {time}
          </Text>

          <Text>
            size: {size}
          </Text>
        </View>

        {tracks.map((track, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#fdfdfd',
              padding: 20,
              marginTop: 15,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: '#eee'
            }}
          >
            <Text>
              Track number: {track.section}
            </Text>

            <Text>
              Chapter: {track.chapter}
            </Text>

            <Text>
              Time: {track.time}
            </Text>

            <View>
              <Text>Url low definition</Text>

              <TouchableOpacity
                onPress={() => this._onPress(track['url_mp3_ld'])}
              >
                <Text style={{ color: 'blue' }}>
                  {track['url_mp3_ld']}
                </Text>
              </TouchableOpacity>
            </View>

            {track['url_mp3_ld'] !== track['url_mp3_hd'] &&
              <View>
                <Text>Url high definition</Text>

                <TouchableOpacity
                  onPress={() => this._onPress(track['url_mp3_hd'])}
                >
                  <Text style={{ color: 'blue' }}>
                    {track['url_mp3_hd']}
                  </Text>
                </TouchableOpacity>
              </View>}
          </View>
        ))}
      </ScrollView>
    );
  }
}

// const BookScreenWithData = graphql(BookQuery)(BookScreen);

const BookScreenWithData = graphql(BookQuery, {
  options: ({ route }) => ({
    variables: { id: route.params.id }
  })
})(BookScreen);

export default BookScreenWithData;
