// @flow

import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';

const BookQuery = gql`
  query BookQuery {
    allBooks(filter: {author: "Robert GRAVES"}) {
      id
      title
      author,
      size,
      subtitle
    }
  }
`;

type Props = {
  route: Object,
  data: {
    error: any,
    loading: boolean,
    networkStatus: number,
    variables: Object,
    allBooks: Array<{
      id: string,
      title: string,
      author: string,
      size?: number
    }>
  }
};

class SearchScreen extends Component {
  props: Props;

  static route = {
    navigationBar: {
      title: 'Links'
    }
  };

  render() {
    const {
      error,
      loading,
      allBooks
    } = this.props.data;

    if (error) {
      return (
        <Text>
          Unexpected error
        </Text>
      );
    }

    if (loading || !allBooks) {
      return (
        <Text>
          Loading...
        </Text>
      );
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}
      >
        <Text style={styles.title}>
          Search for: Robert GRAVES
        </Text>

        {allBooks.length === 0 &&
          <Text>
            No result!
          </Text>}

        {allBooks.map(book => (
          <View key={book.id} style={styles.item}>
            <Text>
              {book.title} ({book.size}Mb)
            </Text>

            {!!book.subtitle &&
              <Text>
                {book.subtitle}
              </Text>}
          </View>
        ))}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  },
  title: {
    padding: 15,
    fontWeight: '600'
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  }
});

const SearchScreenWithData = graphql(BookQuery)(SearchScreen);

export default SearchScreenWithData;
