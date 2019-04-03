import React, { Component } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import ConversationCalendarInitial from "./conversation-calendar-initial";
import ConversationCalendarEnd from "./conversation-calendar-end";
import "../../assets/sass/datepicker.css";

export default class ConversationCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabledButton: true,
      initialValidate: true,
      endValidate: true
    }
    this.sendButtonresponse = this.sendButtonresponse.bind(this);
    this.divInputs = React.createRef();
    this.toggleButton = this.toggleButton.bind(this);
  }

  toggleButton(date){
    // Debe modificar el enabledButton y el valor de su input
    if(date.name==="initial"){
      if(date.validate && this.state.endValidate){
        this.setState({
          enabledButton: true,
          initialValidate:date.validate
        });
      }else{
        this.setState({
          enabledButton: false,
          initialValidate:date.validate
        });
      }
    }else{
      if(date.validate && this.state.initialValidate){
        this.setState({
          enabledButton: true,
          endValidate:date.validate
        });
      }else{
        this.setState({
          enabledButton: false,
          endValidate:date.validate
        });
      }
    }
  }

  sendButtonresponse(event) {
    let inputs = this.divInputs.current.getElementsByTagName("input"),
      msg = [];

    //recorrer y armar msg
    let fecha = { name: inputs[0].name, value: inputs[0].value };
    msg.push(fecha);
    if (inputs.length > 1) {
      msg.push({ name: inputs[1].name, value: inputs[1].value });
    }

    const { generalStates } = this.props,
      general = generalStates.toJS(),
      conversation = {
        general,
        msg: msg,
        send: "to",
        enabled: false
      },
      conversationUpdate = {
        datepicker: msg
      };

    this.props.updateConversationCalendar(conversationUpdate);
    this.props.updateConversation(conversation);
  }

  render() {
    const { animation, send, last, datepicker, mainCss } = this.props,
      cssClassDisabled = !this.state.enabledButton ? " "+mainCss.Disabled : "",
      dateInitial = datepicker.get(0),
      dateEnd = datepicker.get(1),
      cssClass = dateEnd !== undefined ? " " + mainCss.DoubleDate : " " + mainCss.SingleDate;
    let calendars = [];
    if (!last) {
      calendars.push(
        <div className={cssClass}key={0}>
          <DatePicker
            dateFormat="DD/MM/YYYY"
            selected={moment(dateInitial.get("value"), "DD/MM/YYYY")}
            className={mainCss.DatepickerCognitive}
            name={dateInitial.get("name")}
            disabled={true}
          />
        </div>
      );
      if (dateEnd !== undefined) {
        calendars.push(
          <div className={cssClass}key={1}>
            <DatePicker
              dateFormat="DD/MM/YYYY"
              selected={moment(dateEnd.get("value"), "DD/MM/YYYY")}
              className={mainCss.DatepickerCognitive}
              name={dateEnd.get("name")}
              disabled={true}
            />
          </div>
        );
      }
    } else {
      calendars.push(
        <div className={cssClass} key={2}>
          <label> Fecha inicial: </label>
          <ConversationCalendarInitial
            last={last}
            name={dateInitial.get("name")}
            date={dateInitial.get("value")}
            toggleButton={this.toggleButton}
            mainCss={mainCss}
          />
        </div>
      );
      if (dateEnd !== undefined) {
        calendars.push(
          <div className={cssClass} key={3}>
          <label> Fecha final: </label>
            <ConversationCalendarEnd
              last={last}
              name={dateEnd.get("name")}
              date={dateEnd.get("value")}
              mainCss={mainCss}
              toggleButton={this.toggleButton}
            />
          </div>
        );
      }
    }
    calendars.push(
      <div className={mainCss.MultiButtons} key={'multi-buttons'}>
        <button
          className={mainCss.Btn+" "+mainCss.BtnBig+" "+cssClassDisabled}
          onClick={this.sendButtonresponse}
        >
          Enviar
          <i className="fas fa-paper-plane" />
        </button>
      </div>
    );
    return (
      <div
        ref={this.divInputs}
        className={mainCss.ConversationBubble+" "+mainCss.Datepickers+" " + animation + send}
      >
        {calendars}
      </div>
    );
  }
}

ConversationCalendar.propTypes = {
  animation: PropTypes.string.isRequired,
  send: PropTypes.any.isRequired,
  colorHeader: PropTypes.string.isRequired,
  updateConversation: PropTypes.func.isRequired,
  updateConversationCalendar: PropTypes.func.isRequired,
  datepicker: PropTypes.any.isRequired,
  generalStates: PropTypes.any.isRequired,
  last: PropTypes.bool.isRequired,
  mainCss: PropTypes.any.isRequired
};
