import React, { Component } from 'react';

import Card from './card';

class Cards extends Component {
  render() {
    return (
      <div class="row">
        <Card
          title="Bedroom"
          humidity={(Math.random() * 10).toFixed(2)}
          temperature={(Math.random() * 10).toFixed(2)}
          date={new Date().toISOString()}
        />
        <Card
          humidity={(Math.random() * 10).toFixed(2)}
          temperature={(Math.random() * 10).toFixed(2)}
          date={new Date().toISOString()}
        />
        <Card
          humidity={(Math.random() * 10).toFixed(2)}
          temperature={(Math.random() * 10).toFixed(2)}
          date={new Date().toISOString()}
        />
      </div>
    );
  }
}

export default Cards;