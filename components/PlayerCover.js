// @flow

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform
} from 'react-native';
import ProgressiveImage from 'react-native-progressive-image';
import { Ionicons } from '@expo/vector-icons';
import { pure } from 'recompose';
import { metrics } from '../themes';
import { Components } from 'expo';
const { LinearGradient } = Components;

type Props = {
  author: string,
  title: string,
  onPress: () => void,
  coverArt: ?string,
  coverArtLarge: ?string
};

const MAX_NB_CHARACTERS = Math.floor(metrics.screenWidth / 12);
function splitTitle(title: string): { first: string, second: string } {
  const arrayWords = title.split(' ');

  const [index, _] = arrayWords.reduce(
    (acc, curr) => {
      if (acc[1] + curr.length + 1 <= MAX_NB_CHARACTERS) {
        return [acc[0] + 1, acc[1] + curr.length + 1];
      }

      return [acc[0], Infinity];
    },
    [0, 0]
  );

  const first = arrayWords.slice(0, index).join(' ');
  const second = arrayWords.slice(index).join(' ');

  return {
    first,
    second
  };
}

const iconName = Platform.OS === 'ios' ? 'ios-play-outline' : 'md-play';

const PlayerCover = ({
  author,
  title,
  onPress,
  coverArt,
  coverArtLarge
}: Props) => (
  <View style={styles.container}>
    <ProgressiveImage
      thumbnailSource={{ uri: coverArt }}
      imageSource={{ uri: coverArtLarge || coverArt }}
      style={styles.background}
    />

    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Ionicons name={iconName} size={64} color="#fff" />
      </TouchableOpacity>
    </View>

    <View style={styles.containerInfos}>
      <View style={styles.row}>
        <Text style={styles.author}>{author}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>
          {splitTitle(title).first}
        </Text>

        {!!splitTitle(title).second &&
          <Text style={[styles.title, { marginTop: 0 }]} numberOfLines={1}>
            {splitTitle(title).second}
          </Text>}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: metrics.playerCover.height,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgb(70, 70, 70)'
  },
  LinearGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  button: {
    height: 88,
    width: 88,
    borderRadius: 88 / 2,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(70, 70, 70, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingTop: 5
  },
  containerInfos: {
    padding: metrics.basePadding,
    flexShrink: 1
  },
  author: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: metrics.tinyPadding,
    paddingVertical: 2,
    color: '#ddd',
    fontSize: 14,
    flexShrink: 1
  },
  title: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: metrics.tinyPadding,
    paddingVertical: 2,
    color: '#fff',
    fontSize: 22,
    marginTop: metrics.tinyPadding,
    flexShrink: 1
  },
  row: {
    alignItems: 'flex-start'
  }
});

export default pure(PlayerCover);
