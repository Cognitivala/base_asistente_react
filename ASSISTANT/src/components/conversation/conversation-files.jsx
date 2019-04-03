import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ConversationFiles extends Component {

  content(files) {
    const { mainCss } = this.props;
    return files.map((map, i) => {
      let type = map.substring(map.length - 4, map.length);
      if (type === ".jpg" || type === ".gif" || type === "jpeg") {
        return (
          <div className={mainCss.BubbleFile+" "+mainCss.Img} key={i}>
            <a href={map} target="_blank" rel="noreferrer noopener">
              <img src={map} alt={"Respuesta"}/>
            </a>
          </div>
        );
      } else {
        return (
          <div className={mainCss.BubbleFile} key={i}>
            <a href={map} target="_blank" rel="noreferrer noopener">
              {map}
            </a>
            <i className="fas fa-paperclip" />
          </div>
        );
      }
    });
  }

  render() {
    const { files, animation, send, mainCss } = this.props;
      let bloqued = animation==="bloqued "?"":animation;
    return (
      <div className={mainCss.ConversationBubble+" " + bloqued + send}>
        {this.content(files)}
      </div>
    );
  }
}

ConversationFiles.propTypes = {
  files: PropTypes.any.isRequired,
  animation: PropTypes.string.isRequired,
  send: PropTypes.string.isRequired,
  mainCss: PropTypes.any.isRequired
};
