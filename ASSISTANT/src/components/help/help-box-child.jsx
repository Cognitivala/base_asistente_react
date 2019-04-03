import React, { Component } from "react";
import PropTypes from "prop-types";

export default class HelpBoxChild extends Component {
  constructor(props) {
    super(props);
    this.sendHelp = this.sendHelp.bind(this);
  }

  sendHelp(e) {
    e.preventDefault();
    let $item = e.target.tagName !== "DIV" ? e.target.parentNode : e.target;
    const answer = $item.getElementsByTagName("a")[0].innerText,
      { generalStates } = this.props,
      general = generalStates.toJS(),
      conversation = {
        general,
        msg: [answer],
        send: "to",
        enabled: true
      };
    this.props.closeHelp();
    this.props.updateConversation(conversation);
  }

  content(ayuda, mainCss) {
    return (
      <div className={mainCss.LiChild} onClick={this.sendHelp}>
        <a className="cur-pointer" href="#!">{ayuda.get("title")}</a>
      </div>
    );
  }

  render() {
    const { ayuda, mainCss } = this.props;
    return this.content(ayuda, mainCss);
  }
}

HelpBoxChild.propTypes = {
  ayuda: PropTypes.object.isRequired,
  generalStates: PropTypes.any.isRequired,
  mainCss: PropTypes.any.isRequired,
};
