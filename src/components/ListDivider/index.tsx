import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

type Props = {
  isCentered?: boolean;
};

export function ListDivider({ isCentered }: Props) {
  const mt = isCentered ? 12 : 2;
  const mb = isCentered ? 12 : 31;
  return (
    <View style={[styles.container, { marginTop: mt, marginBottom: mb }]} />
  );
}
