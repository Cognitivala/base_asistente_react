import React from "react";
import ValoracionRadio from "./valoracion-radio";

const ValoracionRadios = props => {
  const { pudoResolverCss, setPudoResolver, pudoResolver, colorHeader } = props;
  let style = { background: colorHeader };
  if (!pudoResolver) {
    return (
      <fieldset className="radios">
        <legend>¿Pudiste resolver tu inquietud en esta conversación?</legend>
        {<ValoracionRadio label="Sí" name="desicion" value="si" click={setPudoResolver} classCss={pudoResolverCss} styleCss={{}} withStars/>}
        {<ValoracionRadio label="No" name="desicion" value="no" click={setPudoResolver} classCss={pudoResolverCss} styleCss={style}/>}
      </fieldset>
    );
  } else {
    return (
      <fieldset className="radios">
        <legend>¿Pudiste resolver tu inquietud en esta conversación?</legend>
        {<ValoracionRadio label="Sí" name="desicion" value="si" click={setPudoResolver} classCss={pudoResolverCss} styleCss={style}/>}
        {<ValoracionRadio label="No" name="desicion" value="no" click={setPudoResolver} classCss={pudoResolverCss} styleCss={{}}/>}
      </fieldset>
    );
  }
};

export default ValoracionRadios;
