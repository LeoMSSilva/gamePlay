import { StyleSheet } from 'react-native';

import { theme } from '~/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 66,
    height: 62,
    borderRadius: 8,
    backgroundColor: theme.colors.discord,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 66,
    height: 62,
    borderRadius: 8,
  },
});
