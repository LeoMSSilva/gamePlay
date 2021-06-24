import React, { useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { CategorySelect } from '../../components/CategorySelect';
import { Appointments } from '../../components/Appointments';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';
import { styles } from './styles';

export function Home() {
	const [category, setCategory] = useState('');
	const appointments = [
		{
			id: '1',
			guild: {
				id: '1',
				name: 'Lendários',
				icon: null,
				owner: true,
			},
			category: '1',
			date: '22/06 às 20:40h',
			description:
				'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
		},
		{
			id: '2',
			guild: {
				id: '1',
				name: 'Lendários',
				icon: null,
				owner: true,
			},
			category: '1',
			date: '22/06 às 20:40h',
			description:
				'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
		},
	];

	function handleCategotySelect(categoryId: string) {
		categoryId === category ? setCategory('') : setCategory(categoryId);
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Profile />
				<ButtonAdd />
			</View>

			<View style={styles.head}>
				<CategorySelect
					categorySelected={category}
					setCategory={handleCategotySelect}
				/>
				<View style={styles.content}>
					<ListHeader title="Partidas agendadas" subtitle="Total 6" />
					<FlatList
						data={appointments}
						keyExtractor={(item) => item.id}
						style={styles.matches}
						ItemSeparatorComponent={() => <ListDivider />}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => <Appointments data={item} />}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
