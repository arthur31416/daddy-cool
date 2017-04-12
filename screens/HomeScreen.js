import React from 'react';
import { View, Text } from 'react-native';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Home'
    }
  };

  render() {
    return (
      <View>
        <Text>
          Home
        </Text>
      </View>
    );
  }
}
