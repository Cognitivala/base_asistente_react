import React from "react";

const ValoracionError = props => {
  if (props.error) {
    return (
      <div className="error-msg show">
        <p>
          <strong>Ups! Tenemos un problema</strong>
        </p>
        <p>Favor verifique sus datos e intente nuevamente.</p>
      </div>
    );
  } else {
    return <div className="error-msg" />;
  }
};

export default ValoracionError;
