import React from "react";

const ValoracionRadio = props => {
  const { label, name, value, click, classCss, styleCss } = props;
  return (
    <label>
      <div className="round">
        {label}
        <input
          type="radio"
          name={name}
          value={value}
          onClick={click}
          className={classCss}
        />
        <div className="circle" style={styleCss} />
      </div>
    </label>
  );
};

export default ValoracionRadio;
