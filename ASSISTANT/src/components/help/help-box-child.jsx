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
    const answer = $item.getElementsByTagName("a")[0].innerText;
    const conversation = {msg:[answer],send:"to"};
    this.props.closeHelp();
    this.props.updateConversation(conversation);
  }

  content(ayuda) {
    return (
        <div className="li-child" onClick={this.sendHelp}>
          <a className="cur-pointer">{ayuda.get("title")}</a>
        </div>
    );
  }

  render() {
    const { ayuda } = this.props;
    return this.content(ayuda);
  }
}

HelpBoxChild.propTypes = {
  ayuda: PropTypes.object.isRequired
};
