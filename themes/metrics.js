import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const baseGrid = Platform.OS === 'ios' ? 5 : 4;

const metrics = {
  tinyPadding: baseGrid,
  smallPadding: baseGrid * 2,
  basePadding: baseGrid * 3,
  doublePadding: baseGrid * 6,
  triplePadding: baseGrid * 9,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  playerCover: {
    height: 320
  },
  statusBarHeight: 20, // TODO: find proper one according to plaforms
  thumbnailSize: 64
};

export default metrics;
