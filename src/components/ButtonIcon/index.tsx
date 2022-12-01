import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import Discord from '~/assets/discord.svg';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
};

export function ButtonIcon({ title, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      {...rest}
    >
      <View style={styles.iconWrapper}>
        <Discord />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
