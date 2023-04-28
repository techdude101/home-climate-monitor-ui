import React from 'react';
import uPlot from 'uplot';
import UplotReact from 'uplot-react';

import  { formatNumberForLanguage } from '../utils/format-utils';
import { formatDateTime } from '../utils/date-time-utils';

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
            value: (u, v) => v == null ? null : formatDateTime(new Date(v * 1000))
          },
          {
            label: this.props.label,
            points: { show: false },
            stroke: "green",
            value: (u, v) => v == null ? null : formatNumberForLanguage(v, navigator.language, this.props.decimalPlaces),
            spanGaps: false,
            gaps: (u, sidx, idx0, idx1, nullGaps) => {
              const isNum = Number.isFinite;
			        const delta = (60 * 2);
							let xData = u.data[0];
							let yData = u.data[sidx];

							let addlGaps = [];

							for (let i = idx0 + 1; i <= idx1; i++) {
								if (isNum(yData[i]) && isNum(yData[i-1])) {
									if (xData[i] - xData[i - 1] > delta) {
										uPlot.addGap(
											addlGaps,
											Math.round(u.valToPos(xData[i - 1], 'x', true)),
											Math.round(u.valToPos(xData[i],     'x', true)),
										);
									}
								}
							}

							nullGaps.push(...addlGaps);
							nullGaps.sort((a, b) => a[0] - b[0]);

							return nullGaps;
						}
					},
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