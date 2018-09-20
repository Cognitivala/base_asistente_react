import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ConversationAttach extends Component {
  constructor(props) {
    super(props);
    this.attach = React.createRef();
    this.attachFile = this.attachFile.bind(this);
    this.attachIconClick = this.attachIconClick.bind(this);
    this.state = {
        error: null
    }
  }

  attachIconClick() {
    this.attach.current.click();
  }

  attachFile() {
    debugger
    const size = this.attach.current.files[0].size,
      { attachFile, generalStates, attach } = this.props;
    if (size > 0 && size <= attach.get('maxSize')) {
      const file = this.attach.current.files[0],
        type = file.type,
        types = attach.get('types');
      let valid = false;
      types.forEach(el => {
        if (el === type) valid = true;
      });
      if (valid) {
        let item = {};
        item.file = file;
        item.general = generalStates.toJS();
        attachFile(item);
        this.setState({
            error: null
        });
      }else{
          this.setState({
              error: "No hay mano"
          });
      }
    }else{
        this.setState({
            error: "Excede el máximo permitido"
        });
    }
  }

  fillError() {
      if(this.state.error!==null){
        return <p className="error">{this.state.error}</p>
      }
  }

  render() {
    const { animation, send, colorHeader } = this.props,
      style = { backgroundColor: colorHeader };
    return (
      <div className={"conversation-bubble attach " + animation + send}>
        <button
          className="btn btn-attach"
          type="button"
          onClick={this.attachIconClick}
          style={style}
        >
        Adjuntar
          <i className="fas fa-paperclip" />
          <input
            type="file"
            ref={this.attach}
            className="hide"
            onChange={this.attachFile}
          />
        </button>
        {this.fillError()}
      </div>
    );
  }
}

ConversationAttach.propTypes = {
  attach: PropTypes.any.isRequired,
  attachFile: PropTypes.func.isRequired,
  animation: PropTypes.string.isRequired,
  send: PropTypes.string.isRequired,
  colorHeader: PropTypes.string.isRequired,
  generalStates: PropTypes.any.isRequired
};
