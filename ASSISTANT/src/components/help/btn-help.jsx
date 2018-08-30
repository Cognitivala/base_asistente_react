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
      this.props.ayudaStates.get("open")
        ? this.props.closeHelp()
        : this.props.openHelp();
    }
  }

  render() {
    let css = this.props.ayudaStates.get("enabled") ? "" : "disabled";
    const style = this.state.hover?{
      color: this.props.colorHeader
    }: {};
    return (
      <div id="button-helper" onClick={this.toggleHelper} className={css} onMouseLeave={this.outHover} onMouseOver={this.inHover} style={style}>
        Help
      </div>
    );
  }
}

BtnHelp.propTypes = {
  ayudaStates: PropTypes.any.isRequired,
  openHelp: PropTypes.func.isRequired,
  closeHelp: PropTypes.func.isRequired,
  showWarningHelp: PropTypes.func.isRequired,
  hideWarningHelp: PropTypes.func.isRequired,
  colorHeader: PropTypes.string.isRequired
};
