import React, { Component } from 'react';
import { isTimestampMoreThan1HourAgo, formatDateTime } from '../utils/date-time-utils';
import  { formatNumberForLanguage } from '../utils/format-utils';

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  

  // Check if last reading was over 1 hour ago
  lastReadingWarning() {
    return isTimestampMoreThan1HourAgo(this.props.date);
  }

  handleClick(e) {
    this.props.clickHandler(this.props.title);
  }

  render() {
    return (
      <div aria-hidden={true} className="col s12 m5 l3">
        <div className={`card card-pointer blue-grey ${this.props.selected ? "darken-3" : "darken-4"}`} onClick={this.handleClick}>
          <div className={`card grey ${this.props.selected ? "darken-3" : "darken-4"}`}>
            <div className="card-content white-text">
              <span className="card-span">{this.props.title ? this.props.title : "Title"}</span>
              {this.lastReadingWarning() ? <span className="card-warning-icon"><i className="material-icons yellow-text">warning</i></span> : null}
              <span className="card-title">{this.props.temperature !== null || this.props.temperature !== undefined ? formatNumberForLanguage(this.props.temperature, navigator.language, 1) + "\u00b0C" : "Temperature Error"}</span>
              <div className={`card-humidity-battery`}>
                <p className="card-span">{this.props.humidity !== undefined && this.props.humidity > 0 ? this.props.humidity + "%" : ""}</p>
                  <div className={`battery card-battery-icon ${this.props.battery ? "" : "card-battery-hidden"}`}>
                    <span className="battery-level-text">{this.props.battery + "%"}</span>
                    <span className={`battery-level ${this.props.battery < 10 ? "battery-level-alert" : ""}`} style={{ height: this.props.battery < 10 ? "20% " : this.props.battery + "%" }}></span>
                  </div>
              </div>
              <div className="divider"></div>
              <span className={`card-span ${this.lastReadingWarning() && "red-text"}`}>
                {this.props.date ? formatDateTime(this.props.date) : "Date Error"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;