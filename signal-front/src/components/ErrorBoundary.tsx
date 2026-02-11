import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can send this to Sentry / LogRocket / Datadog etc.
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h5" color="error">
            Something went wrong
          </Typography>

          {error && (
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
              {error.message}
            </Typography>
          )}

          <Button variant="contained" onClick={this.handleReset}>
            Try again
          </Button>
        </Box>
      );
    }

    return children;
  }
}
