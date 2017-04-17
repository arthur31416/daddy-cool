// @flow

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { metrics } from '../themes';
import { secondsToHms } from '../helpers'
import Colors from '../constants/Colors';
import { pure } from 'recompose'

type Props = {
  nbTracks: number,
  time: number,
  onPress: () => void
}

const PlayerBanner = ({
  nbTracks,
  time,
  onPress
}: Props) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Text style={styles.text}>{nbTracks} titles, </Text>
      <Text style={styles.text}>{secondsToHms(time)}</Text>
    </View>

    <View style={styles.row}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.text}>Add to my books</Text>
      </TouchableOpacity>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: metrics.basePadding
  },
  row: {
    flexDirection: 'row'
  },
  button: {
    padding: metrics.tinyPadding * 1.5,
    borderWidth: 1,
    borderColor: Colors.charcoal
  },
  text: {
    color: Colors.charcoal,
    fontSize: 14
  }
})

export default pure(PlayerBanner)
