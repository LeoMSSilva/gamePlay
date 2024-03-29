import { StyleSheet } from 'react-native';

import { theme } from '~/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 8,
  },
  content: {
    width: 100,
    height: 116,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  checked: {
    width: 12,
    height: 12,
    position: 'absolute',
    top: 7,
    right: 7,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
  },
  check: {
    width: 10,
    height: 10,
    position: 'absolute',
    top: 7,
    right: 7,
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: theme.colors.secondary100,
    borderColor: theme.colors.secondary50,
  },
  title: {
    fontFamily: theme.fonts.title500,
    color: theme.colors.heading,
    fontSize: 15,
    marginTop: 15,
  },
});
