import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { MonoText } from '../components/StyledText';

// const rawBooks1 = require('../tracks_1.json');

const createBookMutation = gql`
  mutation createBook(
    $author: String!
    $authorId: Int
    $title: String!
    $size: Float
    $bookCoordinator: Json
    $metaCoordinator: Json
    $proofListener: Json
    $reader: Json
    $catalogDate: DateTime
    $yearBirth: Int
    $yearDeath: Int
    $time: Int
    $coverArt: String
    $coverArtLarge: String
    $description: String
    $language: String
    $tracks: [Json!]!
  ) {
    createBook(
      author: $author
      authorId: $authorId
      title: $title
      size: $size
      bookCoordinator: $bookCoordinator
      metaCoordinator: $metaCoordinator
      proofListener: $proofListener
      reader: $reader
      catalogDate: $catalogDate
      yearBirth: $yearBirth
      yearDeath: $yearDeath
      time: $time
      coverArt: $coverArt
      coverArtLarge: $coverArtLarge
      description: $description
      language: $language
      tracks: $tracks
    ) {
      author
      authorId
      title
      size
      bookCoordinator
      metaCoordinator
      proofListener
      reader
      catalogDate
      yearBirth
      yearDeath
      time
      coverArt
      coverArtLarge
      description
      language
      tracks
    }
  }
`;

class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false
    }
  };

  // componentDidMount() {
  //   false &&
  //     rawBooks1 &&
  //     rawBooks1.forEach(book => {
  //       this._handleSave(
  //         book.author,
  //         book.authorId,
  //         book.title,
  //         book.size,
  //         book.bookCoordinator,
  //         book.metaCoordinator,
  //         book.proofListener,
  //         book.reader,
  //         book.catalogDate,
  //         book.yearBirth,
  //         book.yearDeath,
  //         book.time,
  //         book.coverArt,
  //         book.coverArtLarge,
  //         book.description,
  //         book.language,
  //         book.tracks
  //       );
  //     });
  // }

  _handleSave = async (
    author,
    authorId,
    title,
    size,
    bookCoordinator,
    metaCoordinator,
    proofListener,
    reader,
    catalogDate,
    yearBirth,
    yearDeath,
    time,
    coverArt,
    coverArtLarge,
    description,
    language,
    tracks
  ) => {
    await this.props.mutate({
      variables: {
        author,
        authorId,
        title,
        size,
        bookCoordinator,
        metaCoordinator,
        proofListener,
        reader,
        catalogDate: new Date(catalogDate),
        yearBirth,
        yearDeath,
        time,
        coverArt,
        coverArtLarge,
        description,
        language,
        tracks
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >

          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/expo-wordmark.png')}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>
              Get started by opening
            </Text>

            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            >
              <MonoText style={styles.codeHighlightText}>
                screens/HomeScreen.js
              </MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity
              onPress={this._handleHelpPress}
              style={styles.helpLink}
            >
              <Text style={styles.helpLinkText}>
                Help, it didn’t automatically reload!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <MonoText style={styles.codeHighlightText}>
              navigation/RootNavigation.js
            </MonoText>
          </View>
        </View>
      </View>
    );
  }
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );
      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will run slightly slower but
          you have access to useful development tools. {learnMoreButton}.
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
  _handleLearnMorePress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };
  _handleHelpPress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}
export default graphql(createBookMutation)(HomeScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 80
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 140,
    height: 38,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          height: -3
        },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
});
