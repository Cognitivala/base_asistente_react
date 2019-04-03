import React, { Component } from "react";

export default class ValoracionComments extends Component {
  render() {
    const { setComment } = this.props;
    return (
      <fieldset>
        <legend style={{fontWeight:100,marginBottom:".8rem"}}>¡Gracias por la valoración! Nos ayuda a seguir mejorando. Puedes dejar un mensaje adicional en el espacio siguiente</legend>
        <textarea
          name="por-que"
          id="por-que"
          rows="2"
          onKeyUp={setComment}
        />
      </fieldset>
    );
  }
}
