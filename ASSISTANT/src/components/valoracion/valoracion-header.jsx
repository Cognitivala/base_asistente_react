import React from "react";

const ValoracionHeader = props => {
    return (
        <div className="header" style={{backgroundColor:props.colorHeader}}>
          <div className="close-form">
            <button type="button" onClick={props.closeValoracion}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="icon">
            <i className="fas fa-check" />
          </div>
          <p className="title">¿Cómo evalúas en general esta conversación?</p>
          <p>Califica en una de 1 a 5, donde 5 es muy buena y 1 es muy mala</p>
        </div>
      );
};

export default ValoracionHeader;
