import React from 'react';
import M from '@materializecss/materialize/dist/js/materialize.min.js';
import { isInputValid } from '../utils/input-validation';
import { getDevices, addDevice } from '../utils/device';

class AddDevice extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.state = {
      addingDevice: false,
      addButtonDisabled: true,
      serial: 1,
      description: '',
      key: '',
      keyError: false,
      descriptionError: false,
      addDeviceError: false,
      new_device_key: null,
      new_device_serial: null
    }
  }

  async componentDidMount() {
    const devices = await getDevices();
    let maxSerialNumber = 0;

    // Loop over devices to get the last serial number
    devices.forEach((device) => {
      maxSerialNumber = Math.max(device.serial, maxSerialNumber);
    });
    this.setState({serial: maxSerialNumber + 1})

    M.updateTextFields(); // Fixes overlapping label issue
  }

  isFormValid() {
    const key = this.state.key;
    const description = this.state.description;

    const keyIsValid = isInputValid(key);
    const descriptionIsValid = isInputValid(description);
    this.setState({ descriptionError: !descriptionIsValid })
    this.setState({ keyError: !keyIsValid })

    return keyIsValid && descriptionIsValid;
  }

  handleChange(e) {
    const id = e.target.id;
    const value = e.target.value;

    if (isInputValid(value, 3) && e.target.validity.valid) {
      if (id === 'description') this.setState({ description: value, descriptionError: false })
      if (id === 'pass_or_key') this.setState({ key: value, keyError: false })
    } else {
      if (id === 'description') {
        this.setState({ description: value, descriptionError: true })
      }
      if (id === 'pass_or_key') this.setState({ key: value, keyError: true })
    }
    this.setState({ addButtonDisabled: this.state.keyError || this.state.descriptionError });
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    const formIsValid = this.isFormValid(e);
    if (formIsValid === false) {
      return;
    }
    // Disable button after submitting the form
    this.setState({ addButtonDisabled: true });

    const response = await addDevice(this.state.serial, this.state.description, this.state.key);
    console.log(response);
    if (response.hasOwnProperty('data') && response.data.hasOwnProperty('key') && response.data.hasOwnProperty('serial')) {
      this.setState({
        new_device_key: response.data.key,
        new_device_serial: response.data.serial
      });
    } else {
      this.setState({ addDeviceError: true })
    }
    // Check if device was added successfully
    // const devices = await getDevices();
    return false;
  }

  render() {
    return (
      <div className="container">
        <h4 className="white-text">Add a Device</h4>
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="row">
              <div className="input-field col s12">
                <input name="description" id="description" type="text" className="validate white-text" maxLength="50" required value={this.state.description} onChange={this.handleChange} />
                <label htmlFor="description">Device Description</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="pass_or_key" id="pass_or_key" type="text" className="validate white-text" required value={this.state.key} onChange={this.handleChange} />
                <label htmlFor="pass_or_key">Admin API Key</label>
              </div>
            </div>
            <div className="row">
              {this.state.keyError || this.state.descriptionError ?
                <div className="input-field col s12 red">
                  <p>Error - invalid description or API key</p> </div>
                : null
              }
            </div>
            <div className="row">
              {this.state.addDeviceError ?
                <div className="input-field col s12 red">
                  <p>Error adding device</p></div>
                : null
              }
            </div>
            <div className="row">
              {this.state.new_device_key ?
                <div className="input-field col s12">
                  <p>Device added successfully</p>
                  <p>API key for device serial # {this.state.new_device_serial} = {this.state.new_device_key}</p> 
                  </div>
                : null
              }
            </div>
          </div>
          <div>
            <button className="waves-effect waves-light red btn-flat form-buttons" onClick={this.props.handleCancel} >
              Cancel
            </button>
            <button type="submit" className="waves-effect waves-light green btn-flat form-buttons">
              Add Device
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddDevice;