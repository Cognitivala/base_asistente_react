import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2'
import { merge } from 'lodash';
//import LastPrevMonth from './lastPrevMonth';

defaults.global.defaultFontFamily = 'geomanistbook';
defaults.global.defaultFontColor = '#CCCCCC';

merge(defaults, {
	global: {
  		animation: false,
	},
});

class lineChart extends Component {

	showChartPerHour(){
		this.props.changeXAxes("hour");
	}

	showChartPerDay(){
		this.props.changeXAxes("day");
	}

	showChartPerWeek(){
		this.props.changeXAxes("week");
	}

	showChartPerMonth(){
		this.props.changeXAxes("month");
	}
	renderPeriodButtons() {
		var firstDay = this.props.interaction_rangeSelected[0].format("YYYY-MM-DD");
		var lastDay = this.props.interaction_rangeSelected[1].format("YYYY-MM-DD");
		if(firstDay === lastDay) return null;
		return(
			<div className="range">
				{
				//<button className="btn-range" onClick={() => this.showChartPerHour()}>HORA</button>
				}
				<button className={this.props.showCharPer === "day" ? "btn-range-active" : "btn-range"} onClick={() => this.showChartPerDay()}>DÍA</button>
				<button className={this.props.showCharPer === "week" ? "btn-range-active" : "btn-range"} onClick={() => this.showChartPerWeek()}>SEMANA</button>
				<button className={this.props.showCharPer === "month" ? "btn-range-active" : "btn-range"} onClick={() => this.showChartPerMonth()}>MES</button>
			</div>
		);
	}
	render(){
		return( 
		<div className="box-content">
			{this.renderPeriodButtons()}			
			<br/>
			<div className="font-style-charts">
				<Line
					data={this.props.data}
			        height={25}
			        width={90}
			        options={{
			        	tooltips:{
			        		callbacks: {
			        			title: function(tooltipItem, data) {
									return 'Fecha: ' + data.labels[tooltipItem[0].index];
						        },
						        label: function(tooltipItem, data) {						        	
						        	if(tooltipItem.datasetIndex === 0) {
						            	return ' Número de Interacciones: ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];						        		
						        	}
						        	if(tooltipItem.datasetIndex === 1) {
						            	return ' Número de Sesiones: ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];						        		
						        	}
						        },
						    },
			        		titleFontFamily: 'geomanistlight',
			        		bodyFontFamily: 'geomanistbold',
			        		xPadding: 20,
			        		yPadding: 10,
			        		backgroundColor: '#1F313F',
			        	},
			        	legend:{
			        		display:false
			        	},
			        	scales: {
					        yAxes: [{
					            ticks: {
					                beginAtZero: true,
					            }
					        }],
					        xAxes: [{
					            gridLines: {
					                display: false
					            }
					        }],
					    }
			        }}
				/>
			</div>
			<div className="customers">
					<div className="scuareRed" style={{backgroundColor: "rgba(156,133,224,1)"}}></div>
					<p className="customers">Número de interacciones</p>
				</div>
				<div className="customers">
					<div className="scuareGreen" style={{backgroundColor: "#ffb735"}}></div>
					<p className="customers">Número de sesiones</p>
				</div>				
		</div>);		
	}
}

export default lineChart;