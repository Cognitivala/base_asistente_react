import React from "react";

const ValoracionRadios = props => {
    const { pudoResolverCss, setPudoResolver } = props;
    return (
      <fieldset className="radios">
        <legend>¿Pudiste resolver tu inquietud en esta conversación?</legend>
        <label>
          <div className="round">
            Sí
            <input
              type="radio"
              name="decision"
              value="si"
              onClick={setPudoResolver}
              className={pudoResolverCss}
            />
            <div className="circle" />
          </div>
        </label>
        <label>
          <div className="round">
            No
            <input
              type="radio"
              name="decision"
              value="no"
              onClick={setPudoResolver}
              className={pudoResolverCss}
            />
            <div className="circle" />
          </div>
        </label>
      </fieldset>
    );
  }

export default ValoracionRadios;
