import React from 'react';
import Sentry from 'sentry-expo';

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
		Sentry.captureException(error, {
			extra: errorInfo
		});
		this.setState({ error: error, errorInfo: errorInfo });
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h2>Something went wrong</h2>
					<details style={{ whiteSpace: "pre-wrap" }}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo && this.state.errorInfo.toString()}
					</details>
				</div>
			);
		}
		return this.props.children;
	}
}