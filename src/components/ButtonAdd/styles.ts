import { StyleSheet } from 'react-native';

import { theme } from '~/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },
});
