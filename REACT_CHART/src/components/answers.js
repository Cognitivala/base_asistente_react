import React, { Component } from 'react';
//import LastPrevMonth from './lastPrevMonth';
import {Bar} from 'react-chartjs-2';

class answers extends Component {

	render() { 
		return(
			<div className="box-content">
				{
					/*
				}
				<LastPrevMonth 
					color={this.props.percentColor[0].accepted}
					percentageLastMonth={this.props.percentageLastMonthNotAccepted}
					percentagePrevMonth={this.props.percentagePrevMonthNotAccepted}
				/>
				<LastPrevMonth 
					color={this.props.percentColor[1].notAccepted}
					percentageLastMonth={this.props.percentageLastMonthAccepted}
					percentagePrevMonth={this.props.percentagePrevMonthAccepted}
				/>
				<br/>
				{
					*/
				}
				<div className="font-style-charts">
					<div className="chart-answer">
						<Bar
							data={this.props.data}
					        height={25}
			        		width={90}
					        options={{
					        	tooltips:{
								    callbacks: {
								        title: function(tooltipItem, data) {
								        	if(tooltipItem[0].datasetIndex === 0){
												return 'Número Acertadas';
								        	}
								        	if(tooltipItem[0].datasetIndex === 1){
												return 'Número No Acertadas';
								        	}
								        },
								        label: function(tooltipItem, data) {
								            return ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
								        },
								    },
					        		titleFontFamily: 'geomanistlight',
					        		bodyFontFamily: 'geomanistbold',
					        		xPadding: 10,
					        		yPadding: 10,
					        		backgroundColor: '#1F313F',
					        	},
					        	legend:{
					        		display:false
					        	},
					        	scales: {
							        yAxes: [{
							        	stacked: true,
							            ticks: {
							                beginAtZero: true,
							            }
							        }],
							        xAxes: [{
							        	barPercentage: 0.4,
							        	stacked: true,
							            gridLines: {
							                display: false
							            }
							        }],
							    }
					        }}
						/>
					</div>
				</div>
			</div>
		);
	}

}

export default answers;