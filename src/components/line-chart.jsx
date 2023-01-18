import React from 'react';
import Plotly from "plotly.js-basic-dist";
import { formatTime, formatDate } from '../utils/date-time-utils';
import { getNelementsEvenlySpaced } from '../utils/array-utils';

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
      text: null,
      reducedXVals: this.reduceXDataForTicks(),
      loading: true,
    }
  }

  reduceXDataForTicks() {
    return getNelementsEvenlySpaced(this.props.xData, 4);
  }

  getTickVals() {
    return this.state.reducedXVals.map(v => new Date(v).getTime().toString());
  }

  getTextVals() {
    return this.state.reducedXVals.map(v => formatTime(v));
  }

  getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
  }

  getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  componentDidMount() {
    const minY1 = Math.round(this.getMinOfArray(this.props.yDataLeft) - 1);
    const maxY1 = Math.round(this.getMaxOfArray(this.props.yDataLeft) + 1);

    const minY2 = Math.round(this.getMinOfArray(this.props.yDataRight) - 1);
    const maxY2 = Math.round(this.getMaxOfArray(this.props.yDataRight) + 1);
    const text = this.props.xData.map(v => formatDate(v));
    const xVals = this.props.xData.map(v => new Date(v + 'Z').getTime());

    this.setState({
      minY1: minY1,
      maxY1: maxY1,
      text: text,
      xVals: xVals,
      loading: false,
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
          x: this.state.xVals,
          y: this.props.yDataLeft,
          name: this.props.axisNameLeft,
          mode: 'lines',
          hovertemplate: this.props.hoverTemplateLeft,
          text: this.state.text,
          type: 'scatter',
          connectgaps: false,
        },
        {
          x: this.state.xVals,
          y: this.props.yDataRight,
          yaxis: "y2",
          name: this.props.axisNameRight,
          mode: 'lines',
          hovertemplate: this.props.hoverTemplateRight,
          text: this.state.text,
          connectgaps: false,
        },
      ]
    } else {
      data = [
        {
          x: this.state.xVals,
          y: this.props.yDataLeft,
          name: this.props.axisNameLeft,
          mode: 'lines',
          hovertemplate: this.props.hoverTemplateLeft,
          text: this.state.text,
          connectgaps: false,
        }
      ]
    }

    const loading = this.state.loading;
    return (
      <div>
      {loading ? <p>Loading...</p> : 
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
            type: "linear",
            title: { text: 'Date/Time' },
            autorange: true,
            tickmode: "array",
            tickvals: this.getTickVals(),
            ticktext: this.getTextVals(),
          },
          yaxis: { title: this.props.labelLeft, automargin: true, range: [this.state.minY1, this.state.maxY1] },
          yaxis2: {
            title: this.props.labelRight,
            range: [0, 100],
            overlaying: 'y',
            side: 'right',
            automargin: true,
          },
        }}
        useResizeHandler={true}
        style={{ maxWidth: "100%", height: "100%" }}
      />}
      </div>
    )
  }
}

export default LineChart;