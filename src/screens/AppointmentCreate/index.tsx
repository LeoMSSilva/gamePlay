import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Background } from '../../components/Background';
import { Button } from '../../components/Button';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildProps } from '../../components/Guild';
import { GuildIcon } from '../../components/GuildIcon';
import { Header } from '../../components/Header';
import { ModalView } from '../../components/ModalView';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { theme } from '../../global/styles/theme';
import { Guilds } from '../Guilds';
import { styles } from './styles';

export function AppointmentCreate() {
	const [category, setCategory] = useState('');
	const [openGuildsModal, setOpenGuildsModal] = useState(false);
	const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

	function handleCloseGuilds() {
		setOpenGuildsModal(false);
	}

	function handleOpenGuildsModal() {
		setOpenGuildsModal(true);
	}

	function handleCategorySelect(categoryId: string) {
		setCategory(categoryId);
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
						setCategory={handleCategorySelect}
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

			<ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
				<Guilds handleGuildSelect={handleGuildSelect} />
			</ModalView>
		</KeyboardAvoidingView>
	);
}
