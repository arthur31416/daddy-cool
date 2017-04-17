import { createRouter } from '@expo/ex-navigation';

import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookScreen from '../screens/BookScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  search: () => SearchScreen,
  settings: () => SettingsScreen,
  book: () => BookScreen,
  rootNavigation: () => RootNavigation
}));
