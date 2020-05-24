import { Appearance } from "react-native-appearance";

const palette = {
	orange: '#E67332',
	orangeDark: '#E63527',
	light: '#FFFFFF',
	lightish: '#f2f2f2',
	dark: '#000000',
	darkish: '#333333',
};

export const colors = {
	primary: palette.orange,
	primaryDark: palette.orangeDark,
	accent: '',
	light: palette.light,
	dark: palette.dark,
};

export const themedColors = {
	light: {
		...colors,
	},
	dark: {
		...colors,
		dark: palette.light,
		darkish: palette.lightish,
		light: palette.dark,
		lightish: palette.darkish,
	},
};

export const getTheme = () => {
	const theme = Appearance.getColorScheme();
	// const theme = 'light'; // TODO: support dark theme

	const colors = themedColors[theme] || themedColors['light'];
	return {
		colors,
		theme,
	}
};