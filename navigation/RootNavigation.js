import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Notifications } from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem
} from '@expo/ex-navigation';
import { Ionicons } from '@expo/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';

const isAndroid = Platform.OS === 'android';

export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <TabNavigation tabBarHeight={56} initialTab="links">
        <TabNavigationItem
          id="home"
          selectedStyle={styles.selectedTab}
          style={styles.tab}
          renderIcon={isSelected =>
            this._renderIcon(isAndroid ? 'md-home' : 'ios-home', isSelected)}
        >
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>

        <TabNavigationItem
          id="links"
          selectedStyle={styles.selectedTab}
          style={styles.tab}
          renderIcon={isSelected =>
            this._renderIcon(
              isAndroid ? 'md-search' : 'ios-search',
              isSelected
            )}
        >
          <StackNavigation initialRoute="links" />
        </TabNavigationItem>

        <TabNavigationItem
          id="settings"
          selectedStyle={styles.selectedTab}
          style={styles.tab}
          renderIcon={isSelected =>
            this._renderIcon(
              isAndroid ? 'md-person' : 'ios-person',
              isSelected
            )}
        >
          <StackNavigation initialRoute="settings" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <Ionicons
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  };
}

const styles = StyleSheet.create({
  selectedTab: {
    backgroundColor: Colors.tabBarBackground
  },
  tab: {
    backgroundColor: Colors.tabBarBackground
  }
});
