import { useColorScheme } from 'react-native-appearance'
import { themedColors } from '.'

export const useTheme = () => {
	const theme = useColorScheme();
	const colors = theme ? themedColors[theme] : themedColors.default;
	return {
		colors,
		theme,
	}
};