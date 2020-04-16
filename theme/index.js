import { Appearance } from "react-native-appearance";

const palette = {
	orange: '#E67332',
	orangeDark: '#E63527',
	light: '#FFFFFF',
	dark: '#000000',
};

export const colors = {
	primary: palette.orange,
	primaryDark: palette.orangeDark,
	accent: '',
	textDark: palette.dark,
	textLight: palette.light,
};

export const themedColors = {
	light: {
		...colors,
	},
	dark: {
		...colors,
		textDark: palette.light,
		textLight: palette.dark,
	},
};

export const getTheme = () => {
	const theme = Appearance.getColorScheme();
	const colors = themedColors[theme] || themedColors['light'];
	return {
		colors,
		theme,
	}
};