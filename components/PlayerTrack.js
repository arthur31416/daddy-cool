// @flow

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import { metrics } from '../themes';
import { secondsToHms } from '../helpers'
import Colors from '../constants/Colors';
import { pure } from 'recompose'

type Props = {
  coverArt: string,
  author: string,
  section: number,
  chapter: string,
  time: number,
  onPress: () => void
}

const PlayerBanner = ({
  coverArt,
  author,
  section,
  chapter,
  time,
  onPress
}: Props) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={{ uri: coverArt }}
          style={styles.image}
        />
      </View>
      
      <View style={styles.containerInfos}>
        <View style={styles.containerChapter}>
          <Text
            numberOfLines={1}
            style={styles.charcoal}
          >
            {section} - {author}
          </Text>
          <Text
            style={styles.chapter}
            numberOfLines={1}
          >
            {chapter}
          </Text>
        </View>

        <View style={styles.containerTime}>
          <Text style={styles.charcoal}>
            {secondsToHms(time)}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: metrics.basePadding * 1.5,
    paddingHorizontal: metrics.basePadding,
    borderBottomWidth: 1,
    borderColor: Colors.border
  },
  containerImage: {
    paddingRight: metrics.basePadding
  },
  image: {
    backgroundColor: Colors.background,
    width: metrics.thumbnailSize,
    height: metrics.thumbnailSize
  },
  containerInfos: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: metrics.tinyPadding
  },
  containerChapter: {
    flexShrink: 1,
    paddingRight: metrics.smallPadding
  },
  chapter: {
    fontSize: 16
  },
  charcoal: {
    color: Colors.charcoal
  }
})

export default pure(PlayerBanner)
