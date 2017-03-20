import React from 'react';
import { View, Text } from 'react-native';

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Profile'
    }
  };

  render() {
    return (
      <View>
        <Text>
          Profile
        </Text>
      </View>
    );
  }
}
