import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ConversationFiles extends Component {
  content(files, style) {
    return files.map((map, i) => {
      let type = map.substring(map.length - 4, map.length);
      if (type === ".jpg" || type === ".gif" || type === "jpeg") {
        return (
          <div style={style} className="bubble-file img" key={i}>
            <a href={map} target="_blank" rel="noopener noreferrer">
              <img src={map} alt={"Respuesta"}/>
            </a>
          </div>
        );
      } else {
        return (
          <div style={style} className="bubble-file" key={i}>
            <a href={map} target="_blank" rel="noopener noreferrer">
              {map}
            </a>
            <i className="fas fa-paperclip" />
          </div>
        );
      }
    });
  }

  render() {
    const { files, animation, send, colorHeader } = this.props,
      style = { backgroundColor: colorHeader };
      let bloqued = animation==="bloqued "?"":animation;
    return (
      <div className={"conversation-bubble " + bloqued + send}>
        {this.content(files, style)}
      </div>
    );
  }
}

ConversationFiles.propTypes = {
  files: PropTypes.any.isRequired,
  animation: PropTypes.string.isRequired,
  send: PropTypes.string.isRequired,
  colorHeader: PropTypes.string.isRequired
};
