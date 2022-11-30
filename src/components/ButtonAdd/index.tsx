import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function ButtonAdd({ ...rest }: RectButtonProps) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <MaterialCommunityIcons
        name="plus"
        size={24}
        color={theme.colors.heading}
      />
    </RectButton>
  );
}
