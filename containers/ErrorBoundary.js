import React, { Component } from "react";
import * as Sentry from '@sentry/react-native';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    // this.setState({ error });
    Sentry.captureException(error);
  }

  render() {
    return this.props.children;
  }
}
