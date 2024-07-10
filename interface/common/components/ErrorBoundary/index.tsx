import { Button, Divider, Result } from "antd";
import React from "react";

class ErrorBoundary extends React.Component<{ children: React.ReactElement }, { hasError: boolean; error: any; errorInfo: any }> {
  constructor(props: any) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
    this.setState({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Result
          status="500"
          title="Error page"
          subTitle={
            <div>
              <div>Sorry, something went wrong.</div>
              {/* <div>{this.state?.error?.message}</div> */}
              <Divider />
              <div style={{ fontFamily: "monospace", whiteSpace: "pre-line" }}>{this.state?.error?.stack}</div>
            </div>
          }
          extra={
            <Button type="primary" onClick={() => this.setState({ hasError: false })}>
              Try again?
            </Button>
          }
        />
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
