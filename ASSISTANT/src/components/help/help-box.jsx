import React, { Component } from "react";
import HelpBoxChild from "./help-box-child";
import PropTypes from "prop-types";

export default class HelpBox extends Component {
  constructor(props) {
    super(props);
    this.toggleIndex = this.toggleIndex.bind(this);
  }

  toggleIndex(e) {
    let $item = e.target.tagName !== "DIV" ? e.target.parentNode : e.target;
    if ($item.nextElementSibling.classList[1] === "active") {
      $item.classList.remove("active");
      $item.nextElementSibling.classList.remove("active");
      if ($item.lastElementChild !== null) {
        $item.lastElementChild.classList.remove("active");
      }
    } else {
      $item.nextElementSibling.classList.add("active");
      $item.classList.add("active");
      if ($item.lastElementChild !== null) {
        $item.lastElementChild.classList.add("active");
      }
    }
  }

  fillHelp(ayuda,colorHeader) {
    if (ayuda.get("listChild").size > 0) {
      return (
        <div className="nodo-abuelo">
          <p>{ayuda.get("description")}</p>
          {ayuda.get("listChild").map((map, i) => {
            return <HelpBoxChild colorHeader={colorHeader} ayuda={map} key={i} generalStates={this.props.generalStates} updateConversation={this.props.updateConversation} closeHelp={this.props.closeHelp}/>;
          })}
        </div>
      );
    }
  }

  content(ayuda,colorHeader) {
    return (
      <div className="assitant-helper-child">
        <div className="assistant-title" onClick={this.toggleIndex}>
          <a style={{color:colorHeader}}>{ayuda.get("title")}</a>
          <i style={{color:colorHeader}} className="icon-li fas fa-angle-down" />
        </div>
        {this.fillHelp(ayuda, colorHeader)}
      </div>
    );
  }

  render() {
    const { ayuda, colorHeader } = this.props;
    return this.content(ayuda, colorHeader);
  }
}

HelpBox.propTypes = {
  ayuda: PropTypes.object.isRequired,
  updateConversation: PropTypes.func.isRequired,
  closeHelp: PropTypes.func.isRequired,
  generalStates: PropTypes.any.isRequired,
  colorHeader: PropTypes.string.isRequired
};
