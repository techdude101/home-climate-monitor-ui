import React from 'react';

class Footer extends React.Component {
  renderFooter() {
    if (this.props.appName && this.props.appVersion) {
      return <footer>{this.props.appName} Version: {this.props.appVersion}</footer>
    } else if (this.props.appName) {
      return <footer>{this.props.appName} Version: unknown</footer>
    } else if (this.props.appVersion) {
      return <footer>Version {this.props.appVersion}</footer>
    } else {
      return <footer>App Name and Version: unknown</footer>
    }
  }

  render() {
    return <>
    {this.renderFooter()}
    </>
  }
}

export default Footer;