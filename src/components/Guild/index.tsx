import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import { GuildIcon } from '~/components/GuildIcon';
import { theme } from '~/styles/theme';

import { styles } from './styles';

export type GuildProps = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
};

type Props = TouchableOpacityProps & {
  data: GuildProps;
};

export function Guild({ data, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      {...rest}
    >
      <GuildIcon
        guildId={data.id}
        iconId={data.icon}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{data.name}</Text>

        <Text style={styles.type}>
          {data.owner ? 'Administrador' : 'Convidado'}
        </Text>
      </View>

      <Feather
        name="chevron-right"
        color={theme.colors.heading}
        size={24}
      />
    </TouchableOpacity>
  );
}
