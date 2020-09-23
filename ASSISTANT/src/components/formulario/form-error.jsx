import React, { Component } from "react";

export default class FormError extends Component {
  render() {
    const { error, mainCss } = this.props;
    if (error) {
      return (
        <div class={mainCss.ErrorMsg}>
          <p>
            <strong>Tenemos un problema</strong>
          </p>
          <p>Favor verifique sus datos e intente nuevamente.</p>
        </div>
      );
    } else {
      return <React.Fragment />;
    }
  }
}
