// @flow

import React, { Component } from 'react';
// import { graphql } from "react-apollo";
// import gql from "graphql-tag";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TextInput,
  Linking,
  TouchableOpacity
} from 'react-native';
import { InstantSearch } from 'react-instantsearch/native';
import {
  connectSearchBox,
  connectInfiniteHits
} from 'react-instantsearch/connectors';
import Colors from '../constants/Colors';
import { algoliaKeys } from '../constants/Keys';

// const BookQuery = gql`
//   query BookQuery {
//     allBooks(filter: {author: "William Faulkner"}) {
//       id
//       title
//       author,
//       size
//     }
//   }
// `;

type Props = {
  route: Object
  // data: {
  //   error: any,
  //   loading: boolean,
  //   networkStatus: number,
  //   variables: Object,
  //   allBooks: Array<{
  //     id: string,
  //     title: string,
  //     author: string,
  //     size?: number
  //   }>
  // }
};

class SearchScreen extends Component {
  props: Props;

  static route = {
    navigationBar: {
      title: 'Links'
    }
  };

  render() {
    return (
      <View style={styles.maincontainer}>
        <InstantSearch
          appId={algoliaKeys.appId}
          apiKey={algoliaKeys.apiKey}
          indexName={algoliaKeys.indexName}
        >
          <ConnectedSearchBox />
          <ConnectedHits />
        </InstantSearch>
      </View>
    );
  }
}

type SearchBoxTypes = {
  refine: () => void,
  currentRefinement: string
};

const SearchBox = ({ refine, currentRefinement }: SearchBoxTypes) => (
  <TextInput
    style={styles.textInput}
    onChangeText={refine}
    value={currentRefinement}
  />
);

const ConnectedSearchBox = connectSearchBox(SearchBox);

class Hits extends Component {
  _onEndReached = () => {
    if (this.props.hasMore) {
      this.props.refine();
    }
  };
  _handlePress = url => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  _renderRow = (handlePress, hit) => (
    <View style={styles.item}>
      <Image style={styles.thumbnail} source={{ uri: hit.thumbnail }} />

      <View style={styles.column}>
        <Text numberOfLines={1} ellipsizeMode="middle">
          {hit.author}
        </Text>

        <Text numberOfLines={1}>
          {hit.title}
        </Text>

        <Text>
          {hit.size}Mb
        </Text>

        {!!hit.link &&
          <TouchableOpacity onPress={() => handlePress(hit.link)}>
            <Text style={styles.link}>
              Open
            </Text>
          </TouchableOpacity>}
      </View>
    </View>
  );
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    const hits = this.props.hits.length > 0
      ? <View>
          <ListView
            dataSource={ds.cloneWithRows(this.props.hits)}
            renderRow={this._renderRow.bind(this, this._handlePress)}
            onEndReached={this._onEndReached.bind(this)}
          />
        </View>
      : null;
    return hits;
  }
}

Hits.propTypes = {
  hits: React.PropTypes.array.isRequired,
  refine: React.PropTypes.func.isRequired,
  hasMore: React.PropTypes.bool.isRequired
};

const ConnectedHits = connectInfiniteHits(Hits);

const styles = StyleSheet.create({
  maincontainer: {
    paddingTop: 15,
    paddingHorizontal: 15
  },
  thumbnail: {
    backgroundColor: '#fafafa',
    height: 64,
    width: 64
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: Colors.border
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 15
  },
  link: {
    color: 'blue'
  },
  textInput: {
    height: 42,
    paddingHorizontal: 15,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15
  }
});

// const SearchScreenWithData = graphql(BookQuery)(SearchScreen);

export default SearchScreen;
