import React, { Component } from 'react';

import LineChart from './line-chart';

class Graph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      temperatures: this.props.data.map(d => d.temperature),
      humidity: this.props.data.map(d => d.humidity),
      timestamps: this.props.data.map(d => d.timestamp)
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.data !== this.props.data) {
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

  render() {
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
            <LineChart
                    labelLeft="Temperature (℃)"
                    labelRight="Humidity (%)"
                    xData={this.state.timestamps}
                    yDataLeft={this.state.temperatures}
                    yDataRight={this.state.humidity}
                    title={" "}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;