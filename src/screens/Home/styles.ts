import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		width: '100%',
		paddingHorizontal: 24,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: getStatusBarHeight() + 26,
		marginBottom: 42,
	},
	head: {},
	image: {
		width: '100%',
		height: 360,
	},
	content: {
		marginTop: 42,
	},
	title: {
		color: theme.colors.heading,
		textAlign: 'center',
		fontSize: 40,
		fontFamily: theme.fonts.title700,
		marginBottom: 16,
		lineHeight: 40,
	},
	subtitle: {
		color: theme.colors.heading,
		textAlign: 'center',
		fontSize: 15,
		fontFamily: theme.fonts.title500,
		marginBottom: 64,
		lineHeight: 25,
	},
	matches:{
		marginTop: 24,
		marginLeft: 24
	}
});
