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
    this.handleOpenForm = this.handleOpenForm.bind(this);
    this.handleVerificar = this.handleVerificar.bind(this);
    this.cerrarAsistente = this.cerrarAsistente.bind(this);
    this.handleHeaderMore = this.handleHeaderMore.bind(this);

    this.state = {
      verificar: false,
      openForm: false,
      headerMore: true,
    };
  }

  componentWillMount() {
    this.onMessageFunc();
    moment.updateLocale("en", {
      months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      weekdays: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
      weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      weekdaysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    });
    // this.integracion(); // CAMBIA NOMBRE DE FUNCIÓN A urlParams()
    this.urlParams();
    this.customParams();
  }

  urlParams() {
    // debugger
    const src = window.location.search;
    let firstSplit = src.replace("?", "").split("&"),
      integracion = {};
    firstSplit.forEach((element, i) => {
      if (element !== "") {
        var secondSplit = element.split("=");
        integracion[secondSplit[0]] = secondSplit[1];
      }
    });
    // this.props.setIntegracion(integracion);
    this.saveIntegracion(integracion);
    this.saveUrlParams(integracion);
  }

  saveIntegracion(integracion) {
    this.props.setIntegracion(integracion);
  }

  saveUrlParams(urlParams) {
    this.props.setUrlParams(urlParams);
  }

  customParams() {
    this.props.getCustomParams();
  }

  onMessageFunc() {
    const _this = this;
    window.onmessage = (e) => {
      if (e.data.colorBtn !== undefined) {
        _this.props.updateCustomColorBtn(e.data.colorBtn);
      } else if (e.data.title !== undefined) {
        _this.props.updateCustomTitle(e.data.title);
      } else if (e.data.subtitle !== undefined) {
        _this.props.updateCustomSubtitle(e.data.subtitle);
      } else if (e.data.colorHeader !== undefined) {
        _this.props.updateCustomcolor_header(e.data.color_header);
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

  scrollToBottom() {
    if (!this.props.ayudaStates.get("open")) {
      var elem = document.getElementById("conversacion");
      if (elem !== null) {
        this.scrollTo(elem, elem.scrollHeight, 600);
      }
    }
  }

  scrollTo(element, to, duration) {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20,
      _this = this;

    var animateScroll = function() {
      currentTime += increment;
      var val = _this.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  handleScroll(event) {
    const { conversationsStates } = this.props,
      sizeConv = conversationsStates.get("conversations").size;
    if (sizeConv > 1) {
      this.handleHeaderMore(false);
    } else if (sizeConv === 1) {
      this.handleHeaderMore(true);
    } else if (this.state.headerMore) {
      this.handleHeaderMore(true);
    }
  }

  handleHeaderMore(value) {
    this.setState({ headerMore: value });
  }

  handleVerificar(value) {
    this.setState({ verificar: value });
    this.scrollToBottom();
    this.handleScroll();
    this.handleHeaderMore(false);
    this.props.disabledInput();
  }

  handleOpenForm(value) {
    // if (value) {
    //   this.setState({
    //     openForm: value,
    //     verificar: false,
    //   });
    //   this.scrollToBottom();
    // } else {
    //   this.setState({
    //     openForm: value,
    //     verificar: false,
    //   });
    // }

    this.setState({
      openForm: value,
      verificar: value,
    });

    this.scrollToBottom();

    // this.props.closeAssistant();
  }

  cerrarAsistente() {
    this.setState({
      openForm: false,
      verificar: false,
    });
    this.props.closeAssistant();
  }

  getContent(customParamsStates) {
    const avatar = customParamsStates.getIn(["customParams", "avatar"]),
      estado = customParamsStates.getIn(["customParams", "estado"]);
    if (avatar && estado !== 0) {
      window.top.postMessage({ responsiveFunc: true }, "*");
      return (
        <div>
          <Launcher handleVerificar={this.handleVerificar} {...this.props} />
          <Assistant
            handleOpenForm={this.handleOpenForm}
            cerrarAsistente={this.cerrarAsistente}
            openForm={this.state.openForm}
            headerMore={this.state.headerMore}
            verificar={this.state.verificar}
            {...this.props}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
