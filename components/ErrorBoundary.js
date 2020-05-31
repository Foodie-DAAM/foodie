import React from 'react';
import {
	Text,
	View,
	StyleSheet
} from 'react-native';
import * as Sentry from 'sentry-expo';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null, hasError: false };
	}

	static getDerivedStateFromError() {
		return {
			hasError: true
		}
	}

	componentDidCatch(error, errorInfo) {
		Sentry.captureException(error, { extra: errorInfo });
		this.setState({ error: error, errorInfo: errorInfo });
	}

	render() {
		if (this.state.hasError) {
			return (
				<>
					<Text>Something went wrong</Text>
					<Text>
						{this.state.error && this.state.error.toString()}
					</Text>
					<Text>
						{this.state.errorInfo && this.state.errorInfo.toString()}
					</Text>
				</>
			);
		}

		return this.props.children;
	}
}