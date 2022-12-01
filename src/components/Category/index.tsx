import React from 'react';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '~/styles/theme';

import { styles } from './styles';

type Props = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  hasCheckedBox?: boolean;
  checked?: boolean;
};

export function Category({
  title,
  icon: Icon,
  hasCheckedBox = false,
  checked = false,
  ...rest
}: Props) {
  const { secondary40, secondary50, secondary70, secondary85 } = theme.colors;
  const opacity = checked ? 1 : 0.4;
  return (
    <RectButton {...rest}>
      <LinearGradient
        style={styles.container}
        colors={[secondary50, secondary70]}
      >
        <LinearGradient
          style={[styles.content, { opacity: opacity }]}
          colors={[checked ? secondary85 : secondary50, secondary40]}
        >
          {hasCheckedBox && (
            <View style={checked ? styles.checked : styles.check} />
          )}
          <Icon
            width={48}
            height={48}
          />
          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </RectButton>
  );
}
