import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputHelp extends Component {
  constructor(props) {
    super(props);
    this.button = React.createRef();
    this.toggleHelper = this.toggleHelper.bind(this);
  }
  desactivarIndex() {
    const { mainCss } = this.props,
      indexs = document.getElementsByClassName(mainCss.AssistantTitle);
    for (let i = 0; i < indexs.length; i++) {
      const index = indexs[i];
      index.classList.remove(mainCss.Active);
      index.nextElementSibling.classList.remove(mainCss.Active);
    }
  }
  toggleHelper(e) {
    //Ver si está deshabilitada para enviar mensaje
    const { mainCss } = this.props;
    if (!this.props.ayudaStates.get('enabled')) {
      const showWarning = this.props.ayudaStates.get('showWarning'),
        inTransitionWarning = this.state.inTransitionWarning;
      if (!showWarning) {
        if (!inTransitionWarning) {
          this.props.showWarningHelp();
          this.setState({ inTransitionWarning: true });
          setTimeout(() => {
            this.props.hideWarningHelp();
            this.setState({ inTransitionWarning: false });
          }, 3000);
        }
      }
    } else {
      this.desactivarIndex();
      if (this.props.ayudaStates.get('open')) {
        const divHelp = document.getElementsByClassName(mainCss.AssistantHelper)[0];
        divHelp.classList.remove(mainCss.Active);
        this.button.current.classList.remove(mainCss.Active);
        setTimeout(() => {
          this.props.closeHelp();
        }, 300);
      } else {
        this.button.current.classList.add(mainCss.Active);
        this.props.openHelp();
      }
    }
  }
  render() {
    const { mainCss, inputStates, help } = this.props,
      enabled = inputStates.get('enabledHelp');

    if (!help) {
      return null;
    }

    return (
      <button
        type='button'
        className={`${mainCss.InputUserBtn} ${mainCss.Btn} ${mainCss.BtnTransparent} ${enabled ? '' : mainCss.Disabled}`}
        onClick={this.toggleHelper}
        ref={this.button}
      >
        <i className={mainCss.IconHelp} />
      </button>
    );
  }
}

InputHelp.propTypes = {
  ayudaStates: PropTypes.any.isRequired,
  openHelp: PropTypes.func.isRequired,
  closeHelp: PropTypes.func.isRequired,
  showWarningHelp: PropTypes.func.isRequired,
  hideWarningHelp: PropTypes.func.isRequired,
  mainCss: PropTypes.any.isRequired,
  inputStates: PropTypes.object.isRequired,
};
