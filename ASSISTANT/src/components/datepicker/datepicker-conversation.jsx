import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import style from './style.scss';

export default class CalendarAssistant extends Component{
  constructor(props){
    super(props);

    this.sendAssistantMessage = this.sendAssistantMessage.bind(this);
  }
  sendAssistantMessage(date){
    const { generalStates } = this.props;
    const general = generalStates.toJS();
    const conversation = {
        general,
        msg: [date],
        send: "to",
        enabled: true
    };
    this.props.func(conversation);
  }
  getCalendarData(start, end){
    const startDate = moment(start),
          endDate = moment(end);
  
    let monthsData = [];
  
    while (endDate > startDate || startDate.format('M') === endDate.format('M')){
      monthsData.push(startDate.format('YYYY-MM'));
      startDate.add(1,'month');
    }
  
    return monthsData;
  }
  getMonthData(months){
    let monthData = [];

    months.forEach((month) => {
      const startDay = moment(month).clone().startOf('month').startOf('week'),
            endDay = moment(month).clone().endOf('month').endOf('week');

      let calendar = [];
      const index = startDay.clone();
      
      while (index.isBefore(endDay, 'day')) {
            calendar.push(
                new Array(7).fill(0).map(
                    (n, i) => {
                    const parsedDate = index.add(1, 'day').date();
                    return {
                        date: parsedDate,
                        dayName: moment(index).format('d'),
                        formatedDate: moment(index).format('YYYY-MM-DD'),
                        monthNumber: moment(index).format('MM'),
                        dateMoment: moment(index)
                    };
                    }
                )
            );
      }

      monthData.push({
        month: moment(month).format('MMM'),
        monthNumber: moment(month).format('MM'),
        year: moment(month).format('YYYY'),
        calendar
      });
    });

    return monthData;
  }
  getDays(week, monthNumber){
    const { days, assistantSettingsStates } = this.props
    return week.map((ew, index) => {
      const activeClass = days.includes(ew.formatedDate) ? 'active' : '';
      if(monthNumber === ew.monthNumber)
        return (
          <td 
            key={'td-'+ ew.formatedDate +'-'+ index} 
            className={ activeClass } 
            onClick={ () => {
              if(activeClass)
                this.sendAssistantMessage(ew.formatedDate)

              return;
            } } 
            style={ days.includes(ew.formatedDate) ? { borderBottom: '2px solid '+ '#4A90E2', color: '#4A90E2'  } : {} }>
              { ew.date }
          </td>
        );
      else
        return <td key={'td-'+ ew.formatedDate +'-'+ index}></td>;
    });
  }
  getCalendarDates(weeksData, monthNumber){
    return weeksData.map((week, index) => {
      const days= this.getDays(week, monthNumber);
      return (
        <tr key={'tr-'+ monthNumber +'-'+ index}>
          { days }
        </tr>  
      );
    });
  }
  getMonthsContent(monthData){
    return monthData.map((data) => {
      const dates = this.getCalendarDates(data.calendar, data.monthNumber);
      return (
        <div className="calendar-assistant-holder" key={ 'month-'+ data.monthNumber}>
          <div className="calendar-title-holder">
            <span className="calendar-assistant-title">{data.month +' '+ data.year}</span>
          </div>
          <div className="calendar-table-holder">
            <table className="calendar-assistant-table">
              <thead>
                <tr>
                  <th>Lun</th>
                  <th>Mar</th>
                  <th>Mie</th>
                  <th>Jue</th>
                  <th>Vie</th>
                  <th>Sab</th>
                  <th>Dom</th>
                </tr>
              </thead>  
              <tbody>
                { dates }
              </tbody>  
            </table>
          </div>
        </div>
      );
    });
  }
  render(){
    const { days, animation } = this.props;
     const startDay = days[0];
     const lastDay = days[days.length - 1];
     const months = this.getCalendarData(startDay, lastDay);
     const monthData = this.getMonthData(months);
     const monthsContent = this.getMonthsContent(monthData);

    return (
      <div className={"align-center"+ " "+ animation}>
        { monthsContent }
      </div>
    );
  }
}

CalendarAssistant.propTypes = {
  days: PropTypes.array,
  func: PropTypes.func,
  animation: PropTypes.string.isRequired,
}
