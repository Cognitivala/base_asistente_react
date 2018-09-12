import React, { Component } from "react";
import PropTypes from "prop-types";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export default class InputEmoji extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableEmoji: false
    };
    this.toggleEmoji = this.toggleEmoji.bind(this);
    this.selectEmoji = this.selectEmoji.bind(this);
  }

  toggleEmoji() {
    this.setState({
      enableEmoji: !this.state.enableEmoji
    });
  }

  selectEmoji(emoji) {
    const { start, end } = this.props,
      emojiIcon = emoji.native,
      input = document.getElementsByClassName("input-user")[0],
      value = input.value,
      startStr = value.substring(0, start),
      endStr = value.substring(start, value.length);
    if (start === end) {
      input.value = startStr + emojiIcon + endStr;
    } else {
      const endStrB = value.substring(end, value.length);
      input.value = startStr + emojiIcon + endStrB;
    }
    this.setState({
      enableEmoji: !this.state.enableEmoji
    });
    setTimeout(() => {
      input !== null ? input.click() : null;
      input !== null ? input.focus() : null;
    }, 300);
  }

  render() {
    if (!this.state.enableEmoji) {
      return (
        <button
          className="btn btn-rounded input-user-btn"
          type="button"
          onClick={this.toggleEmoji}
        >
          <i className="far fa-smile" />
        </button>
      );
    } else {
      const i18n = {
        search: "Buscar",
        notfound: "Emoji no encontrado",
        skintext: "Escoge tu skin por default",
        categories: {
          search: "Resultados",
          recent: "Frecuentes",
          people: "Sonrisas y personas",
          nature: "Animales y natural",
          foods: "Comida y trago",
          activity: "Actividad",
          places: "Viajes y Lugares",
          objects: "Objetos",
          symbols: "Símbolos",
          flags: "Banderas",
          custom: "Personalizado"
        }
      };
      return (
        <div>
          <Picker
            onSelect={this.selectEmoji}
            style={{
              position: "absolute",
              bottom: "50px",
              left: "0px",
              width: "90%",
              marginLeft: "5%"
            }}
            showPreview={false}
            showSkinTones={false}
            i18n={i18n}
          />
          <button
            className="btn btn-rounded input-user-btn active emoji"
            type="button"
            onClick={this.toggleEmoji}
          >
            <i className="far fa-smile" />
          </button>
        </div>
      );
    }
  }
}

// InputEmoji.propTypes = {
//   generalStates: PropTypes.any.isRequired,
//   attachFile: PropTypes.func.isRequired
// };
