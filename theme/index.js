
const palette = {
	orange: '#E67332',
	light: '#FFFFFF',
	dark: '#000000',
};

export const colors = {
	primary: palette.orange,
	accent: '',
	textDark: palette.dark,
	textLight: palette.light,
};

export const themedColors = {
	default: {
		...colors,
	},
	light: {
		...colors,
	},
	dark: {
		...colors,
		textDark: palette.light,
		textLight: palette.dark,
	},
}