import React, { Component } from 'react';

class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      port1_dates: props.port1_dates
    }
  }
  render() {

    return (
      <div>
        <div className="row">

          <div className="twelve columns collapsed">

            <h1>Final Graphs</h1>

          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
