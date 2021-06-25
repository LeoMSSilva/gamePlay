import React from 'react';
import { ScrollView } from 'react-native';
import { categories } from '../../utils/categories';
import { Category } from '../Category';
import { styles } from './styles';

type Props = {
	categorySelected: string;
	hasCheckBox?: boolean;

	setCategory: (categoryId: string) => void;
};

export function CategorySelect({
	hasCheckBox = false,
	categorySelected,
	setCategory,
}: Props) {
	return (
		<ScrollView
			horizontal
			style={styles.container}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingRight: 40 }}
		>
			{categories.map((category) => (
				<Category
					hasCheckeBox={hasCheckBox}
					key={category.id}
					title={category.title}
					icon={category.icon}
					checked={category.id === categorySelected}
					onPress={() => setCategory(category.id)}
				/>
			))}
		</ScrollView>
	);
}
