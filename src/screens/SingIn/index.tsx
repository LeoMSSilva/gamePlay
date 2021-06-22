import React from 'react';
import { Image, SafeAreaView, StatusBar, Text, View } from 'react-native';
import game from '../../assets/illustration.png';
import { ButtonIcon } from '../../components/buttonIcon';
import { styles } from './styles';

export function SingIn() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<Image source={game} style={styles.image} resizeMode={'stretch'} />
			<View style={styles.content}>
				<Text style={styles.title}>
					Organize {'\n'}
					suas jogatinas {'\n'}
					facilmente
				</Text>
				<Text style={styles.subtitle}>
					Crie grupos para jogar seus games {'\n'}
					favoritos com seus amigos
				</Text>
				<ButtonIcon title={'Entre com Discord'} activeOpacity={0.7} />
			</View>
		</SafeAreaView>
	);
}
