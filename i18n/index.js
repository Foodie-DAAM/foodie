import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import en from './lang.en';
import pt from './lang.pt';

export function init() {
	i18n.translations = {
		en: en,
		pt: pt,
	};
	i18n.fallbacks = true;
	i18n.locale = Localization.locale;
	// i18n.locale = 'pt';

	console.log('[i18n]', 'Initialized for locale:', i18n.locale);
}