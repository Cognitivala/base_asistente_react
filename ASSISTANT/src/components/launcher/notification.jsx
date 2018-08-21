import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class Notification extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { saludo } = this.props;

    return saludo.map((map,i)=>{
      return (
        <div key={i}>
          <span className="bubble-cognitive-assistant">1</span>
          <div className="cognitive-assistant-notification-container">
            <div>{map}</div>
            <button className="cognitive-assistant-notification-button-close">
              <i className="close-icon" />
            </button>
          </div>
        </div>
      );
    });

  }
}

Notification.propTypes = {
  saludo: PropTypes.any.isRequired
}