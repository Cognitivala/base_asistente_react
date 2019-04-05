import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationCircle from "./notification-circle";

export default class Notification extends Component {
  render() {
    const { saludo, mainCss } = this.props;
    return (
      <React.Fragment>
        <NotificationCircle mainCss={mainCss} />
        <div className={mainCss.Notification}>
          <span dangerouslySetInnerHTML={{ __html: saludo }} />
        </div>
      </React.Fragment>
    );
  }
}

Notification.propTypes = {
  saludo: PropTypes.any.isRequired
};
