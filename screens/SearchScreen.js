// @flow

import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { ScrollView, StyleSheet, Text } from "react-native";

const BookQuery = gql`
  query BookQuery {
    allBooks(filter: {author: "Emile Ajar"}) {
      id
      title
      author,
      size
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
      title: "Links"
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

        {allBooks.map(book => (
          <Text key={book.id}>
            {book.author} - {book.title} ({book.size}Mb)
          </Text>
        ))}

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

const SearchScreenWithData = graphql(BookQuery)(SearchScreen);

export default SearchScreenWithData;
