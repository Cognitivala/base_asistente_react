import React, { Component } from "react";
import ValoracionRadio from "./valoracion-radio";

export default class ValoracionInquietud extends Component {
  render() {
    const { mainCss, setPudoResolver, pudoResolver } = this.props;
    if (pudoResolver===null) {
      return (
        <fieldset className={mainCss.Radios}>
          <legend>¿Su caso o inquietud fueron resueltas?</legend>
          {
            <ValoracionRadio
              label="Sí"
              name="desicion"
              value="si"
              mainCss={mainCss}
              active={false}
              click={setPudoResolver}
            />
          }
          {
            <ValoracionRadio
              label="No"
              name="desicion"
              value="no"
              mainCss={mainCss}
              active={false}
              click={setPudoResolver}
            />
          }
        </fieldset>
      );
    } else if (pudoResolver) {
      return (
        <fieldset className={mainCss.Radios}>
          <legend>¿Su caso o inquietud fueron resueltas?</legend>
          {
            <ValoracionRadio
              label="Sí"
              name="desicion"
              value="si"
              mainCss={mainCss}
              active={true}
            />
          }
          {
            <ValoracionRadio
              label="No"
              name="desicion"
              value="no"
              mainCss={mainCss}
              active={false}
              click={setPudoResolver}
            />
          }
        </fieldset>
      );
    } else {
      return (
        <fieldset className={mainCss.Radios}>
          <legend>¿Su caso o inquietud fueron resueltas?</legend>
          {
            <ValoracionRadio
              label="Sí"
              name="desicion"
              value="si"
              mainCss={mainCss}
              active={false}
              click={setPudoResolver}
            />
          }
          {
            <ValoracionRadio
              label="No"
              name="desicion"
              value="no"
              mainCss={mainCss}
              active={true}
            />
          }
        </fieldset>
      );
    }
  }
}
