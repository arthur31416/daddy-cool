// @flow

import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ScrollView, StyleSheet, Text } from 'react-native';

const BookQuery = gql`
  query BookQuery {
    allBooks(filter: {temporary: false}) {
      id

    }
  }
`;

const updateBook = gql`
  mutation updateBook($id: ID!, $genre: [String!], $temporary: Boolean) {
    updateBook(id: $id, genre: $genre, temporary: $temporary) {
      id
      genre
      temporary
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

  // componentWillReceiveProps (nextProps) {
  //   if (!this.props.data.allBooks && nextProps.data.allBooks) {
  //     console.warn('BBB', nextProps.data.allBooks.length)
  //     nextProps.data.allBooks.forEach(book => {
  //       nextProps.mutate({ variables: { id: book.id, genre: ["Da"], temporary: true } });
  //     })
  //   }
  // }

  render() {
    // console.warn('°°°°', this.props.mutate)
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

        <Text>
          {allBooks.length}
        </Text>

      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});
const BooksWithMutation = graphql(updateBook)(SearchScreen);
const SearchScreenWithData = graphql(BookQuery)(BooksWithMutation);
export default SearchScreenWithData;
