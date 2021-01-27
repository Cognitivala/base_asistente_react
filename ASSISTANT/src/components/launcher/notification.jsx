import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationCircle from "./notification-circle";

export default class Notification extends Component {
  render() {
    const { saludo, mainCss, bubbleLogo } = this.props;
    return (
      <React.Fragment>
        <div className={mainCss.Notification}>
          <span dangerouslySetInnerHTML={{ __html: saludo }} />
        </div>
        <NotificationCircle mainCss={mainCss} bubbleLogo={bubbleLogo} />
      </React.Fragment>
    );
  }
}

Notification.propTypes = {
  saludo: PropTypes.any.isRequired
};
