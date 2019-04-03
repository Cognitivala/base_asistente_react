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
    const { mainCss } = this.props;
    if(this.state.error!==null){
      return <p className={mainCss.Error}>{this.state.error}</p>
    }
  }

  render() {
    const { animation, send, mainCss } = this.props;
    return (
      <div className={mainCss.ConversationBubble + " " + mainCss.Attach+" " + animation + send}>
        <button
          className={mainCss.Btn + " " + mainCss.BtnAttach}
          type="button"
          onClick={this.attachIconClick}
        >
        Adjuntar
          <i className="fas fa-paperclip" />
          <input
            type="file"
            ref={this.attach}
            className={mainCss.Hide}
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
  generalStates: PropTypes.any.isRequired,
  mainCss: PropTypes.any.isRequired
};
