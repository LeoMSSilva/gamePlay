import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import game from '../../assets/illustration.png';
import { ButtonIcon } from '../../components/ButtonIcon';
import { styles } from './styles';

export function SingIn() {
	const navigation = useNavigation();

	function handleSingIn() {
		navigation.navigate('Home');
	}
	
	return (
		<SafeAreaView style={styles.container}>
			<Image source={game} style={styles.image} resizeMode={'stretch'} />
			<View style={styles.content}>
				<Text style={styles.title}>
					Conecte-se {'\n'}e organize suas {'\n'}
					jogatinas
				</Text>
				<Text style={styles.subtitle}>
					Crie grupos para jogar seus games {'\n'}
					favoritos com seus amigos
				</Text>
				<ButtonIcon
					title={'Entre com Discord'}
					onPress={handleSingIn}
				/>
			</View>
		</SafeAreaView>
	);
}
