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
    this.onMessageFunc();
  }

  customParams() {
    // const customParams = localStorage.getItem("customParams");
    // if (customParams) {
    //   this.props.setCustomParams(customParams);
    // } else {
      this.props.getCustomParams();
    // }
  }

  onMessageFunc(){
    window.onmessage = e => {
      console.log('onmessageReact => ',e.data)
      if (e.data.colorBtn !== undefined) {
        this.props.updateCustomColorBtn(e.data.colorBtn);
      } else if (e.data.title !== undefined) {
        this.props.updateCustomTitle(e.data.title);
      } else if (e.data.subtitle !== undefined) {
        this.props.updateCustomSubtitle(e.data.subtitle);
      } else if (e.data.colorHeader !== undefined) {
        this.props.updateCustomColorHeader(e.data.colorHeader);
      } else if (e.data.avatar !== undefined) {
        this.props.updateCustomAvatar(e.data.avatar);
      } else if (e.data.logo !== undefined) {
        this.props.updateCustomLogo(e.data.logo);
      }
    };
  }

  getContent(customParamsStates) {
    const avatar = customParamsStates.getIn(["customParams","avatar"]),
      estado = customParamsStates.getIn(["customParams","estado"]);
    if (avatar && estado!==0) {
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
