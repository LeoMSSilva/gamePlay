import React from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, Text, View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import gameImg from '../../assets/illustration.png';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export function SignIn() {
	const { loading, user, signIn } = useAuth();

	async function handleSignIn() {
		try {
			await signIn();
		} catch (error) {
			Alert.alert('Erro', `${error}`);
		}
	}

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<Image source={gameImg} style={styles.image} resizeMode={'stretch'} />
				<View style={styles.content}>
					<Text style={styles.title}>
						Conecte-se {'\n'}e organize suas {'\n'}
						jogatinas
					</Text>
					<Text style={styles.subtitle}>
						Crie grupos para jogar seus games {'\n'}
						favoritos com seus amigos
					</Text>
					{loading ? (
						<ActivityIndicator color={theme.colors.primary}/>
					) : (
						<ButtonIcon title={'Entre com Discord'} onPress={handleSignIn} />
					)}
				</View>
			</SafeAreaView>
		</Background>
	);
}
