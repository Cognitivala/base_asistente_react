import React, { Component } from "react";
import * as actions from "./actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import Launcher from "./components/launcher/launcher";
import Assistant from "./components/assistant/assistant";

export class App extends Component {
  constructor(props) {
    super(props);
    this.onMessageFunc = this.onMessageFunc.bind(this);
  }
  componentWillMount() {
    this.onMessageFunc();
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
    this.integracion();
    this.customParams();
  }

  integracion(){
    // debugger
    const src = window.location.search;
    let firstSplit = src.replace('?','').split("&"),
      integracion = {};
    firstSplit.forEach((element,i) => {
      if(element!==""){
        var secondSplit = element.split("=");
        integracion[secondSplit[0]] = secondSplit[1];
      }
    });
    this.props.setIntegracion(integracion);
  }

  customParams() {
    this.props.getCustomParams();
  }

  onMessageFunc() {
    const _this = this;
    window.onmessage = e => {
      if (e.data.colorBtn !== undefined) {
        _this.props.updateCustomColorBtn(e.data.colorBtn);
      } else if (e.data.title !== undefined) {
        _this.props.updateCustomTitle(e.data.title);
      } else if (e.data.subtitle !== undefined) {
        _this.props.updateCustomSubtitle(e.data.subtitle);
      } else if (e.data.colorHeader !== undefined) {
        _this.props.updateCustomColorHeader(e.data.colorHeader);
      } else if (e.data.avatar !== undefined) {
        _this.props.updateCustomAvatar(e.data.avatar);
      } else if (e.data.logo !== undefined) {
        _this.props.updateCustomLogo(e.data.logo);
      } else if (e.data.saludo !== undefined) {
        _this.props.updateSaludo(e.data.saludo);
      } else if (e.data.responsive !== undefined) {
        _this.props.responsive(e.data.responsive);
      }
    };
  }

  getContent(customParamsStates) {
    const avatar = customParamsStates.getIn(["customParams", "avatar"]),
      estado = customParamsStates.getIn(["customParams", "estado"]);
    if (avatar && estado !== 0) {
      window.top.postMessage({ responsiveFunc: true },"*");
      return (
        <div>
          <Launcher {...this.props} />
          <Assistant {...this.props} />
        </div>
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
)(App);
