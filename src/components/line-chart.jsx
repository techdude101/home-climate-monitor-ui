import React from 'react';
import Plotly from "plotly.js-basic-dist";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      label: null,
      xData: [],
      yData: [],
      dateData: [],
      chartData: {},
      options: {},
    }
  }

  getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
  }

  getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  componentDidMount() {
    const minY1 = Math.floor(this.getMinOfArray(this.props.yDataLeft));
    const maxY1 = Math.ceil(this.getMaxOfArray(this.props.yDataLeft));

    const minY2 = Math.round(this.getMinOfArray(this.props.yDataRight) - 1);
    const maxY2 = Math.round(this.getMaxOfArray(this.props.yDataRight) + 1);

    this.setState({
      minY1: minY1,
      maxY1: maxY1,
      options: {
        color: '#FFF',
        elements: {
          point: { radius: 0 }
        },
        responsive: true,
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            min: minY1,
            max: maxY1,
            ticks: {
              display: true,
              stepSize: 0.5,
              color: 'rgba(255, 255, 255, 0.7)',
            }
          },
          y1: {
            type: 'linear',
            position: 'right',
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
            min: minY2,
            max: maxY2,
            ticks: {
              display: true,
              stepSize: 1,
              color: 'rgba(255, 255, 255, 0.7)',
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              display: true,
              color: 'rgba(255, 255, 255, 0.7)',
            }
          }
        },
      },
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.yDataLeft !== this.props.yDataLeft) {
      const minY1 = Math.floor(this.getMinOfArray(this.props.yDataLeft));
      const maxY1 = Math.ceil(this.getMaxOfArray(this.props.yDataLeft));
      this.setState({
        minY1: minY1,
        maxY1: maxY1
      })
    }
  }
  
  render() {
    let data = []
    if (this.props.yDataRight) {
      data = [
        {
          x: this.props.xData,
          y: this.props.yDataLeft,
          name: this.props.axisNameLeft,
          mode: 'lines',
          hovertemplate: this.props.hoverTemplateLeft
        },
        {
          x: this.props.xData,
          y: this.props.yDataRight,
          yaxis: "y2",
          name: this.props.axisNameRight,
          mode: 'lines',
          hovertemplate: this.props.hoverTemplateRight,
        },
      ]
    } else {
      data = [
        {
          x: this.props.xData,
          y: this.props.yDataLeft,
          name: this.props.axisNameLeft,
          mode: 'lines',
          hovertemplate: this.props.hoverTemplateLeft
        },
      ]
    }

    return (
      <Plot
        data={data}
        layout={{
          margin: {
            t: 90,
            b: 90,
            l: 70,
            r: 70,
            pad: 10
          },

          autosize: true,
          legend: {
            orientation: "h",
            yanchor: "bottom",
            y: 1.12,
            xanchor: "right",
            x: 1,
          },
          xaxis: {
            title: { text: 'Date/Time' },
            autorange: "false",
            type: 'date',
          },
          yaxis: { title: this.props.labelLeft, automargin: true, range: [this.state.minY1, this.state.maxY1] },
          yaxis2: {
            title: this.props.labelRight,
            range: [0, 100],
            overlaying: 'y',
            side: 'right',
            automargin: true,
          },
          hovermode: "x unified",
        }}
        useResizeHandler={true}
        style={{ maxWidth: "100%", height: "100%" }}
      />
    )
  }
}

export default LineChart;