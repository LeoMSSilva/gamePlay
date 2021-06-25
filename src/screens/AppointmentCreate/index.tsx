import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';

export function AppointmentCreate() {
	const [category, setCategory] = useState('');
	const [openGuildsModal, setOpenGuildsModal] = useState(false);
	const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

	function handleOpenGuildsModal() {
		setOpenGuildsModal(true);
	}

	function handleGuildSelect(guildSelected: GuildProps) {
		setGuild(guildSelected);
		setOpenGuildsModal(false);
	}
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<ScrollView>
				<Background>
					<Header title="Agendar Partida" />

					<Text
						style={[
							styles.label,
							{ margin: 36, marginLeft: 24, marginBottom: 18 },
						]}
					>
						Categoria
					</Text>

					<CategorySelect
						hasCheckBox
						categorySelected={category}
						setCategory={setCategory}
					/>

					<View style={styles.form}>
						<RectButton onPress={handleOpenGuildsModal}>
							<View style={styles.select}>
								{guild.icon ? <GuildIcon /> : <View style={styles.image} />}
								<View style={styles.selectBody}>
									<Text style={styles.label}>
										{guild.name ? guild.name : 'Selecione um servidor'}
									</Text>
								</View>
								<Feather
									name="chevron-right"
									color={theme.colors.heading}
									size={18}
								/>
							</View>
						</RectButton>

						<View style={styles.field}>
							<View>
								<Text style={styles.label}>Dia e Mês</Text>
								<View style={styles.column}>
									<SmallInput maxLength={2} />
									<Text style={styles.divider}>/</Text>
									<SmallInput maxLength={2} />
								</View>
							</View>

							<View>
								<Text style={styles.label}>Hora e Minuto</Text>
								<View style={styles.column}>
									<SmallInput maxLength={2} />
									<Text style={styles.divider}>:</Text>
									<SmallInput maxLength={2} />
								</View>
							</View>
						</View>

						<View style={[styles.field, { marginBottom: 12 }]}>
							<Text style={styles.label}>Descrição</Text>
							<Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
						</View>
						<TextArea
							multiline
							maxLength={100}
							numberOfLines={5}
							autoCorrect={false}
						/>

						<View style={styles.footer}>
							<Button title="Agendar" />
						</View>
					</View>
				</Background>
			</ScrollView>

			<ModalView visible={openGuildsModal}>
				<Guilds handleGuildSelect={handleGuildSelect} />
			</ModalView>
		</KeyboardAvoidingView>
	);
}