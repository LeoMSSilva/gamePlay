import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { theme } from '~/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 104,
    marginTop: getStatusBarHeight(),
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
  },
  actions: {
    width: 24,
  },
});
