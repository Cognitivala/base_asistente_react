import React, { Component } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

export default class ConversationCalendarEnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(this.props.date, "DD/MM/YYYY")
    };
    this.date = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date , e) {
    this.setState({
      startDate: date
    });
    setTimeout(() => {      
      if(this.date.current.input.value.length===0){
        this.props.toggleButton({name:'end',validate:false});
      }else{
        this.props.toggleButton({name:'end',validate:true});
      }
    }, 31);
  }

  render() {
    const { last, name } = this.props;
    return (
      <DatePicker
        dateFormat="DD/MM/YYYY"
        selected={this.state.startDate}
        onChange={this.handleChange.bind(this)}
        className="datepicker-cognitive"
        name={name}
        ref={this.date}
        disabled={!last}
        popperPlacement="top-start"
        popperModifiers={{
          flip: {
            enabled: false
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false
          }
        }}
      />
    );
  }
}

ConversationCalendarEnd.propTypes = {
  last: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  toggleButton: PropTypes.func.isRequired
};
