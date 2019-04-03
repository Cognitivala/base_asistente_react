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
    const { disabledHelp, enabledHelp } = this.props;

    if(!this.state.enableEmoji){
      disabledHelp();
    }else if(this.state.enableEmoji) {
      enabledHelp();
    }
    if (this.props.moreHeader) {
      this.props.toggleHeaderMore(false);
    }
    this.setState({
      enableEmoji: !this.state.enableEmoji
    });
  }

  selectEmoji(emoji) {
    const { start, end, mainCss } = this.props,
      emojiIcon = emoji.native,
      input = document.getElementsByClassName(mainCss.InputUser)[0],
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
      if(input !== null){
        input.click();
        input.focus();
      }
    }, 300);
  }

  render() {
    const { mainCss, responsiveStates } = this.props;
    if (!this.state.enableEmoji) {
      return (
        <button
          className={mainCss.InputUserBtn + " " + mainCss.Btn+ " " + mainCss.BtnTransparent+ " " + mainCss.Emoji}
          type="button"
          onClick={this.toggleEmoji}
        >
          <i className={mainCss.IconEmoji} />
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
      },
      responsive = responsiveStates.get("responsive"),
      style = {
        position: "absolute",
        bottom: responsive==="mobile"?"5.6rem":"13.6rem",
        left: "0px",
        width: "90%",
        marginLeft: "5%",
        animationName: mainCss.inAssistant,
        animationDuration:"0.3s",
        animationTimingFunction: "linear"
      };
      return (
        <React.Fragment>
          <Picker
            onSelect={this.selectEmoji}
            style={style}
            showPreview={false}
            showSkinTones={false}
            i18n={i18n}
          />
          <button
            className={mainCss.InputUserBtn + " " + mainCss.Btn+ " " + mainCss.BtnTransparent + " " + mainCss.Active+ " " + mainCss.Emoji}
            type="button"
            onClick={this.toggleEmoji}
          >
            <i className={mainCss.IconEmoji} />
          </button>
        </React.Fragment>
      );
    }
  }
}

InputEmoji.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired
};
