import React from 'react';
import uPlot from 'uplot';
import UplotReact from 'uplot-react';

import "uplot/dist/uPlot.min.css";

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      label: null,
      xData: this.props.xData.map(v => Math.round(new Date(v + "Z").getTime() / 1000)).reverse(),
      yData: this.props.yData.map(v => v).reverse(),
      dateData: [],
      chartData: {},
      options: {
        title: this.props.title,
        width: this.props.graphWidth - 50,
        height: this.props.graphHeight,
        mode: 1,
        tzDate: ts => uPlot.tzDate(new Date(ts * 1e3), Intl.DateTimeFormat().resolvedOptions().timeZone),
        cursor: {
          x: true,
          y: false,
        },
        scales: {
          y: {
            range: this.props.range
          }
        },
        series: [
          {
            value: `{DD}-{MM}-{YY} {HH}:{mm}:{ss}`
          },
          {
            label: this.props.labelLeft,
            points: { show: false },
            stroke: "green",
            value: (u, v) => v == null ? null : v.toFixed(this.props.decimalPlaces),
          }
        ],
        axes: [
          {},
          {
            label: this.props.labelLeft
          }
        ]
      },
      text: null,
      loading: true,
    }
  }

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  render() {
    const loading = this.state.loading;
    return (
      <div>
        {loading ? <p>Loading...</p> :
          <UplotReact
            options={this.state.options}
            data={[this.state.xData, this.state.yData]}
            onCreate={(chart) => { }}
            onDelete={(chart) => { }}
          />}
      </div>
    )
  }
}

export default LineChart;