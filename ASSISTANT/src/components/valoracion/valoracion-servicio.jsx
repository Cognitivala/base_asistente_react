import React, { Component } from "react";
import ValoracionRadio from "./valoracion-radio";

export default class ValoracionServicio extends Component {
  render() {
      const {mainCss, setServicio, servicio} = this.props;
      if(servicio===null){
        return (
            <fieldset className={mainCss.Radios}>
              <legend>¿Cómo valoraría el servicio en general? </legend>
              {<ValoracionRadio label="Bueno" name="desicion" value="bueno" mainCss={mainCss} active={false} click={setServicio}/>}
              {<ValoracionRadio label="Malo" name="desicion" value="malo" mainCss={mainCss} active={false} click={setServicio}/>}
            </fieldset>
          );
    }else if(servicio){
        return (
            <fieldset className={mainCss.Radios}>
              <legend>¿Cómo valoraría el servicio en general? </legend>
              {<ValoracionRadio label="Bueno" name="desicion" value="bueno" mainCss={mainCss} active={true}/>}
              {<ValoracionRadio label="Malo" name="desicion" value="malo" mainCss={mainCss} active={false} click={setServicio}/>}
            </fieldset>
          );
    }else{
        return (
          <fieldset className={mainCss.Radios}>
            <legend>¿Cómo valoraría el servicio en general? </legend>
            {<ValoracionRadio label="Bueno" name="desicion" value="bueno" mainCss={mainCss} active={false} click={setServicio}/>}
            {<ValoracionRadio label="Malo" name="desicion" value="malo" mainCss={mainCss} active={true} />}
          </fieldset>
        );
    }
  }
}
