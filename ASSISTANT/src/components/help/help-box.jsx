import React, { Component } from "react";
import HelpBoxChild from "./help-box-child";
import PropTypes from "prop-types";
import Svg from "../modules/svg";

export default class HelpBox extends Component {
  constructor(props) {
    super(props);
    this.helpBoxDiv = React.createRef();
    this.toggleIndex = this.toggleIndex.bind(this);
  }

  toggleIndex(e) {
    let $item = this.refs.helpBoxDiv;
    const {mainCss} = this.props;
    if ($item.nextElementSibling.classList[1] === mainCss.Active) {
      $item.classList.remove(mainCss.Active);
      $item.nextElementSibling.classList.remove(mainCss.Active);
      if ($item.lastElementChild !== null) {
        $item.lastElementChild.classList.remove(mainCss.Active);
      }
    } else {
      $item.nextElementSibling.classList.add(mainCss.Active);
      $item.classList.add(mainCss.Active);
      if ($item.lastElementChild !== null) {
        $item.lastElementChild.classList.add(mainCss.Active);
      }
    }
  }

  fillHelp(ayuda, mainCss) {
    if (ayuda.get("listChild").size > 0) {
      return (
        <div className={mainCss.NodoAbuelo}>
          <p>{ayuda.get("description")}</p>
          {ayuda.get("listChild").map((map, i) => {
            return <HelpBoxChild mainCss={mainCss} ayuda={map} key={i} generalStates={this.props.generalStates} updateConversation={this.props.updateConversation} closeHelp={this.props.closeHelp}/>;
          })}
        </div>
      );
    }
  }

  content(ayuda, mainCss) {
    return (
      <div className={mainCss.AssistantHelperChild}>
        <div ref="helpBoxDiv" className={mainCss.AssistantTitle} onClick={this.toggleIndex}>
          <a href="#!">{ayuda.get("title")}</a>
          <Svg d={"M143,352.3,7,216.3a23.9,23.9,0,0,1,0-33.9H7a24.291,24.291,0,0,1,34.223,0L159.9,306.2,281.937,182.4c9.4-9.4,21.563-9.4,30.863,0h0a23.9,23.9,0,0,1,0,33.9l-136,136a23.781,23.781,0,0,1-33.8,0Z"}
            transform={"translate(0.05 -175.35)"}
            style={{}}
            className={mainCss.IconLi}
            viewBox={"0 0 319.9 184"}
            />
          {/* <i className={mainCss.IconLi} /> */}
        </div>
        {this.fillHelp(ayuda, mainCss)}
      </div>
    );
  }

  render() {
    const { ayuda, mainCss } = this.props;
    return this.content(ayuda, mainCss);
  }
}

HelpBox.propTypes = {
  ayuda: PropTypes.object.isRequired,
  updateConversation: PropTypes.func.isRequired,
  closeHelp: PropTypes.func.isRequired,
  generalStates: PropTypes.any.isRequired,
  mainCss: PropTypes.any.isRequired,
};
