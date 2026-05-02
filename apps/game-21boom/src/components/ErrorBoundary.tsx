import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (error) {
      if (this.props.fallback) return this.props.fallback(error);
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0d0d0d",
            color: "#ff5555",
            fontFamily: "monospace",
            padding: "2rem",
            gap: "1rem",
            zIndex: 9999,
          }}
        >
          <h2 style={{ margin: 0 }}>Something went wrong</h2>
          <pre
            style={{
              background: "#1a1a1a",
              padding: "1rem",
              borderRadius: "8px",
              maxWidth: "600px",
              overflowX: "auto",
              fontSize: "0.85rem",
              color: "#ffaaaa",
              whiteSpace: "pre-wrap",
            }}
          >
            {error.message}
            {"\n\n"}
            {error.stack}
          </pre>
          <button
            onClick={() => this.setState({ error: null })}
            style={{
              padding: "0.5rem 1.5rem",
              background: "#333",
              color: "#fff",
              border: "1px solid #555",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
