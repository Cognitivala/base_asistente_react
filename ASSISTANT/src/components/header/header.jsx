import React, { Component } from "react";
import PropTypes from "prop-types";
import BtnHelp from "../help/btn-help";
import logo from "../../assets/images/logoH.svg";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.showMore = this.showMore.bind(this);
    this.div = React.createRef();
  }

  showMore() {
    if (this.props.moreHeader) {
      console.log('moreHeader:: ', this.props.moreHeader);
      this.props.toggleHeaderMore(false);
    }else {
      console.log('moreHeader:: ', this.props.moreHeader);
      this.props.toggleHeaderMore(true);
    }
  }

  fillHelp(ayuda, minimized, positionHelp) {
    if (ayuda && positionHelp === "top" && !minimized) {
      return (
        <BtnHelp
          ayudaStates={this.props.ayudaStates}
          openHelp={this.props.openHelp}
          closeHelp={this.props.closeHelp}
          showWarningHelp={this.props.showWarningHelp}
          hideWarningHelp={this.props.hideWarningHelp}
          colorHeader={this.props.colorHeader}
          mainCss={this.props.mainCss}
        />
      );
    }
  }

  fillCloseButton(mainCss, responsive) {
    if (responsive === "mobile") {
      return (
        <button onClick={this.props.closeAssistant}
          className={ mainCss.CloseButton + " " + mainCss.Btn + " " + mainCss.BtnTransparent }
        />
      );
    }
  }

  content(mainCss, responsive, positionHelp) {
    let cssClass = this.props.minimized ? mainCss.AssistantMinimized : "";
    if (this.props.moreHeader) {
      return (
        <div
          ref={this.div}
          className={
            positionHelp === "top"
              ? mainCss.Header + " " + mainCss.HeaderMore + " " + mainCss.HeaderHelpUp
              : mainCss.HeaderHelpDown + " " + cssClass + " " + mainCss.HeaderMore
          }
        >
          <div/>
            <img
              className={mainCss.HeaderImage}
              src={this.props.logo}
              // src={logo}
              alt={"Logo"}
            />
            <button
              className={mainCss.Btn + " " + mainCss.BtnTransparent}
              onClick={this.props.minimizedAssistant}
            >
              <i
                className={mainCss.IconMinimized}
                onClick={this.props.minimizedAssistant}
              />
            </button>
            {this.fillCloseButton(mainCss, responsive)}
            <div className={mainCss.HeaderText} onClick={this.showMore}>
              <h3>¡Hola!</h3>
              <p dangerouslySetInnerHTML={{ __html: this.props.saludo }}>
  
              {/* Hola soy el Asistente Digital de DUOC Educación Continua y estoy aquí para ayudarte a dar respuestas a tus preguntas sobre: Cursos, Cursos/SAP o Diplomados. */}
                </p>
            </div>
        </div>
      );
    } else {
      return (
        <div ref={this.div}
          className={
            positionHelp === "top"
              ? mainCss.Header + " " + mainCss.HeaderHelpUp
              : mainCss.HeaderHelpDown + " " + cssClass
          }
          // style={style}
        >
          <img
            className={mainCss.HeaderImage}
            src={this.props.logo}
            // src={logo}
            alt={"Logo"}
          />
          <div className={mainCss.HeaderText} onClick={this.showMore}>
            <h3>{this.props.titulo}</h3>
            <p>{this.props.subtitulo}</p>
          </div>
          {this.fillHelp(this.props.ayuda, this.props.minimized, positionHelp)}
          <button
            className={mainCss.Btn + " " + mainCss.BtnTransparent}
            onClick={this.props.minimizedAssistant}
          >
            <i
              className={mainCss.IconMinimized}
              onClick={this.props.minimizedAssistant}
            />
          </button>
          {this.fillCloseButton(mainCss, responsive)}
        </div>
      );
    }
  }

  render() {
    const { mainCss, responsive, positionHelp } = this.props;
      // style = {
      //   backgroundImage: "url(" + imgBackHeader + ")",
      //   background:
      //     "linear-gradient(45deg, #004ecb 2%, #0957d6 61%, #2979ff 97%)",
      //   backgroundColor: this.props.colorHeader
      // };
    return this.content(mainCss, responsive, positionHelp);
  }
}

Header.propTypes = {
  logo: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  subtitulo: PropTypes.string.isRequired,
  closeAssistant: PropTypes.func.isRequired,
  ayuda: PropTypes.bool.isRequired,
  colorHeader: PropTypes.string.isRequired,
  ayudaStates: PropTypes.any.isRequired,
  openHelp: PropTypes.func.isRequired,
  closeHelp: PropTypes.func.isRequired,
  showWarningHelp: PropTypes.func.isRequired,
  hideWarningHelp: PropTypes.func.isRequired,
  minimizedAssistant: PropTypes.func.isRequired,
  minimized: PropTypes.bool.isRequired,
  mainCss: PropTypes.any.isRequired,
  responsive: PropTypes.string,
  positionHelp: PropTypes.string.isRequired
};
