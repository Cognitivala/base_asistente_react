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

  content(ayuda, colorHeader) {
    return (
      <div className="li-child" onClick={this.sendHelp}>
        <a style={{color:colorHeader}} className="cur-pointer">{ayuda.get("title")}</a>
      </div>
    );
  }

  render() {
    const { ayuda, colorHeader } = this.props;
    return this.content(ayuda, colorHeader);
  }
}

HelpBoxChild.propTypes = {
  ayuda: PropTypes.object.isRequired,
  generalStates: PropTypes.any.isRequired,
  colorHeader: PropTypes.string.isRequired
};