import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ConversationLikes extends Component {
  constructor(props) {
    super(props);
    this.sendLikeHandled = this.sendLikeHandled.bind(this);
  }

  sendLikeHandled(event) {
    const { sendLike, generalStates, conversationsStates  } = this.props,
      like = event.currentTarget.dataset.like,
      general = generalStates.toJS(),
      conversaciones = conversationsStates.get('conversations'),
      sizeConv = conversationsStates.get("conversations").size,
      input = conversaciones.get(sizeConv-2).get("msg").get(0),
      output =conversaciones.get(sizeConv-1).get("msg").get(0),
      args = {
        origen: general.origen,
        cid: general.cid,
        nodo_id: general.nodo_id,
        input,
        output,
        like,
        valoracion: 0,
        comentario: "",
        pudo_resolver: ""
      };
    sendLike(args,general);
  }

  render() {
    return (
      <div className="likes">
        <button
          className="btn"
          onClick={this.sendLikeHandled}
          data-like={0}
        >
          No
          <i className="fas fa-thumbs-down" />
        </button>
        <button
          className="btn"
          onClick={this.sendLikeHandled}
          data-like={1}
        >
        Si
          <i className="fas fa-thumbs-up" />
        </button>
      </div>
    );
  }
}

ConversationLikes.propTypes = {
  colorHeader: PropTypes.string.isRequired,
  sendLike: PropTypes.func.isRequired,
  generalStates: PropTypes.any.isRequired,
  conversationsStates: PropTypes.any.isRequired
};
