import { StyleSheet } from 'react-native';

import { theme } from '~/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.line,
    borderEndWidth: 2,
  },
  icon: {
    width: 24,
    height: 18,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: theme.fonts.text500,
    color: theme.colors.heading,
  },
});
