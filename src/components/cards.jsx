import React, { Component } from 'react';

import Card from './card';

class Cards extends Component {
  constructor(props){
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    this.props.clickHandler(e);
  }

  getDeviceDescription = (serial) => {
    const result = this.props.devices.filter(d => serial === d.serial);
    return result.length !== 0 ? result[0].description : "";
  }

  dateTimeIsWithinLast2Days = (datetime) => {
    let dt = new Date(datetime);
    let twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    return (dt.getTime() > twoDaysAgo);
  }

  deviceCard = () => {
    if (this.props.readings === null) return;
    if (this.props.readings[0] === undefined) return;
    if (this.props.devices === undefined) return;
    return  this.props.readings.map((device) => {
      if (device !== undefined && device[0] !== undefined && this.dateTimeIsWithinLast2Days(device[0].timestamp)) {
      return <Card
      key={device[0].serial}
      title={this.getDeviceDescription(device[0].serial)}
      humidity={device[0].humidity}
      temperature={device[0].temperature}
      battery={device[0].battery}
      date={device[0].timestamp} 
      clickHandler={this.clickHandler} 
      selected={this.props.selectedDevice === this.getDeviceDescription(device[0].serial)} />
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