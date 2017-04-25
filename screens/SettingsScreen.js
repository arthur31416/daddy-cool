// @flow

import React, { Component } from "react";
import Router from "../navigation/Router";
import { ReactNativeAudioStreaming, Player } from "react-native-audio-streaming";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { withNavigation } from "@expo/ex-navigation";
import Colors from "../constants/Colors";
import { metrics } from "../themes";

type Props = {
  navigator: Object
};

const url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3";

@withNavigation
export default class SettingsScreen extends Component {
  props: Props;

  static route = {
    navigationBar: {
      title: "Profile"
    }
  };

  componentDidMount () {
    ReactNativeAudioStreaming.play(url, {
      showIniOSMediaCenter: true,
      showInAndroidNotifications: true
    });
  }

  _goToSearch = () => {
    this.props.navigation.performAction(({ tabs }) => {
      tabs("main").jumpToTab("search");
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {/*<Text style={styles.blankText}>
          You don't have bookmarked books yet
        </Text>

        <TouchableHighlight onPress={this._goToSearch}>
          <Text style={styles.link}>
            Find books
          </Text>
        </TouchableHighlight>*/}

        <Player url={url} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  blankText: {
    fontSize: 16,
    color: "#666"
  },
  link: {
    fontSize: 18,
    color: Colors.primary,
    marginTop: metrics.smallPadding
  }
});
