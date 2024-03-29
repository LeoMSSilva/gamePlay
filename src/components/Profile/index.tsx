import React from 'react';
import { Alert, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Avatar } from '~/components/Avatar';
import { useAuth } from '~/hooks/auth';

import { styles } from './styles';

export function Profile() {
  const { user, signOut } = useAuth();
  function handleSignOut() {
    Alert.alert('Logout', 'Deseja sair do GamePlay?', [
      {
        text: 'Sim',
        onPress: () => {
          signOut();
        },
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  }
  return (
    <View style={styles.container}>
      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar} />
      </RectButton>
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.username}>{user.firstName}</Text>
        </View>
        <Text style={styles.message}>Hoje é dia de vitória</Text>
      </View>
    </View>
  );
}
