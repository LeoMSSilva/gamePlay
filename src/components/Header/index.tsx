import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '~/styles/theme';

import { styles } from './styles';

type Props = {
  title: string;
  action?: ReactNode;
};

export function Header({ title, action }: Props) {
  const navigation = useNavigation();
  const { secondary100, secondary40, heading } = theme.colors;
  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <BorderlessButton onPress={handleGoBack}>
        <Feather
          name="arrow-left"
          size={24}
          color={heading}
        />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {action ? <View>{action}</View> : <View style={styles.actions} />}
    </LinearGradient>
  );
}
