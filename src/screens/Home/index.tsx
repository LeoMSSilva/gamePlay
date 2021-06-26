import React, { useState, useCallback } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppointmentProps, Appointments } from '../../components/Appointments';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { Load } from '../../components/Load';
import { styles } from './styles';

export function Home() {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);
	const [category, setCategory] = useState('');
	const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

	function handleAppointmentDetails(guildSelected: AppointmentProps) {
		navigation.navigate('AppointmentDetails', { guildSelected });
	}

	function handleAppointmentCreate() {
		navigation.navigate('AppointmentCreate');
	}

	function handleCategorySelect(categoryId: string) {
		categoryId === category ? setCategory('') : setCategory(categoryId);
	}

	async function loadAppointments() {
		const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
		const storage: AppointmentProps[] = response ? JSON.parse(response) : [];
		if (category)
			setAppointments(storage.filter((item) => item.category === category));
		else setAppointments(storage);
		setLoading(false);
	}

	useFocusEffect(
		useCallback(() => {
			loadAppointments();
		}, [category]),
	);

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<Profile />
					<ButtonAdd onPress={handleAppointmentCreate} />
				</View>

				<CategorySelect
					categorySelected={category}
					setCategory={handleCategorySelect}
				/>

				<ListHeader
					title="Partidas agendadas"
					subtitle={`Total ${appointments.length}`}
				/>
				{loading ? (
					<Load />
				) : (
					<FlatList
						data={appointments}
						keyExtractor={(item) => item.id}
						style={styles.matches}
						contentContainerStyle={{ paddingBottom: 69 }}
						ItemSeparatorComponent={() => <ListDivider />}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<Appointments
								data={item}
								onPress={() => handleAppointmentDetails(item)}
							/>
						)}
					/>
				)}
			</SafeAreaView>
		</Background>
	);
}
