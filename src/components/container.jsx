import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import Cards from './cards';
import Graph from './graph';
import { getDevices } from '../utils/device'
import { getLastReading, getData } from '../utils/device-data';

class Container extends Component {
  constructor(props) {
    super(props);
    this.handleChangeDevice = this.handleChangeDevice.bind(this);
    this.handleBurger = this.handleBurger.bind(this);
    this.state = {
      devices: null,
      last_readings: [],
      selected_device: null,
      device_data: null
    }
  }

  handleBurger(e) {
    console.log("burger");
  }

  async handleChangeDevice(e) {
    // Check if the target device is different
    if (e.target.text === this.state.selected_device.description) return;
    // Update new selected device
    let new_selected_device = this.state.devices.filter(d => d.description === e.target.text);
    // Retrieve data from device
    if (new_selected_device.length !== 0) {
      // Array.filter returns array - get first element in the array
      new_selected_device = new_selected_device[0];
      const data = await this.getDataLast24Hours(new_selected_device.serial);
      this.setState({
        selected_device: new_selected_device,
        device_data: data
      });
    }
  }

  async getDataLast24Hours(serial) {
    if (serial === undefined) return;
    if (serial == null) return;
    let start_date = new Date();
    start_date.setDate(start_date.getDate() - 1);
    let end_date = new Date();
    end_date.setDate(end_date.getDate() + 1);

    return getData(serial, start_date.toISOString(), end_date.toISOString());
  }

  async componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.datepicker');
      const options = {
        defaultDate: new Date(),
        setDefaultDate: true,
      }
      var instances = M.Datepicker.init(elems, options);
    });
    const devices = await getDevices();

    this.setState({
      devices: devices
    });

    if (this.state.devices !== undefined) {
      this.setState({ selected_device: this.state.devices[0] })
      const readings = await Promise.all(this.state.devices.map((device) => {
        return getLastReading(device.serial);
      }));
      this.setState({
        last_readings: readings
      })

      let start_date = new Date();
      start_date.setDate(start_date.getDate() - 1);
      let end_date = new Date();
      end_date.setDate(end_date.getDate() + 1);
      if (this.state.selected_device !== undefined) {
        const data = await getData(this.state.selected_device.serial, start_date.toISOString(), end_date.toISOString());
        if (data !== undefined) {
          this.setState({ device_data: data });
        }
      }
    }
  }
  render() {
    return (
      <div>
        <div className="row margin-none">
          <div className="hide-on-med-and-up center-align">
            <h1 className="white-text margin-none header-title">Dashboard</h1>
            <div className="burger" onClick={this.handleBurger}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <ul className="mobileNav">
              {this.state.devices != null ? this.state.devices.map(device => {
                return <li key={device.serial}><a onClick={this.handleChangeDevice} className="waves-effect waves-light btn grey darken-2 sidebar-links">{device.description}</a></li>
              }) : ""}
            </ul>
          </div>
          <div className="col s12 m4 l2 blue-grey darken-3 min-height-100 hide-on-med-and-down">
            <div className="section white-text text-center">
              <h1 className="white-text sidebar-title">Graphs</h1>
              <div className="divider"></div>
              <input type="text" className="datepicker datepicker-override"></input>
              <ul>
                {this.state.devices != null ? this.state.devices.map(device => {
                  return <li key={device.serial}><a onClick={this.handleChangeDevice} className="waves-effect waves-light btn grey darken-2 sidebar-links">{device.description}</a></li>
                }) : ""}
              </ul>
            </div>
          </div>
          <div className="col s12 m12 l10 blue-grey darken-2 min-height-100vh">
            {this.state.last_readings != null ?
              <Cards readings={this.state.last_readings} devices={this.state.devices} />
              : ""}
            {this.state.device_data != null && this.state.device_data !== undefined && this.state.device_data.length > 1 ?
              <Graph data={this.state.device_data} title={this.state.selected_device.description} />
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default Container;