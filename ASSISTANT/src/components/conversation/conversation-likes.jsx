import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ConversationLikes extends Component {
  constructor(props) {
    super(props);
    this.sendLikeHandled = this.sendLikeHandled.bind(this);
  }

  sendLikeHandled(event) {
    //console.log('sendLikeHandled');
    const { sendLike, generalStates, conversationsStates } = this.props;
    const like = event.currentTarget.dataset.like;
    const general = generalStates.toJS();
    const conversaciones = conversationsStates.get("conversations");
    const sizeConv = conversationsStates.get("conversations").size;
    const input = conversaciones
        .get(sizeConv - 2)
        .get("msg")
        .get(0);
      const output = conversaciones
        .get(sizeConv - 2)
        .get("msg")
        .get(0);
      const args = {
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
    sendLike(args, general);
  }

  render() {
    const { mainCss } = this.props;
    return (
      <div className={mainCss.Likes}>
        <p>¿Te sirvió esta respuesta?</p>
        <div className={mainCss.LikeDiv}>
          <button
            className={mainCss.Btn}
            onClick={this.sendLikeHandled}
            data-like={0}
          >
            No
            <i className="fas fa-thumbs-down" />
          </button>
          <button
            className={mainCss.Btn}
            onClick={this.sendLikeHandled}
            data-like={1}
          >
            Si
            <i className="fas fa-thumbs-up" />
          </button>
        </div>
      </div>
    );
  }
}

ConversationLikes.propTypes = {
  sendLike: PropTypes.func.isRequired,
  generalStates: PropTypes.any.isRequired,
  conversationsStates: PropTypes.any.isRequired,
  mainCss: PropTypes.any.isRequired
};
