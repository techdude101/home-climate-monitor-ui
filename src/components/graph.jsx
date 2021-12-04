import React, { Component } from 'react';

import LineChart from './line-chart';

class Graph extends Component {
  render() {
    return (
      <div class="row">
        <div class="col s12 m12 l12">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
            <LineChart
                    labelLeft="Temperature (℃)"
                    labelRight="Humidity (%)"
                    xData={[1,2,3]}
                    yDataLeft={[1,2,3]}
                    yDataRight={[3,4,5]}
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