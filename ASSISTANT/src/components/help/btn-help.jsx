import React, { Component } from "react";
import PropTypes from "prop-types";

export default class BtnHelp extends Component {
  constructor(props) {
    super(props);
    this.toggleHelper = this.toggleHelper.bind(this);
    this.inHover = this.inHover.bind(this);
    this.outHover = this.outHover.bind(this);
    this.state = {
      inTransitionWarning:false,
      hover:false
    }
  }

  inHover(e){
    this.setState({hover:true})
  }

  outHover(e){
    this.setState({hover:false})
  }

  desactivarIndex() {
    const indexs = document.getElementsByClassName("assistant-title");
    for (let i = 0; i < indexs.length; i++) {
      const index = indexs[i];
      index.classList.remove("active");
      index.nextElementSibling.classList.remove("active");
    }
  }

  toggleHelper(e) {
    // debugger
    const {mainCss} = this.props;
    //Ver si está deshabilitada para enviar mensaje
    if (!this.props.ayudaStates.get("enabled")) {
      const showWarning = this.props.ayudaStates.get("showWarning"),
        inTransitionWarning = this.state.inTransitionWarning;
      if (!showWarning){
        if(!inTransitionWarning){
          this.props.showWarningHelp();
          this.setState({inTransitionWarning:true});
          setTimeout(() => {
            this.props.hideWarningHelp();
            this.setState({inTransitionWarning:false});
          }, 3000);
        }
      }
    } else {
      this.desactivarIndex();
      if(this.props.ayudaStates.get("open")){
        const divHelp = document.getElementsByClassName(mainCss.AssistantHelper)[0];
        divHelp.classList.remove(mainCss.Active);
        setTimeout(() => {
          this.props.closeHelp();
        }, 300);
      }else{
        this.props.openHelp();
      }
    }
  }

  render() {
    const {mainCss, ayudaStates} = this.props;
    let css = ayudaStates.get("enabled") ? "" : mainCss.Disabled,
    css2 = ayudaStates.get("open") ? mainCss.Active : "";
    return (
      <button onClick={this.toggleHelper} className={mainCss.Btn + " " + mainCss.BtnTransparent + " " + mainCss.ButtonHelp + " " + css + " " + css2} onMouseLeave={this.outHover} onMouseOver={this.inHover}>
      </button>
    );
  }
}

BtnHelp.propTypes = {
  ayudaStates: PropTypes.any.isRequired,
  openHelp: PropTypes.func.isRequired,
  closeHelp: PropTypes.func.isRequired,
  showWarningHelp: PropTypes.func.isRequired,
  hideWarningHelp: PropTypes.func.isRequired,
  colorHeader: PropTypes.string.isRequired,
  mainCss: PropTypes.any.isRequired,
};
