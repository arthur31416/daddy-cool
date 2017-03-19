import Expo from "expo";
import React from "react";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { NavigationProvider, StackNavigation } from "@expo/ex-navigation";
import { Ionicons } from "@expo/vector-icons";

import Router from "./navigation/Router";
import cacheAssetsAsync from "./utilities/cacheAssetsAsync";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "https://api.graph.cool/simple/v1/cj070mvgb7pmu01446bg5h2j2"
  })
});

class AppContainer extends React.Component {
  state = {
    appIsReady: false
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [require("./assets/images/expo-wordmark.png")],
        fonts: [
          Ionicons.font,
          { "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf") }
        ]
      });
    } catch (e) {
      console.warn(
        "There was an error caching assets (see: main.js), perhaps due to a " +
          "network timeout, so we skipped caching. Reload the app to try again."
      );
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <ApolloProvider client={client}>
          <View style={styles.container}>
            <NavigationProvider router={Router}>
              <StackNavigation
                id="root"
                initialRoute={Router.getRoute("rootNavigation")}
              />
            </NavigationProvider>

            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            {Platform.OS === "android" &&
              <View style={styles.statusBarUnderlay} />}
          </View>
        </ApolloProvider>
      );
    } else {
      return <Expo.AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});

Expo.registerRootComponent(AppContainer);
