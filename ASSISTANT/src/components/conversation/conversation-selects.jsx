import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      active: false
    };
    this.options = React.createRef();
    this.activeSelect = this.activeSelect.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  componentDidUpdate(){
    if(this.state.active){
      const scrollHeight = document.getElementsByClassName('conversation-holder')[0].scrollHeight;
      document.getElementsByClassName('conversation-holder')[0].scrollTop = scrollHeight;
    }
  }

  sendSelectResponse(event) {
    const $item = event.target,
      msg = $item.dataset.value;
    const { generalStates } = this.props,
      general = generalStates.toJS(),
      conversation = {
        general,
        msg: [msg],
        send: "to",
        enabled: false
      };
    this.props.updateConversation(conversation);
  }

  fillOptions(options) {
    return options.map((map, i) => {
      return <option value={map.get("value")}>{map.get("text")}</option>;
    });
  }

  activeSelect() {
    this.setState({
      active: !this.state.active
    });
  }

  setSelected(e) {
    let selected = e.target.dataset.value;
    this.options.current.dataset.valor = selected;
    this.sendSelectResponse(e);
    this.setState({
      selected,
      active: false
    });
  }

  fillOptionsShow(options) {
    let retorno = [];
    options.forEach((map,i) => {
      if (this.state.selected === map.get("value")) {
        retorno.push(
          <div
            key={i}
            data-value={map.get("value")}
            onClick={this.activeSelect}
          >
            {map.get("text")}
          </div>
        );
      }
    });
    options.forEach((map,i) => {
      if (this.state.selected === map.get("value") && map.get("value") !== -1) {
        // si esta seleccionado y no es el seleccione
        retorno.push(
          <div
            data-value={map.get("value")}
            key={i + map.get("text")}
            className="disabled"
          >
            {map.get("text")}
          </div>
        );
      } else if (map.get("value") === -1) {
        return null;
      } else {
        // si es otro
        retorno.push(
          <div
            data-value={map.get("value")}
            key={i + map.get("text")}
            onClick={this.setSelected}
          >
            {map.get("text")}
          </div>
        );
      }
    });
    return retorno;
  }

  content() {
    const { options, withError, animation, send } = this.props;
    let cssClass = this.state.active ? " active" : "",
      cssClassError = withError ? " error" : "";
    return (
      <div className={"conversation-bubble " + animation + send}>
        <div className="select">
          <div
            className={"options" + cssClass + cssClassError}
            ref={this.options}
          >
            {this.fillOptionsShow(options)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.content();
  }
}

FormSelect.ConversationSelects = {
  options: PropTypes.any.isRequired,
  animation: PropTypes.string.isRequired,
  send: PropTypes.string.isRequired,
  updateConversation: PropTypes.func.isRequired,
  generalStates: PropTypes.any.isRequired
};
