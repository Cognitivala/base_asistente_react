import React, { Component } from "react";

export default class ValoracionComments extends Component {
  render() {
    const { setComment } = this.props;
    return (
      <fieldset>
        <legend style={{fontWeight:100,marginBottom:".8rem"}}>¡Gracias por tu valoración! Ayúdame a seguir mejorando, comenta en el recuadro inferior tu opinión.</legend>
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
