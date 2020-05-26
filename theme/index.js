import { AsyncStorage } from 'react-native';
import { Appearance } from 'react-native-appearance';


export const DEFAULT_THEME = 'light';
export let currentTheme = undefined;

console.log('THEME EXECUTED');

const palette = {
	orange: '#E67332',
	orangeDark: '#E63527',
	light: '#FFFFFF',
	lightish: '#f2f2f2',
	dark: '#000000',
	darkish: '#333333',
	gray: '#808080',
};

export const colors = {
	primary:  palette.orange,
	primaryDark: palette.orangeDark,
	accent: '',
	light:    palette.light,
	lightish: palette.lightish,
	dark:     palette.dark,
	darkish:  palette.darkish,
	gray:     palette.gray,
};

export const themedColors = {
	light: {
		...colors,
	},
	dark: {
		...colors,
		dark:     palette.light,
		darkish:  palette.lightish,
		light:    palette.dark,
		lightish: palette.darkish,
	},
};

export const loadTheme = () => {
	return AsyncStorage.getItem('theme').then(theme => currentTheme = theme || Appearance.getColorScheme());
}

export const getTheme = () => {
	const theme = currentTheme;
	const colors = themedColors[theme] || themedColors[DEFAULT_THEME];
	const status = theme === 'light' ? 'dark-content' : (theme === 'dark' ? 'light-content' : 'default')
	return {
		colors,
		theme,
		status,
	}
};