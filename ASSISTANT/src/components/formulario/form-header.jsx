import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        send: 'to',
        enabled: false,
      };
    this.props.closeForm(conversation);
  }

  content() {
    const { textA, textB, textStrong, mainCss } = this.props;

    return (
      <div className={mainCss.HeaderForm}>
        {/* <div className={mainCss.CloseForm}>
          <button type="button" data-msg={closeMsg} onClick={this.closeForm}>
            <i className="fas fa-times" data-msg={closeMsg} />
          </button>
        </div> */}
        <div className={mainCss.Icon}></div>
        <p>
          {textA !== undefined ? textA : null} <strong>{textStrong !== undefined ? textStrong : null}</strong> {textB !== undefined ? textB : null}
        </p>
      </div>
    );
  }

  render() {
    return this.content();
  }
}

FormHeader.propTypes = {
  // icon: PropTypes.string.isRequired,
  textA: PropTypes.string.isRequired,
  textB: PropTypes.string.isRequired,
  textStrong: PropTypes.string.isRequired,
  // closeMsg: PropTypes.string.isRequired,
  // colorHeader: PropTypes.string.isRequired,
  mainCss: PropTypes.object.isRequired,
};
