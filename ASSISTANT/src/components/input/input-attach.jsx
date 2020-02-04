import React, { Component } from "react";
import PropTypes from "prop-types";

export default class InputAttach extends Component {
  constructor(props) {
    super(props);
    this.attach = React.createRef();
    this.attachFile = this.attachFile.bind(this);
    this.attachIconClick = this.attachIconClick.bind(this);
  }

  attachIconClick() {
    this.attach.current.click();
  }

  attachFile() {
    const size = this.attach.current.files[0].size;
    const { attachFile, generalStates } = this.props;
    
    if (size > 0) {
      const file = this.attach.current.files[0];
      console.log('attachFile:: ', file);
      // console.log(file.type)
      let item = {};
      item.file = file;
      item.general = generalStates.toJS();
      attachFile(item);
    }
  }

  render() {
    return (
      <button
        className="btn btn-rounded input-user-btn"
        type="button"
        onClick={this.attachIconClick}
      >
        <i className="fas fa-paperclip" />
        <input
          type="file"
          ref={this.attach}
          className="hide"
          onChange={this.attachFile}
        />
      </button>
    );
  }
}

InputAttach.propTypes = {
  generalStates: PropTypes.any.isRequired,
  attachFile: PropTypes.func.isRequired
};
