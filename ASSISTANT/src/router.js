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
    this.getCid();
  }
  getCid(){
    if(localStorage.getItem('cid')!==null){
      const cid = localStorage.getItem('cid'),
        params = JSON.parse(localStorage.getItem('customParams'));
      this.props.setCid(cid);
      this.props.setCustomParams(params);
    }else{
      this.props.getCustomParams();
    }
  }
  getContent(customParamsStates) {
    if(customParamsStates.get("customParams").get("status") !== 0){
      return (
        <BrowserRouter>
          <div>
            <Launcher {...this.props} />
            <Assistant {...this.props} />
          </div>
        </BrowserRouter>
      );
    }else{
      return <div></div>;
    }
  }
  render() {
    const {customParamsStates} = this.props,
      content = this.getContent(customParamsStates);

    return <div> {content} </div>;
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
