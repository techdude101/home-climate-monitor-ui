import React, { Component } from 'react';

class Card extends Component {

  render() {
    return (
      <div class="col s12 m5 l3">
        <div class="card blue-grey darken-4">
          <div class="card blue-grey darken-4">
            <div class="card-content white-text">
              <span class="card-span">{this.props.title ? this.props.title : "Title"}</span>
              <span class="card-title">{this.props.temperature ? this.props.temperature + "\u00b0C" : "Temperature Error"}</span>
              <p class="card-span">{this.props.humidity ? this.props.humidity + "%" : "Humdity Error"}</p>
              <div class="divider"></div>
              <span class="card-span">{this.props.date ? this.props.date : "Date Error"}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;