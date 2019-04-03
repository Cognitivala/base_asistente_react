import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormFile extends Component {
  constructor(props) {
    super(props);
    this.attach = React.createRef();
    this.attachFile = this.attachFile.bind(this);
    this.attachIconClick = this.attachIconClick.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.state = {
      error: null,
      enabled: true
    };
  }

  deleteFile(i, event) {
    const { deleteFileForm } = this.props;
    deleteFileForm(i);
  }

  attachIconClick() {
    this.attach.current.click();
  }

  attachFile() {
    const size = this.attach.current.files[0].size,
      { attachFileForm, attach } = this.props;
    if (size > 0 && size <= attach.get("maxSize")) {
      const file = this.attach.current.files[0],
        type = file.type,
        types = attach.get("types");
      let valid = false;
      types.forEach(el => {
        if (el === type) valid = true;
      });
      if (valid) {
        let item = {};
        item.file = file;
        attachFileForm(item);
        this.setState({
          error: null,
          enabled: false
        });
      } else {
        this.setState({
          error: "No hay mano"
        });
      }
    } else {
      this.setState({
        error: "Excede el máximo permitido"
      });
    }
  }

  fillError() {
    if (this.state.error !== null) {
      const { mainCss } = this.props;
      return <p className={mainCss.Error}>{this.state.error}</p>;
    }
  }

  fillFiles(files) {
    let retorno = files.map((map, i) => {
      return (
        <li key={i}>
          <a target="_blank" rel="noopener noreferrer" href={map.get("url")}>
            {map.get("name")}
          </a>
          <i
            onClickCapture={this.deleteFile.bind(this, i)}
            className="fas fa-times"
          />
        </li>
      );
    });
    return <ul>{retorno}</ul>;
  }

  content() {
    const { type, name, formularioStates, mainCss } = this.props,
      files = formularioStates.get("files");
    let cssClass = this.state.error ? " "+mainCss.Error : "";
    if (files && files.size > 0) {
      return (
        <div>
          <input
            type={type}
            ref={this.attach}
            className="hide"
            name={name}
            onChange={this.attachFile}
          />
          <button
            disabled={this.state.enabled}
            type="button"
            onClick={this.attachIconClick}
            className={mainCss.Btn + " " + mainCss.BtnAttach+cssClass}
          >
            Adjuntar
            <i className="fas fa-paperclip" />
          </button>
          {this.fillFiles(files)}
        </div>
      );
    } else {
      return (
        <div>
          <input
            type={type}
            ref={this.attach}
            className={mainCss.Hide}
            name={name}
            onChange={this.attachFile}
          />
          <button
            type="button"
            onClick={this.attachIconClick}
            className={mainCss.Btn + " " + mainCss.BtnAttach+cssClass}
          >
            Adjuntar
            <i className="fas fa-paperclip" />
          </button>
        </div>
      );
    }
  }

  render() {
    return this.content();
  }
}

FormFile.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validateFunc: PropTypes.func.isRequired,
  validate: PropTypes.object,
  withError: PropTypes.bool,
  mainCss: PropTypes.object.isRequired,
};
