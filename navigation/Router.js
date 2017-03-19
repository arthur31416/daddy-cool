import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => SearchScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation
}));
