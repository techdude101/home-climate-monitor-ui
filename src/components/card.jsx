import React, { Component } from 'react';


class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  dateToUTC(d) {
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
  }

  // Check if last reading was over 1 hour ago
  lastReadingWarning() {
    const reading = new Date(this.props.date);
    const readingUTC = this.dateToUTC(reading);
    const now = new Date();
    const nowUTC = this.dateToUTC(now);
    const difference = (nowUTC - readingUTC) / 1000; // seconds

    // 60 seconds * 60 minutes
    if (difference > (60 * 60)) {
      return true;
    }
    return false;
  }

  handleClick(e) {
    this.props.clickHandler(this.props.title);
  }

  formatDate(date) {
    // Get user locale from browser
    const locale = navigator.language;

    return new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short', hour12: false }).format(new Date(date));
  }
  render() {
    return (
      <div className="col s12 m5 l3">
        <div className={`card card-pointer blue-grey ${this.props.selected ? "darken-3" : "darken-4"}`} onClick={this.handleClick}>
          <div className={`card grey ${this.props.selected ? "darken-3" : "darken-4"}`}>
            <div className="card-content white-text">
              <span className="card-span">{this.props.title ? this.props.title : "Title"}</span>
              {this.lastReadingWarning() ? <span className="card-warning-icon"><i className="material-icons yellow-text">warning</i></span> : null}
              <span className="card-title">{this.props.temperature !== null || this.props.temperature !== undefined ? this.props.temperature.toFixed(1) + "\u00b0C" : "Temperature Error"}</span>
              <div className={`card-humidity-battery ${this.props.battery === 0 ? "card-battery-hidden" : ""}`}>
                <p className="card-span">{this.props.humidity ? this.props.humidity + "%" : ""}</p>
                  <div className="battery card-battery-icon">
                    <span className="battery-level-text">{this.props.battery + "%"}</span>
                    <span className={`battery-level ${this.props.battery < 10 ? "battery-level-alert" : ""}`} style={{ height: this.props.battery < 10 ? "20% " : this.props.battery + "%" }}></span>
                  </div>
              </div>
              <div className="divider"></div>
              <span className={`card-span ${this.lastReadingWarning() && "red-text"}`}>
                {this.props.date ? this.formatDate(this.props.date) : "Date Error"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;