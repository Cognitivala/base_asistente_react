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
  }

  customParams() {
    // const customParams = localStorage.getItem("customParams");
    // if (customParams) {
    //   this.props.setCustomParams(customParams);
    // } else {
      this.props.getCustomParams();
    // }
  }

  getContent(customParamsStates) {
    if (customParamsStates.getIn(["customParams","avatar"])) {
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
    const { customParamsStates } = this.props;
    return this.getContent(customParamsStates);
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
