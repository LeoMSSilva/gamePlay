import { StyleSheet } from 'react-native';

import { theme } from '~/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 95,
    borderRadius: 8,
    fontFamily: theme.fonts.text400,
    backgroundColor: theme.colors.secondary40,
    color: theme.colors.heading,
    fontSize: 13,
    marginRight: 4,
    textAlignVertical: 'top',
    paddingTop: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.colors.secondary50,
  },
});
