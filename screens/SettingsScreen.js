// @flow

import React, { Component } from 'react';
import Router from '../navigation/Router'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { withNavigation } from '@expo/ex-navigation';
import Colors from '../constants/Colors';
import { metrics } from '../themes';

type Props = {
  navigator: Object
};

@withNavigation
export default class SettingsScreen extends Component {
  props: Props

  static route = {
    navigationBar: {
      title: 'Profile'
    }
  };

  _goToSearch = () => {
    this.props.navigation.performAction(({ tabs }) => {
      tabs('main').jumpToTab('search');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.blankText}>
          You don't have bookmarked books yet
        </Text>

        <TouchableHighlight onPress={this._goToSearch}>
          <Text style={styles.link}>
            Find books
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blankText: {
    fontSize: 16,
    color: '#666'
  },
  link: {
    fontSize: 18,
    color: Colors.primary,
    marginTop: metrics.smallPadding
  }
})