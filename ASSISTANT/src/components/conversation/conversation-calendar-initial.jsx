import React, { Component } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/sass/datepicker.css";

export default class ConversationCalendarInitial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(this.props.date, "DD/MM/YYYY")
    };
    this.date = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date,e) {
    this.setState({
      startDate: date
    });
    setTimeout(() => {      
      if(this.date.current.input.value.length===0){
        this.props.toggleButton({name:'initial',validate:false});
      }else{
        this.props.toggleButton({name:'initial',validate:true});
      }
    }, 31);
  }

  render() {
    const { name, last, mainCss } = this.props;
    return (
        <DatePicker
          dateFormat="DD/MM/YYYY"
          selected={this.state.startDate}
          onChange={this.handleChange.bind(this)}
          className={mainCss.DatepickerCognitive}
          name={name}
          disabled={!last}
          ref={this.date}
        />
    );
  }
}

ConversationCalendarInitial.propTypes = {
  last: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  toggleButton: PropTypes.func.isRequired,
  mainCss: PropTypes.any.isRequired
};
