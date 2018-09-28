import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ConversationLikes extends Component {
  constructor(props) {
    super(props);
    this.sendLikeHandled = this.sendLikeHandled.bind(this);
  }

  sendLikeHandled(event) {
    const { sendLike } = this.props,
      value = event.currentTarget.value;
    //sendLike(value);
    console.log("LIKESEND");
  }

  render() {
    const { colorHeader } = this.props,
      style = { backgroundColor: colorHeader };
    return (
      <div className="likes">
        <button
          className="btn"
          style={style}
          onClick={this.sendLikeHandled}
        >
          <i className="fas fa-thumbs-up" />
        </button>
        <button
          className="btn"
          style={style}
          onClick={this.sendLikeHandled}
        >
          <i className="fas fa-thumbs-down" />
        </button>
      </div>
    );
  }
}

ConversationLikes.propTypes = {
  colorHeader: PropTypes.string.isRequired,
  sendLike: PropTypes.func.isRequired
};
