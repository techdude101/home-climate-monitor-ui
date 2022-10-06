import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import { DatePicker } from "react-materialize";

import Cards from './cards';
import Graph from './graph';
import AddDevice from './add-device';

import { getDevices } from '../utils/device'
import { getLastReading, getData } from '../utils/device-data';
import { isToday } from '../utils/date-time-utils';

class Container extends Component {
  constructor(props) {
    super(props);
    this.handleChangeDevice = this.handleChangeDevice.bind(this);
    this.handleBurger = this.handleBurger.bind(this);
    this.toggleAddDevice = this.toggleAddDevice.bind(this);
    this.displayGraphs = this.displayGraphs.bind(this);
    this.state = {
      devices: null,
      last_readings: [],
      selected_device: null,
      device_data: null,
      add_device: false,
      selected_date: new Date(),
      loading: false
    }
  }

  handleBurger(e) {
    console.log("burger");
  }

  async handleDateChange(e) {
    const value = e.target.value;

    const newState = {...this.state}
    newState["selected_date"] = value;
    newState["loading"] = true;
    this.setState(newState);

    const data = await this.getData24Hours(this.state.selected_device.serial, value);
    this.setState({
      device_data: data,
      loading: false
    });
  }

  async handleChangeDevice(e) {
    // If add device is visible change the display to show the graphs
    if (this.state.add_device) {
      this.setState({add_device: false});
    }
    
    let device = null;
    if (e.hasOwnProperty('target')) {
      device = e.target.innerText.toLowerCase();
    } else {
      device = e.toLowerCase();
    }
    // Check if the target device is different
    if (device === this.state.selected_device.description.toLowerCase()) return;
    // Update new selected device
    let new_selected_device = this.state.devices.filter(d => d.description.toLowerCase() === device);
    // Retrieve data from device
    if (new_selected_device.length !== 0) {
      // Array.filter returns array - get first element in the array
      new_selected_device = new_selected_device[0];
      const newState = {...this.state};
      newState["loading"] = true;
      this.setState(newState);
      
      let data = null;
      if (isToday(this.state.selected_date)) {
        data = await this.getDataLast24Hours(new_selected_device.serial);
      } else {
        data = await this.getData24Hours(new_selected_device.serial, this.selected_date);
      }
      
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

  async getData24Hours(serial, startDate) {
    if (serial === undefined) return;
    if (serial == null) return;
    if (startDate === undefined) return;
    if (startDate === null) return;

    let end_date = new Date(startDate);
    end_date.setDate(startDate.getDate() + 1);

    return getData(serial, startDate.toISOString(), end_date.toISOString());
  }

  async componentDidMount() {
    const devices = await getDevices();

    this.setState({
      devices: devices
    });

    if (this.state.devices !== undefined && this.state.devices !== null) {
      this.setState({ selected_device: this.state.devices[0] })
      const readings = await Promise.all(this.state.devices.map((device) => {
        return getLastReading(device.serial);
      }));
      this.setState({
        last_readings: readings
      })
     
      if (this.state.selected_device !== undefined) {
        const data = await this.getDataLast24Hours(this.state.selected_device.serial);
        if (data !== undefined) {
          this.setState({ device_data: data });
        }
      }
    }
  }

  displayGraphs() {
    if (this.state.device_data != null && this.state.device_data !== undefined) {
      if (this.state.device_data.length === 0) {
        // If no data is available display "no data"
        return <h1 className="white-text center-align">No Data</h1>
      } else if (this.state.loading) {
        return <h1 className="white-text center-align">Loading...</h1>
      } else {
        // Display a graph if data is available
        return <Graph data={this.state.device_data} title={this.state.selected_device.description} />
      }
    }
  }

  displayCards() {
    if (this.state.last_readings != null) {
      return <Cards
        selectedDevice={this.state.selected_device != null ? this.state.selected_device.description : null}
        readings={this.state.last_readings}
        devices={this.state.devices}
        clickHandler={this.handleChangeDevice} />
    }
    else return null;
  }

  toggleAddDevice() {
    const addDevice = this.state.add_device;
    this.setState({ add_device: !addDevice });
  }

  render() {
    return (
      <div>
        <div className="row margin-none">
          {/* Only show on mobile */}
          <div className="hide hide-on-med-and-up center-align">
            <h1 className="white-text margin-none header-title">Dashboard</h1>
            <div className="burger" onClick={this.handleBurger}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <ul className="mobileNav">
              {this.state.devices != null ? this.state.devices.map(device => {
                return <li key={device.serial}><button onClick={this.handleChangeDevice} className="waves-effect waves-light btn grey darken-2 sidebar-links">{device.description}</button></li>
              }) : null}
              <li><button className="waves-effect waves-light btn grey darken-2 sidebar-links"
                onClick={this.toggleAddDevice}>{this.state.add_device ? "Show Graphs" : "Add Device"}</button></li>
            </ul>
          </div>
          {/* End only show on mobile */}
          {/* Sidebar - only display on tablets and larger screens */}
          <div className="col s12 m4 l2 blue-grey darken-3 min-height-100 hide-on-med-and-down">
            <div className="section white-text text-center">
              <h1 className="white-text sidebar-title">Graphs</h1>
              <div className="divider"></div>
              <DatePicker value={this.selected_date}
                id="datePicker" options={{
                  defaultDate: this.state.selected_date,
                  setDefaultDate: true
                }} onChange={(newDate) => {
                  this.handleDateChange({
                    target: {
                      id: "datePicker",
                      value: newDate
                    }
                  });
                }} />
              <ul>
                {this.state.devices != null ? this.state.devices.map(device => {
                  return <li key={device.serial}><button onClick={this.handleChangeDevice} className="waves-effect waves-light btn grey darken-2 sidebar-links">{device.description}</button></li>
                }) : null}
                <div className="divider"></div>
                <li><button className="waves-effect waves-light btn green darken-4 sidebar-links"
                  onClick={this.toggleAddDevice}>{this.state.add_device ? "Show Graphs" : "Add Device"}</button></li>
              </ul>
            </div>
          </div>
          <div className="col s12 m12 l10 blue-grey darken-2 min-height-100vh">
            {this.displayCards()}
            {this.state.add_device ?
              <AddDevice handleCancel={this.toggleAddDevice}/>
              :
              this.displayGraphs()
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Container;