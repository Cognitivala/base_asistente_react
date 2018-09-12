import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormFile extends Component {
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
      debugger
    this.attach.current.click();
  }

  attachFile() {
    debugger
    const size = this.attach.current.files[0].size,
      { attachFile, general, attach } = this.props;
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
        item.general = general.toJS();
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

  content() {
    const { type, name, colorHeader } = this.props,
    style = { backgroundColor: colorHeader };
    let cssClass = this.state.error?" error":"";
    return (
        <button
        className="btn btn-attach"
        type="button"
        onClick={this.attachIconClick}
        style={style}
        className={cssClass}
      >
      Adjuntar
        <i className="fas fa-paperclip" />
        <input
          type={type}
          ref={this.attach}
          className="hide"
          name={name}
          onChange={this.attachFile}
        />
      </button>
    );
  }

  render() {
    return this.content();
  }
}

FormFile.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  autocomplete: PropTypes.string.isRequired,
  validateFunc: PropTypes.func.isRequired,
  validate: PropTypes.object,
  withError: PropTypes.bool
};
