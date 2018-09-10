import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import * as actions from "./actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";

import Launcher from "./components/launcher/launcher";
import Assistant from "./components/assistant/assistant";

export class Router extends Component {
  componentWillMount() {
    moment.updateLocale("en", {
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      weekdays: [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo"
      ],
      weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      weekdaysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
    });
    this.customParams();
    this.saludar();
  }

  customParams() {
    // const customParams = localStorage.getItem("customParams");
    // if (customParams) {
    //   this.props.setCustomParams(customParams);
    // } else {
      this.props.getCustomParams();
    // }
  }

  saludar(){
    const { customParamsStates } = this.props,
      keep_conversation= customParamsStates.getIn(["customParams","settings","keep_conversation"]),
      hc = localStorage.getItem("hc");
    if(!keep_conversation){
      if(hc) localStorage.removeItem("hc");
      this.props.getSaludo();
    }else{
      if(!hc) this.props.getSaludo();
    }
  }

  getContent(customParamsStates, saludoStates) {
    const avatar = customParamsStates.getIn(["customParams","avatar"]),
      estado = customParamsStates.getIn(["customParams","estado"]),
      saludo = saludoStates.getIn(["saludo", "msg"]);
      debugger
    if (avatar && estado!==0 && saludo.size > 0) {
      return (
        <BrowserRouter>
          <div>
            <Launcher {...this.props} />
            <Assistant {...this.props} />
          </div>
        </BrowserRouter>
      );
    } else {
      return null;
    }
  }

  render() {
    const { customParamsStates, saludoStates } = this.props;
    return this.getContent(customParamsStates, saludoStates);
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Router);
