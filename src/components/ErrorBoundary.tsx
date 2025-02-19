"use client";

import React from 'react';
import { Typography, Button, Box } from '@mui/material';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h4" color="error">
            Something went wrong.
          </Typography>
          <Button variant="contained" color="primary" onClick={this.handleReload} sx={{ mt: 3 }}>
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
