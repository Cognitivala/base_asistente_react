import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormHeader extends Component {
  constructor(props) {
    super(props);
    this.closeForm = this.closeForm.bind(this);
  }

  closeForm(e) {
    const { general } = this.props,
      msg = e.target.dataset.msg,
      conversation = {
        general,
        msg: [msg],
        send: "to",
        enabled: false
      };
    this.props.closeForm(conversation);
  }

  closeFill() {
    const { closeMsg } = this.props;
    if (closeMsg !== null) {
      return (
        <div className="close-form">
          <button type="button" data-msg={closeMsg} onClick={this.closeForm}>
            <i className="fas fa-times" data-msg={closeMsg} />
          </button>
        </div>
      );
    } else {
      return <React.Fragment/>;
    }
  }

  content() {
    const {
        icon,
        textA,
        textB,
        textStrong,
        colorHeader
      } = this.props,
      style = {
        backgroundColor: colorHeader
      };

    return (
      <div className="header" style={style}>
        {this.closeFill()}
        <div className="icon">
          <i className={icon !== undefined ? icon : null} />
        </div>
        <p>
          {textA !== undefined ? textA : null}{" "}
          <strong>{textStrong !== undefined ? textStrong : null}</strong>{" "}
          {textB !== undefined ? textB : null}
        </p>
      </div>
    );
  }

  render() {
    return this.content();
  }
}

FormHeader.propTypes = {
  icon: PropTypes.string.isRequired,
  textA: PropTypes.string.isRequired,
  textB: PropTypes.string.isRequired,
  textStrong: PropTypes.string.isRequired,
  closeMsg: PropTypes.string.isRequired,
  colorHeader: PropTypes.string.isRequired
};
