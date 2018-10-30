import React, { Component } from "react";

export default class FormError extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { error } = this.props;
    if (error) {
      return (
        <div class="error-msg">
          <p>
            <strong>Ups! Tenemos un problema</strong>
          </p>
          <p>Favor verifique sus datos e intente nuevamente.</p>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
