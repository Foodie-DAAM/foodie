export default {
	app: 'Foodie',
	version: 'Foodie {{version}}',
	nav: {
		main: 'Main',
		home: 'Home',
		profile: 'Profile',
		settings: 'Settings',
	},
	welcome: {
		title: 'Welcome to Foodie!',
		slogan: 'your favourite recipes one click away',
	},
	signIn: {
		titleCaps: 'SIGN IN',
		title: 'Login',
		gotoSignUp: {
			text: 'New user?',
			link: 'Create an account.',
		},
		anonymous: 'Or enter without an account.',
		social: {
			title: 'or sign in with',
			google: 'Sign-in with Google',
			facebook: 'Sign-in with Facebook',
		},
	},
	signUp: {
		titleCaps: 'SIGN UP',
		title: 'Create an account',
		gotoSignIn: {
			text: 'Already have an account?',
			link: 'Sign in.',
		},
		invalid: {
			email: 'enter a valid email',
			weakPassword: 'choose a stronger password',
			confirmPassword: 'passwords must match',
		},
	},
	profile: {
		title: 'Account Info',
		save: 'Save',
		id: 'ID',
		name: 'Name',
		email: 'Email',
		phone: 'Phone',
		photoLabel: 'The user photo.',
		password: 'Password',
		passwordConfirm: 'Confirm password',
		anonymous: 'Anonymous User',
	},
	search: {
		bar: 'Search...',
	},
	ingredient: {
		title: 'Ingredients',
		add: 'Add Ingredient',
		addName: 'Name',
		empty: 'Start by adding something...',
	},
	recipe: {
		photoLabel: 'The recipe photo.',
		loading: {
			one: 'Loading recipe...',
			other: 'Loading recipes...',
		},
		error: 'Error loading. Try again later.',
		nav: {
			info: 'Info',
			ingredients: 'Ingredients',
			nutrition: 'Nutrition',
		},
		startCooking: 'START COOKING',
		duration: {
			one: '{{count}} minute',
			other: '{{formatted}} minutes',
		},
		servings: {
			one: '{{count}} serving',
			other: '{{formatted}} servings',
		},
		steps: {
			previous: 'Previous',
			next: 'Next',
		},
		rate: {
			description: 'Rate your experience with this recipe',
			positive: 'Positive experience',
			negative: 'Negative experience',
			submit: 'Rate It',
		},
	},
	settings: {
		theme: {
			_: 'Theme',
			light: 'Light',
			dark: 'Dark',
		},
		units: {
			_: 'Unit System',
			imperial: 'Imperial',
			metric: 'Metric',
		},
		report: {
			_: 'Report a problem',
		},
		logout: {
			_: 'Logout',
		},
	},
}