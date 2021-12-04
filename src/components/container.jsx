import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import Cards from './cards';
import Graph from './graph';

class Container extends Component {
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.datepicker');
      const options = {
        defaultDate: new Date(),
        setDefaultDate: true,
      }
      var instances = M.Datepicker.init(elems, options);
    });
  }
  render() {
    return (
      <div>
        <div class="row margin-none">
          <div class="hide-on-med-and-up center-align">
            <h1 class="white-text margin-none header-title">Dashboard</h1>
          </div>
          <div class="col s12 m4 l2 blue-grey darken-3 min-height-100 hide-on-med-and-down">
            <div class="section white-text text-center">
              <h1 class="white-text sidebar-title">Graphs</h1>
              <div class="divider"></div>
              <input type="text" class="datepicker datepicker-override"></input>
              <a class="waves-effect waves-light btn grey darken-2">Button</a>
            </div>
          </div>
          <div class="col s12 m12 l10 blue-grey darken-2 min-height-100vh">
            <Cards />
            <Graph />
          </div>
        </div>
      </div>
    );
  }
}

export default Container;