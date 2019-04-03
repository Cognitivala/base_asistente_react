import React from "react";

const ValoracionRadio = props => {
  const { label, name, value, click, mainCss, active } = props;
  return (
    <label>
      <div className={mainCss.Round}>
        <div className={active?mainCss.Active+" " +mainCss.Circle:mainCss.Circle} />
        {label}
        <input
          type="radio"
          name={name}
          value={value}
          onClick={click}
        />
      </div>
    </label>
  );
};

export default ValoracionRadio;
