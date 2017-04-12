// @flow

import React, { Component } from 'react';
import Router from '../navigation/Router'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from '@expo/ex-navigation';
import { InstantSearch } from 'react-instantsearch/native';
import {
  connectSearchBox,
  connectInfiniteHits
} from 'react-instantsearch/connectors';
import Colors from '../constants/Colors';
import { algoliaKeys } from '../constants/Keys';

type Props = {
  route: Object
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
  <View style={styles.textInputContainer}>
    <TextInput
      style={styles.textInput}
      onChangeText={refine}
      value={currentRefinement}
      placeholder="Start typing an author or a book"
    />
  </View>
);

const ConnectedSearchBox = connectSearchBox(SearchBox);

// prettier-ignore
@withNavigation
class Hits extends Component {
  _onEndReached = () => {
    if (this.props.hasMore) {
      this.props.refine();
    }
  };

  _handlePress = (id: string, title: string) => {
    // Linking.openURL(url).catch(err => console.error('An error occurred', err));
    this.props.navigator.push(Router.getRoute('book', { id, title }));
    // console.warn('000', this.props.navigator)
  };

  _renderRow = (handlePress, hit) => (
    <TouchableOpacity onPress={() => handlePress(hit.id, hit.title)}>
      <View style={styles.item}>
        <Image style={styles.coverArt} source={{ uri: hit.coverArt }} />

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
        </View>
      </View>
    </TouchableOpacity>
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
            showsVerticalScrollIndicator={false}
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
    backgroundColor: Colors.background,
    marginBottom: 166 // TODO: actually solve the issue
  },
  coverArt: {
    backgroundColor: '#fafafa',
    height: 80,
    width: 80
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderTopWidth: 1,
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
  textInputContainer: {
    flex: 1,
    marginBottom: 60
  },
  textInput: {
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  }
});

export default SearchScreen;
