import 'rc-calendar/assets/index.css';
import React, { Component } from 'react';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import moment from 'moment';
import 'moment/locale/es';
import esES from 'rc-calendar/lib/locale/es_ES';

var inputDate;
var startInputDate;
moment.locale('es');

class datePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			day: [moment().add(-1, 'week'),moment()],
			show: true,
		};

		this.setRangeDay = this.setRangeDay.bind(this);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if(nextProps.interaction_rangeSelecte){
			this.setState({
				day: nextProps.interaction_rangeSelected,
			});
		}
		
	}

	setRangeDay(range) {
		if(range.target.value === ""){
			this.setState({
				day: [],
			});
		}
		if(range.target.value === "today"){
			this.setState({
				day: [moment(),moment()],
				show: false,
			}, () => {this.setState({show: true}) });
		}
		if(range.target.value === "yesterday"){
			this.setState({
				day: [moment().add(-1, 'days'),moment().add(-1, 'days')],
				show: false,
			}, () => {this.setState({show: true}) });

		}
		if(range.target.value === "lastWeek"){
			this.setState({
				day: [moment().add(-1, 'weeks').weekday(0),moment().add(-1, 'weeks').weekday(6)],
				show: false,
			}, () => {this.setState({show: true}) });
		}
		if(range.target.value === "lastMonth"){
			var date = new Date(), y = date.getFullYear(), m = date.getMonth();
			var firstDay = new Date(y, m, 1);
			var lastDay = new Date(y, m + 1, 1);
			firstDay = moment(firstDay);
			lastDay = moment(lastDay);
			this.setState({
				day: [firstDay.add(-1, 'months'),lastDay.add(-1, 'months').add(-1,'days')],
				show: false,
			}, () => {this.setState({show: true}) });
			
		}
		if(range.target.value === "lastSevenDays"){
			this.setState({
				day: [moment().add(-7, 'days'),moment()],
				show: false,
			}, () => {this.setState({show: true}) });
		}
		if(range.target.value === "lastThirtyDays"){
			this.setState({
				day: [moment().add(-30, 'days'),moment()],
				show: false,
			}, () => {this.setState({show: true}) });
		}
	}

	changeInterval(interval) {
		this.setState({
			day: interval,
		});
		document.getElementById("select").selectedIndex = 0; 
	}

	renderCalendar() {
		if(this.state.show)
			return(<RangeCalendar
				locale={esES}
				selectedValue={this.state.day}
				onSelect={this.changeInterval.bind(this)}
		/>);
	}

	aply() {
		this.props.updateRangeSelected(this.state.day);
		this.props.buttonFunction();
	}

	close() {
		this.props.buttonFunction();
	}

	findStartDate(event) {
		inputDate = moment(event.target.value).locale("es");
		if(inputDate.isValid()){
			this.setState({
				day: [inputDate,inputDate],
				show: false,
			}, () => {this.setState({show: true}) });
		}
	}

	findEndDate(event) {
		startInputDate = this.state.day[0];
		inputDate = moment(event.target.value);
		if(inputDate.isValid()){
			this.setState({
				day: [startInputDate,inputDate],
				show: false,
			}, () => {this.setState({show: true}) });
		}
	}

	showDate() {
		if(this.props.sizeDate === "long"){
			if(this.props.datePickerActivated) {
				return <div>
							<div>
								<button className="btn-datePicker-long" onClick={this.props.buttonFunction}>{this.state.day[0].format("DD")+" de "+this.state.day[0].format("MMM")} - {this.state.day[1].format("DD")+" de "+this.state.day[1].format("MMM")}<div className="arrow-active"></div></button>
							</div>
							<div className="div-modal" onClick={this.props.buttonFunction}></div>
							<div className="datePicker" style={{marginLeft: "-350px"}}>
								<div className="db-content-top">
									<label>Periodo</label>
									<div className="dp-period">
										<select id="select" onChange={this.setRangeDay} >
											<option value="" hidden>Personalizado</option>
											<option value="today">Hoy</option>
											<option value="yesterday">Ayer</option>
											<option value="lastWeek">La semana pasada</option>
											<option value="lastMonth">El mes pasado</option>
											<option value="lastSevenDays">Últimos 7 días</option>
											<option value="lastThirtyDays">Últimos 30 días</option>
										</select>
									</div>
								</div>
								<div style={{margin: "60px 0px 20px 0px", width: "100%", display: "block"}}>Para visualizar un periodo personalizado, seleccione una fecha de inicio y una de término, luego presione <strong>APLICAR</strong>.</div>
								<div className="db-content-datepicker">
									{this.renderCalendar()}
								</div>
								{
									/*
								}
								<input className="dp-input-period" onChange={this.findStartDate.bind(this)} value={this.state.day[0].format("YYYY-MM-DD")} placeholder={this.state.day[0].format("YYYY-MM-DD")}/>
								-
								<input className="dp-input-period" onChange={this.findEndDate.bind(this)} value={this.state.day[1].format("YYYY-MM-DD")} placeholder={this.state.day[0].format("YYYY-MM-DD")}/>
								
								<label>Comparar</label>
								<div className="checkbox">
									<input id="checkbox" type="checkbox" className="checkbox-old"/>
									<label htmlFor="checkbox"></label> 
								</div>
								
								<input className="dp-input-period" placeholder="6 marz. 2018"/>
								-
								<input className="dp-input-period" placeholder="15 marz. 2018"/>
								{
									*/
								}
								<input type="button" onClick={this.aply.bind(this)} className="btn-aply" value="APLICAR"/>
								<input type="button" onClick={this.close.bind(this)} className="btn-cancel" value="CANCELAR"/>
							</div>
						</div>
			}else{
				return <button className="btn-datePicker-long" onClick={this.props.buttonFunction}>{this.state.day[0].format("DD")+" de "+this.state.day[0].format("MMM")} - {this.state.day[1].format("DD")+" de "+this.state.day[1].format("MMM")}<div className="arrow"></div></button>
			}
		}else{
			if(this.props.datePickerActivated) {
				return <div>
						<div>
							<button className="btn-datePicker-short" onClick={this.props.buttonFunction}>{this.state.day[0].format("DD")+" de "+this.state.day[0].format("MMM")} - {this.state.day[1].format("DD")+" de "+this.state.day[1].format("MMM")}<div className="arrow-active"></div></button>
						</div>
						<div className="div-modal" onClick={this.props.buttonFunction}></div>
						<div className="datePicker" style={{left: '380px'}}>
							<div className="db-content-right">
								<label>Periodo</label>
								<div className="dp-period">
									<select id="select" onChange={this.setRangeDay} >
										<option value="" hidden>Personalizado</option>
										<option value="today">Hoy</option>
										<option value="yesterday">Ayer</option>
										<option value="lastWeek">La semana pasada</option>
										<option value="lastMonth">El mes pasado</option>
										<option value="lastSevenDays">Últimos 7 días</option>
										<option value="lastThirtyDays">Últimos 30 días</option>
									</select>
								</div>
								{this.renderCalendar()}
								{
									/*
								}
								<input className="dp-input-period" onChange={this.findStartDate.bind(this)} placeholder={this.state.day[0].format("DD MMMM YYYY")} placeholder={this.state.day[0].format("YYYY-MM-DD")}/>
								-
								<input className="dp-input-period" onChange={this.findEndDate.bind(this)} placeholder={this.state.day[1].format("DD MMMM YYYY")} placeholder={this.state.day[0].format("YYYY-MM-DD")}/>
								
								<label>Comparar</label> 
								<div className="checkbox">
									<input id="checkbox" type="checkbox" className="checkbox-old"/>
									<label htmlFor="checkbox"></label> 
								</div>
								
								<input className="dp-input-period" placeholder="6 marz. 2018"/>
								-
								<input className="dp-input-period" placeholder="15 marz. 2018"/>
								{
									*/
								}
								<input type="button" onClick={this.aply.bind(this)} className="btn-blue" value="APLICAR"/>
								<input type="button" onClick={this.close.bind(this)} className="btn-cancel" value="CANCELAR"/>
							</div>
						</div>
					</div>
			}else{
				return <button className="btn-datePicker-short" onClick={this.props.buttonFunction}>{this.state.day[0].format("DD")+" de "+this.state.day[0].format("MMM")} - {this.state.day[1].format("DD")+" de "+this.state.day[1].format("MMM")}<div className="arrow"></div></button>
			}
		}
	}

	render() {
		return(
			<div className="header-date">
				{this.showDate()}
			</div>
		);
	}
}

export default datePicker;