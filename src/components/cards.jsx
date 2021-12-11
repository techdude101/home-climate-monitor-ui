import React, { Component } from 'react';

import Card from './card';

class Cards extends Component {
  getDeviceDescription = (serial) => {
    const result = this.props.devices.filter(d => serial === d.serial);
    // return result[0].description;
    return result.length !== 0 ? result[0].description : "";
  }

  deviceCard = () => {
    if (this.props.readings === null) return;
    if (this.props.readings[0] === undefined) return;
    return  this.props.readings.map((device) => {
      if (device[0] !== undefined) {
      return <Card
      key={device[0].serial}
      title={this.getDeviceDescription(device[0].serial)}
      humidity={device[0].humidity}
      temperature={device[0].temperature}
      date={device[0].timestamp} />
      } else { return "" }
    });
  }

  render() {
    return (
      <div className="row">
        {this.props.devices !== undefined ? this.deviceCard() : ""}
      </div>
    );
  }
}

export default Cards;