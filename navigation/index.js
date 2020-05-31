import {
	AsyncStorage,
	Platform,
} from 'react-native';


const IS_ANDROID = Platform.OS === 'android';
export let currentNavigation = undefined;


export const getDefaultNavigation = () => {
	return IS_ANDROID ? 'drawer' : 'tab';
}

export const loadNavigation = () => {
	return AsyncStorage.getItem('navigation').then(theme => currentNavigation = theme || getDefaultNavigation());
}

export const getNavigation = () => {
	return currentNavigation || getDefaultNavigation();
};