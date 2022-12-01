import React from 'react';
import { Alert, Image, SafeAreaView, Text, View } from 'react-native';

import gameImg from '~/assets/illustration.png';
import { Background } from '~/components/Background';
import { ButtonIcon } from '~/components/ButtonIcon';
import { Load } from '~/components/Load';
import { useAuth } from '~/hooks/auth';

import { styles } from './styles';

export function SignIn() {
  const { loading, signIn } = useAuth();

  const handleSignIn = () => {
    try {
      signIn();
    } catch (error) {
      Alert.alert('Erro', `${String(error)}`);
    }
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={gameImg}
          style={styles.image}
          resizeMode={'stretch'}
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se{'\n'}e organize suas{'\n'}jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games{'\n'}favoritos com seus amigos
          </Text>
          {loading ? (
            <Load />
          ) : (
            <ButtonIcon
              title={'Entre com Discord'}
              onPress={handleSignIn}
            />
          )}
        </View>
      </SafeAreaView>
    </Background>
  );
}
