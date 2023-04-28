import React from 'react';

class ErrorBoundary extends React.Component {
 
  state = {error: null};

  render() {
      if (!this.state.error) return this.props.children;
      else return <h1>{this.props.message ? this.props.message : "Error!" }</h1>;
  }

  static getDerivedStateFromError(error) {
      return {error};
  }
}

export default ErrorBoundary;