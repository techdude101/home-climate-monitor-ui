import React, { Component } from 'react';

import LineChart from './line-chart';

class Graph extends Component {
  constructor(props) {
    super(props)
    if (Array.isArray(this.props.data)) {
      this.state = {
        data: this.props.data,
        temperatures: this.props.data.map(d => d.temperature),
        humidity: this.props.data.map(d => d.humidity),
        timestamps: this.props.data.map(d => d.timestamp)
      }
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
        timestamps: timestamps
      })
    }
  }

  displayChart() {
    if (this.state === null) return "";
    // Temperature only
    if (this.state.humidity === null || this.state.humidity[0] === 0) {
      return <LineChart
      labelLeft="Temperature (℃)"
      xData={this.state.timestamps}
      yDataLeft={this.state.temperatures}
      axisNameLeft="Temperature"
      hoverTemplateLeft='%{text}<br>%{y:.1f}&deg;C<extra></extra>'
      title={" "} 
      />  
    }
    // Temperature and humidity
    return <LineChart
    labelLeft="Temperature (℃)"
    labelRight="Humidity (%)"
    xData={this.state.timestamps}
    yDataLeft={this.state.temperatures}
    yDataRight={this.state.humidity}
    axisNameLeft="Temperature"
    axisNameRight="Humidity"
    hoverTemplateLeft='%{text}<br>%{y:.1f}&deg;C<extra></extra>'
    hoverTemplateRight='%{text}<br>%{y:.0f}%<extra></extra>'
    title={" "} />
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <div className="card blue-grey darken-1">
            <div className="card-title white-text center-align">
              {this.props.title}
            </div>
            <div className="card-content white-text">
            {this.displayChart()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;