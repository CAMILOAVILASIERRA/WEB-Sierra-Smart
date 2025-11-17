import * as React from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  info?: React.ErrorInfo;
};

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      // Log detallado en desarrollo para depurar el componente que falla
      // Esto ayuda a ubicar el origen del stack (workLoopSync/renderRootSync)
      console.error("UI error captured by ErrorBoundary:", error);
      console.error("Component stack:", info.componentStack);
    }
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 m-6 border rounded-lg bg-red-50 text-red-900">
          <h2 className="text-lg font-semibold">Se produjo un error al renderizar la interfaz.</h2>
          <p className="mt-2 text-sm">Por favor, intenta recargar la página. Si el problema persiste, vuelve al inicio.</p>
          <div className="mt-4 flex gap-2">
            <button
              className="px-3 py-1.5 rounded-md border bg-white text-red-900 hover:bg-red-100"
              onClick={() => window.location.reload()}
            >
              Recargar
            </button>
            <button
              className="px-3 py-1.5 rounded-md border bg-white text-red-900 hover:bg-red-100"
              onClick={() => (window.location.href = "/")}
            >
              Ir al inicio
            </button>
          </div>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-4 overflow-auto text-xs">
              {String(this.state.error)}
              {"\n"}
              {this.state.info?.componentStack}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;