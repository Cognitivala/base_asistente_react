import React, { Component } from 'react';
import Box from './box';
import TopicsTable from './topicsTable';
import AverageTime from './averageTime';
import Valuation from './valuation';
import Answers from './answers';
import LineChart from './lineChart';
import DatePicker from './datePicker';
import ValuationBySesions from './valuationBySesions';
import CheckOptions from './checkOptions';
import moment from 'moment';

export default class home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			interaction_datePickerActivated: false,
			interaction_percentColor: ["#A189DF", "#BFACFF"],
			interaction_range: "day",
			interaction_rangeSelected: [moment().add(-1, 'week'), moment()],

			average_datePickerActivated: false,
			average_color: ["#FD6F4B", "#FFAC9A"],
			average_timeLastMonth: "00:18:05",
			average_timePrevMonth: "00:16:03",
			average_rangeSelected: [moment().add(-7, 'days'), moment()],

			answers_datePickerActivated: false,
			answers_rangeSelected: [moment().add(-7, 'days'), moment()],
			answers_percentColor: [
				{ accepted: ["#FB4166", "#FE6584"] },
				{ notAccepted: ["#086BE5", "#4C91F5"] }
			],

			topics_rangeSelected: [moment().add(-7, 'days'), moment()],
			topics_datePickerActivated: false,
			topics_loading: false,

			valuation_filterShortName: [],
			valuation_datePickerActivated: false,
			valuation_content: "valuation",
			valuation_title: <p className="title-valuation-short"><strong>VALORACIÓN</strong></p>,
			valuation_rangeSelected: [moment().add(-7, 'days'), moment()],

			detalles_datePickerActivated: false,
			detalles_percentColor: ["#A189DF", "#BFACFF"],
			detalles_range: "day",
			detalles_rangeSelected: [moment().add(-1, 'week'), moment()],
		};

		this.changeContentValuation = this.changeContentValuation.bind(this);
		this.interactionDatePickerActivated = this.interactionDatePickerActivated.bind(this);
		this.timeDatePickerActivated = this.timeDatePickerActivated.bind(this);
		this.assessmentDatePickerActivated = this.assessmentDatePickerActivated.bind(this);
		this.answersDatePickerActivated = this.answersDatePickerActivated.bind(this);
		this.updateFilterState = this.updateFilterState.bind(this);
		this.detallesDatePickerActivated = this.detallesDatePickerActivated.bind(this);
		this.updateDetallesRangeSelected = this.updateDetallesRangeSelected.bind(this);
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.categories && !this.props.categories) {
			var filters = nextProps.categories.map((category) => { return category.abreviatura });
			this.setState({ valuation_filterShortName: filters });
		}
	}
	interactionDatePickerActivated() {
		this.setState({
			interaction_datePickerActivated: !this.state.interaction_datePickerActivated,
			average_datePickerActivated: false,
			valuation_datePickerActivated: false,
			answers_datePickerActivated: false,
			topics_datePickerActivated: false,
		});
	}
	timeDatePickerActivated() {
		this.setState({
			interaction_datePickerActivated: false,
			average_datePickerActivated: !this.state.average_datePickerActivated,
			valuation_datePickerActivated: false,
			answers_datePickerActivated: false,
			topics_datePickerActivated: false,
		});
	}
	assessmentDatePickerActivated() {
		this.setState({
			interaction_datePickerActivated: false,
			average_datePickerActivated: false,
			valuation_datePickerActivated: !this.state.valuation_datePickerActivated,
			answers_datePickerActivated: false,
			topics_datePickerActivated: false,
		});
	}
	answersDatePickerActivated() {
		this.setState({
			interaction_datePickerActivated: false,
			average_datePickerActivated: false,
			valuation_datePickerActivated: false,
			answers_datePickerActivated: !this.state.answers_datePickerActivated,
			topics_datePickerActivated: false,
		});
	}
	topicsDatePickerActivated() {
		this.setState({
			interaction_datePickerActivated: false,
			average_datePickerActivated: false,
			valuation_datePickerActivated: false,
			answers_datePickerActivated: false,
			topics_datePickerActivated: !this.state.topics_datePickerActivated,
		});
	}
	detallesDatePickerActivated() {
		this.setState({
			detalles_datePickerActivated: !this.state.detalles_datePickerActivated,
			average_datePickerActivated: false,
			valuation_datePickerActivated: false,
			answers_datePickerActivated: false,
			topics_datePickerActivated: false,
		});
	}
	showContentValuation(valuation, sesion) {

		if (this.state.valuation_content === "sesion") {
			return <ValuationBySesions
				data={sesion}
			/>
		}
		if (this.state.valuation_content === "valuation") {
			return <Valuation
				data={valuation}
			/>
		}
	}
	changeContentValuation() {
		if (this.state.valuation_content === "valuation") {
			this.setState({
				valuation_content: "sesion",
			});
		}
		if (this.state.valuation_content === "sesion") {
			this.setState({
				valuation_content: "valuation",
			});
		}
	}
	updateFilterState(categories) {

		this.setState({
			valuation_filterShortName: categories
		});
	}
	changeXAxesLineChart(range) {
		this.setState({
			detalles_range: range
		}, () => {
			if (range === "hour") {

			}
			if (range === "day") {
				this.props.getTotalInteractions(this.state.interaction_rangeSelected[0].format("YYYY-MM-DD"), this.state.interaction_rangeSelected[1].format("YYYY-MM-DD"), "day");
			}
			if (range === "week") {
				this.props.getTotalInteractions(this.state.interaction_rangeSelected[0].format("YYYY-MM-DD"), this.state.interaction_rangeSelected[1].format("YYYY-MM-DD"), "week");
			}
			if (range === "month") {
				this.props.getTotalInteractions(this.state.interaction_rangeSelected[0].format("YYYY-MM-DD"), this.state.interaction_rangeSelected[1].format("YYYY-MM-DD"), "month");
			}
		});
	}
	changeXAxesAverage(range) {
		this.setState({
			average_rangeSelected: range
		}, () => {
			this.props.getAverageOperationalTime(this.state.average_rangeSelected[0].format("YYYY-MM-DD"), this.state.average_rangeSelected[1].format("YYYY-MM-DD"));
		}
		);
	}
	changeXAxesAnswers(range) {
		this.setState({
			answers_rangeSelected: range
		}, () => {
			this.props.getAssertiveness(this.state.answers_rangeSelected[0].format("YYYY-MM-DD"), this.state.answers_rangeSelected[1].format("YYYY-MM-DD"));
		}
		);
	}
	changeXAxesValuations(range) {
		this.setState({
			valuation_rangeSelected: range
		}, () => {
			this.props.getValuations(this.state.valuation_rangeSelected[0].format("YYYY-MM-DD"), this.state.valuation_rangeSelected[1].format("YYYY-MM-DD"));
		}
		);
	}
	changeDetailsReports(range) {
		this.setState({
			detalles_range: range
		}, () => {
			if (range === "hour") {

			}
			if (range === "day") {
				this.props.getDetailSesiones(this.state.detalles_rangeSelected[0].format("YYYY-MM-DD"), this.state.detalles_rangeSelected[1].format("YYYY-MM-DD"), "day");
				this.props.getDetailInteractions(this.state.detalles_rangeSelected[0].format("YYYY-MM-DD"), this.state.detalles_rangeSelected[1].format("YYYY-MM-DD"), "day");
			}
			if (range === "week") {
				this.props.getDetailSesiones(this.state.detalles_rangeSelected[0].format("YYYY-MM-DD"), this.state.detalles_rangeSelected[1].format("YYYY-MM-DD"), "week");
				this.props.getDetailInteractions(this.state.detalles_rangeSelected[0].format("YYYY-MM-DD"), this.state.detalles_rangeSelected[1].format("YYYY-MM-DD"), "week");
			}
			if (range === "month") {
				this.props.getDetailSesiones(this.state.detalles_rangeSelected[0].format("YYYY-MM-DD"), this.state.detalles_rangeSelected[1].format("YYYY-MM-DD"), "month");
				this.props.getDetailInteractions(this.state.detalles_rangeSelected[0].format("YYYY-MM-DD"), this.state.detalles_rangeSelected[1].format("YYYY-MM-DD"), "month");
			}
		});
	}
	updateInteractionRangeSelected(range) {
		this.setState({
			interaction_rangeSelected: range
		}, () => {
			this.changeXAxesLineChart(this.state.interaction_range);
		}
		);
	}
	updateAverageRangeSelected(range) {
		this.setState({
			average_rangeSelected: range
		}, () => {
			this.changeXAxesAverage(this.state.average_rangeSelected);
		}
		);
	}
	updateValuationRangeSelected(range) {
		this.setState({
			valuation_rangeSelected: range
		}, () => {
			this.changeXAxesValuations(this.state.valuation_rangeSelected);
		}
		);
	}
	updateAnswersRangeSelected(range) {
		this.setState({
			answers_rangeSelected: range
		}, () => {
			this.changeXAxesAnswers(this.state.answers_rangeSelected);
		}
		);
	}
	updateTopicsRangeSelected(range) {
		this.setState({
			topics_rangeSelected: range
		}, () => {
			this.props.getFAQ(this.state.topics_rangeSelected[0].format("YYYY-MM-DD"), this.state.topics_rangeSelected[1].format("YYYY-MM-DD"));
		}
		);
	}
	updateDetallesRangeSelected(range) {
		this.setState({
			detalles_rangeSelected: range
		}, () => {
			this.changeDetailsReports(this.state.detalles_range);
		}
		);
	}
	renderDownloadButton(csv, filename, title, css) {
		if (!csv) return null;
		return (
			<a href={"data:application/octet-stream," + encodeURI(csv)} download={filename}>
				<button className={"btn-download "+css}>
					<img className="btn-dwn-img" src="/assets/img/download.png" alt="" />
					{title}
				</button>
			</a>
		);
	}
	descargar(csv,url,func,title,e){
		const link = e.target.parentNode.children[1],
		_this = this;
		func(this.state.detalles_range);
		setTimeout(()=>{
			if(title==="DETALLE SESIONES"){
				link.href = url + encodeURI(_this.props.detailSesionesGraph.csv);
			}else if(title==="DETALLE INTERACCIONES"){
				link.href = url + encodeURI(_this.props.detailInteractionsGraph.csv);
			}
			link.click();
		},1200)
	}
	renderDownloadButtonRefresh(csv,filename,title,css,func){
		if (!csv) return null;
		return (
			<div>
				<button className={"btn-download "+css} onClick={this.descargar.bind(this,csv,"data:application/octet-stream," ,func,title)}>
					<img className="btn-dwn-img" src="/assets/img/download.png" alt="" />
					{title}
				</button>
				<a href={"data:application/octet-stream," + encodeURI(csv)} download={filename}>
				</a>
			</div>
		);
	}
	render() {


		var AnswersDataConf = {
			display: false,
			labels: this.props.assertivenessGraph ? this.props.assertivenessGraph.data.labels : [],
			datasets: [
				{
					label: "1",
					type: 'bar',
					backgroundColor: '#4897F6',
					data: this.props.assertivenessGraph ? this.props.assertivenessGraph.data.values : []
				},
				{
					label: "2",
					type: 'bar',
					backgroundColor: '#FA4065',
					data: this.props.assertivenessGraph ? this.props.assertivenessGraph.data.values2 : []
				}
			]
		}

		var averageDataConf = {
			display: false,
			labels: this.props.averageOperationalTimeGraph ? this.props.averageOperationalTimeGraph.data.labels : [],
			datasets: [
				{
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(251,112,66,1)',
					borderColor: 'rgba(251,112,66,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(251,112,66,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 7,
					pointHoverRadius: 6,
					pointHoverBackgroundColor: 'rgba(251,112,66,1)',
					pointHoverBorderColor: 'rgba(251,112,66,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: this.props.averageOperationalTimeGraph ? this.props.averageOperationalTimeGraph.data.values : []
				}
			]
		}
		var interactionDataConf = {
			display: false,
			labels: this.props.interactionsGraph ? this.props.interactionsGraph.data.labels : [],
			//labels: ['30 Abr - 6 May', '7 May - 13 May', '14 May - 20 May', '21 May - 27 May', '28 May - 3 Jun'],
			datasets: [
				{
					label: "1",
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(156,133,224,1)',
					borderColor: 'rgba(156,133,224,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(156,133,224,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 7,
					pointHoverRadius: 6,
					pointHoverBackgroundColor: 'rgba(156,133,224,1)',
					pointHoverBorderColor: 'rgba(156,133,224,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: this.props.interactionsGraph ? this.props.interactionsGraph.data.values : [],
				},
				{
					label: "2",
					fill: false,
					lineTension: 0.1,
					backgroundColor: '#ffb735',
					borderColor: '#ffb735',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: '#ffb735',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 7,
					pointHoverRadius: 6,
					pointHoverBackgroundColor: '#ffb735',
					pointHoverBorderColor: '#ffb735',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: this.props.interactionsGraph ? this.props.interactionsGraph.data.sesiones : [],
				}]
		};

		var valuationDataConf = {
			display: false,
			labels: this.props.valuationsGraph ? this.props.valuationsGraph.data.labels : [],
			datasets: [
				{
					label: "1",
					type: 'line',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(76,196,205,1)',
					borderColor: 'rgba(76,196,205,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'white',
					pointBackgroundColor: 'rgba(76,196,205,1)',
					pointBorderWidth: 1,
					pointHoverRadius: 7,
					pointHoverBackgroundColor: 'rgba(76,196,205,1)',
					pointHoverBorderColor: 'rgba(76,196,205,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 5,
					yAxisID: 'y-axis-2',
					data: this.props.valuationsGraph ? this.props.valuationsGraph.data.nps : [],
				},
				{
					label: "2",
					type: 'bar',
					backgroundColor: 'rgba(234,50,77,1)',
					yAxisID: 'y-axis-1',
					data: this.props.valuationsGraph ? this.props.valuationsGraph.data.detractores : []
				},
				{
					label: "3",
					type: 'bar',
					backgroundColor: 'rgba(255,221,0,1)',
					yAxisID: 'y-axis-1',
					data: this.props.valuationsGraph ? this.props.valuationsGraph.data.neutros : []
				},
				{
					label: "4",
					type: 'bar',
					backgroundColor: 'rgba(120,207,53,1)',
					yAxisID: 'y-axis-1',
					data: this.props.valuationsGraph ? this.props.valuationsGraph.data.promotores : []
				}
			]
		}

		var sesionsDataConf = {
			display: false,
			labels: this.props.sessionsGraph ? this.props.sessionsGraph.data.labels : [],
			datasets: [
				{
					label: "1",
					type: 'line',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(76,196,205,1)',
					borderColor: 'rgba(76,196,205,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'white',
					pointBackgroundColor: 'rgba(76,196,205,1)',
					pointBorderWidth: 1,
					pointHoverRadius: 7,
					pointHoverBackgroundColor: 'rgba(76,196,205,1)',
					pointHoverBorderColor: 'rgba(76,196,205,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 5,
					yAxisID: 'y-axis-2',
					data: this.props.sessionsGraph ? this.props.sessionsGraph.data.nps : [],
				},
				{
					label: "2",
					type: 'bar',
					backgroundColor: 'rgba(234,50,77,1)',
					yAxisID: 'y-axis-1',
					data: this.props.sessionsGraph ? this.props.sessionsGraph.data.detractores : []
				},
				{
					label: "3",
					type: 'bar',
					backgroundColor: 'rgba(255,221,0,1)',
					yAxisID: 'y-axis-1',
					data: this.props.sessionsGraph ? this.props.sessionsGraph.data.neutros : []
				},
				{
					label: "4",
					type: 'bar',
					backgroundColor: 'rgba(120,207,53,1)',
					yAxisID: 'y-axis-1',
					data: this.props.sessionsGraph ? this.props.sessionsGraph.data.promotores : []
				}
			]
		}

		var topicsData = this.props.faqGraph ? this.props.faqGraph.data : null;

		return (
			<div>
				<h4>INDICADORES</h4>
				<Box
					datePicker={"date"}
					content="bar"
					loading={this.props.detailsLoading}
				>
					<div className="box-hd-flex-between">
						<p className="box-title mt-0 mb-0">REPORTES GENERALES<strong></strong></p>
						<div className="box-hd-flex" id="date-reports">
							<DatePicker
								datePickerActivated={this.state.detalles_datePickerActivated}
								buttonFunction={this.detallesDatePickerActivated.bind(this)}
								sizeDate="long"
								updateRangeSelected={this.updateDetallesRangeSelected.bind(this)}
							/>
							{this.renderDownloadButtonRefresh(this.props.detailSesionesGraph ? this.props.detailSesionesGraph.csv : null, "detalle-sesiones.csv", "DETALLE SESIONES",'mr-0',this.changeDetailsReports.bind(this))}
							{this.renderDownloadButtonRefresh(this.props.detailInteractionsGraph ? this.props.detailInteractionsGraph.csv : null, "detalle-interacciones.csv", "DETALLE INTERACCIONES",'',this.changeDetailsReports.bind(this))}
						</div>
					</div>
				</Box>
				<Box
					datePicker={"date"}
					content="bar"
					loading={this.props.interactionsLoading}
				>
					<div className="box-hd-tt">
						<p className="box-title">NÚMERO DE <strong>INTERACCIONES TOTALES</strong></p>
					</div>
					<div className="box-hd-dp">
						<DatePicker
							datePickerActivated={this.state.interaction_datePickerActivated}
							buttonFunction={this.interactionDatePickerActivated.bind(this)}
							sizeDate="long"
							updateRangeSelected={this.updateInteractionRangeSelected.bind(this)}
						/>
					</div>
					
					<LineChart
						data={interactionDataConf}
						changeXAxes={this.changeXAxesLineChart.bind(this)}
						showCharPer={this.state.interaction_range}
						percentColor={this.state.interaction_percentColor}
						percentageLastMonth={this.props.interactionsVariation ? this.props.interactionsVariation.lastMonth : "-"}
						percentagePrevMonth={this.props.interactionsVariation ? this.props.interactionsVariation.lastLastMonth : "-"}
						getTotalInteractions={this.props.getTotalInteractions}
						interaction_rangeSelected={this.state.interaction_rangeSelected}
					/>
					<div className="box-footer">
						{this.renderDownloadButton(this.props.interactionsGraph ? this.props.interactionsGraph.csv : null, "interacciones.csv", "DESCARGAR")}
					</div>
				</Box>
				<Box
					datePicker={"topics"}
					content="table"
					loading={this.props.faqLoading}
				>
					<div className="box-hd-tt">
						<p className="box-title"><strong>PREGUNTAS</strong> MÁS <strong>FRECUENTES</strong></p>
					</div>
					<div className="box-hd-dp">
						{/* <div className="filterPer">
							<label style={{color: '#A4A4A4', fontSize: '11px'}}>FILTRAR POR</label>
							<CheckOptions
							filterList={this.props.categories}
							updateFilterState={this.updateFilterState.bind(this)}
							/>
						</div> */}
						<DatePicker
							datePickerActivated={this.state.topics_datePickerActivated}
							buttonFunction={this.topicsDatePickerActivated.bind(this)}
							sizeDate="long"
							updateRangeSelected={this.updateTopicsRangeSelected.bind(this)}
						/>
					</div>
					<TopicsTable
						data={topicsData}
						filterState={this.state.valuation_filterShortName}
					/>
					<div className="box-footer">
						{this.renderDownloadButton(this.props.faqGraph ? this.props.faqGraph.csv : null, "preguntas_frecuentes.csv", "DESCARGAR")}
					</div>
				</Box>
				<Box
					datePicker={"date"}
					content="time"
					loading={this.props.averageOperationalTimeLoading}
				>
					<div className="box-hd-tt">
						<p className="box-title"><strong>TIEMPO PROMEDIO</strong> POR <strong>SESIÓN</strong></p>
					</div>
					<div className="box-hd-dp">
						<DatePicker
							datePickerActivated={this.state.average_datePickerActivated}
							buttonFunction={this.timeDatePickerActivated.bind(this)}
							sizeDate="long"
							updateRangeSelected={this.updateAverageRangeSelected.bind(this)}
						/>
					</div>
					<AverageTime
						data={averageDataConf}
						color={this.state.average_color}
						averageTimeLastMonth={this.props.averageOperationalTimeVariation ? this.props.averageOperationalTimeVariation.lastMonth : 0}
						averageTimePrevMonth={this.props.averageOperationalTimeVariation ? this.props.averageOperationalTimeVariation.lastLastMonth : 0}
					/>
					<div className="box-footer">
						{this.renderDownloadButton(this.props.averageOperationalTimeGraph ? this.props.averageOperationalTimeGraph.csv : null, "tiempo_promedio.csv", "DESCARGAR")}
					</div>
				</Box>
				<Box
					datePicker={"valuation"}
					content="valuation"
					loading={this.props.valuationsLoading}
				>
					<div className="valuation-header">
						<div className="box-hd-tt">
							<p className="title-valuation-long"><strong>VALORACIÓN</strong> DE <strong>ENCUESTAS</strong></p>
						</div>
						<div className="valuationHeader-right">
							<div className="valuation-select">
								<label style={{ color: '#A4A4A4', fontSize: '11px', marginTop: "5px" }}>DESGLOSAR POR </label>
								<div className="valuationPer">
									<select onChange={this.changeContentValuation}>
										<option value="valuation">Porcentaje de Usuarios</option>
										<option value="sesion">Cantidad de Usuarios</option>
									</select>
								</div>
							</div>
							<div className="valuation-date">
								<DatePicker
									datePickerActivated={this.state.valuation_datePickerActivated}
									buttonFunction={this.assessmentDatePickerActivated.bind(this)}
									sizeDate={"long"}
									updateRangeSelected={this.updateValuationRangeSelected.bind(this)}
								/>
							</div>
						</div>
					</div>

					{this.showContentValuation(valuationDataConf, sesionsDataConf)}
					<div className="box-footer">
						{this.renderDownloadButton(this.props.valuationsGraph ? this.props.valuationsGraph.csv : null, "valoracion.csv", "DESCARGAR")}
					</div>
				</Box>
				<Box
					datePicker={"date"}
					content="answers"
					loading={this.props.assertivenessLoading}
				>
					<div className="box-hd-tt">
						<p className="box-title"><strong>ASERTIVIDAD</strong> DE <strong>RESPUESTAS</strong></p>
					</div>
					<div className="box-hd-dp">
						<DatePicker
							datePickerActivated={this.state.answers_datePickerActivated}
							buttonFunction={this.answersDatePickerActivated.bind(this)}
							sizeDate="long"
							updateRangeSelected={this.updateAnswersRangeSelected.bind(this)}
						/>
					</div>
					<Answers
						data={AnswersDataConf}
						percentColor={this.state.answers_percentColor}
						percentageLastMonthAccepted={this.props.assertivenessVariation ? this.props.assertivenessVariation.lastMonthSi : "-"}
						percentageLastMonthNotAccepted={this.props.assertivenessVariation ? this.props.assertivenessVariation.lastMonthNo : "-"}
						percentagePrevMonthAccepted={this.props.assertivenessVariation ? this.props.assertivenessVariation.lastLastMonthSi : "-"}
						percentagePrevMonthNotAccepted={this.props.assertivenessVariation ? this.props.assertivenessVariation.lastLastMonthNo : "-"}
					/>
					<div className="box-footer">
						<div className="answer-footer">
							<div className="answer-nonacepted"></div>
							<p className="answer">No Acertadas</p>
						</div>
						<div className="answer-footer">
							<div className="answer-acepted"></div>
							<p className="answer">Acertadas</p>
						</div>
						{this.renderDownloadButton(this.props.assertivenessGraph ? this.props.assertivenessGraph.csv : null, "asertividad.csv", "DESCARGAR")}
					</div>
				</Box>
			</div>
		);
	}
}