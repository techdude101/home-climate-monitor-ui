import React, { Component } from 'react';

import LineChart from './line-chart';
import ErrorBoundary from './error-boundary';
import { getMinOfArray, getMaxOfArray } from '../utils/array-utils';

class Graph extends Component {
  constructor(props) {
    super(props)
    if (Array.isArray(this.props.data)) {
      this.state = {
        elementRef: React.createRef(),
        displayed: false,
        graphWidth: 600,
        graphHeight: 600,
        data: this.props.data,
        temperatures: this.props.data.map(d => d.temperature).reverse(),
        humidity: this.props.data.map(d => d.humidity).reverse(),
        timestamps: this.props.data.map(d => d.timestamp).reverse()
      }
    }
  }

  componentDidMount() {
    if (this.state.elementRef.current) {
      this.setState({
        graphWidth: Math.floor(this.state.elementRef.current.getBoundingClientRect().width),
        graphHeight: window.screen.height / 3,
        displayed: true,
      })
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.data !== this.props.data && Array.isArray(this.props.data)) {
      const temperatures = this.props.data.map(d => d.temperature);
      const humidity = this.props.data.map(d => d.humidity);
      const timestamps = this.props.data.map(d => d.timestamp);
      this.setState({
        temperatures: temperatures,
        humidity: humidity,
        timestamps: timestamps,
        graphWidth: Math.floor(this.state.elementRef.current.getBoundingClientRect().width),
        graphHeight: window.screen.height / 3
      })
    }
  }

  displayChart() {
    if (this.state === null) return "";
    // Temperature only
    if (this.state.humidity === null || this.state.humidity[0] === 0) {
      return <LineChart
      graphWidth={this.state.graphWidth}
      graphHeight={this.state.graphHeight}
      label="Temperature (℃)"
      xData={this.state.timestamps}
      yData={this.state.temperatures}
      axisNameLeft="Temperature"
      decimalPlaces={1}
      range={[getMinOfArray(this.state.temperatures) - 1, getMaxOfArray(this.state.temperatures) + 1]}
      title={"Temperature (℃)"} 
      />  
    }
    // Temperature and humidity
    return <>
    <LineChart
    graphWidth={this.state.graphWidth}
    graphHeight={this.state.graphHeight}
    label="Temperature (℃)"
    xData={this.state.timestamps}
    yData={this.state.temperatures}
    axisNameLeft="Temperature"
    decimalPlaces={1}
    range={[getMinOfArray(this.state.temperatures) - 1, getMaxOfArray(this.state.temperatures) + 1]}
    title={"Temperature (℃)"} />
    <hr />
    <LineChart
    graphWidth={this.state.graphWidth}
    graphHeight={this.state.graphHeight}
    label="Humidity (%)"
    xData={this.state.timestamps}
    yData={this.state.humidity}
    axisNameLeft="Humidity"
    decimalPlaces={0}
    range={[0,100]}
    title={"Humidity (%)"} />
    </>
  }

  render() {
    return (
      <>
      <div aria-hidden={true} className="row white-text center-align">
      <ErrorBoundary message="Error loading graphs :-(">
        <div className="col s12 m12 l12">
          <div className="card">
            <div className="card-title black-text center-align">
              {this.props.title}
            </div>
            <div className="card-content black-text" ref={this.state.elementRef}>
            {this.state.displayed ? this.displayChart() : ""}
            </div>
          </div>
        </div>
      </ErrorBoundary>
      </div>
      </>
    );
  }
}

export default Graph;