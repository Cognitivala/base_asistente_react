import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class averageTime extends Component {

	render() {
		return(
			<div className="box-content">
				{
					/*
				}
				<div className="resumeAverage" style={{background: 'linear-gradient(to right, '+this.props.color[0]+' , '+this.props.color[1]+')'}}>
					<p className="average-max"><strong>Promedio máximo</strong> Último Mes</p>
					<p className="averageTime-thisMonth">{this.props.averageTimeLastMonth}</p>
					<p className="averageTime-prevMonth">{this.props.averageTimePrevMonth}</p>
					<p className="average-prevMonth">Mes Anterior</p>
				</div>
				{
					*/
				}
				<div className="font-style-charts">
					<Line
						data={this.props.data}
				        height={25}
			        	width={90}
				        options={{
				        	tooltips: {
				        		callbacks: {
				        			title: function(tooltipItem, data) {
										return 'Fecha: ' + data.labels[tooltipItem[0].index];
							        },
							        label: function(tooltipItem, data) {
			                    		return ' Tiempo: ' + secondsToFullTime(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
			                		}
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
						                callback: secondsToFullTime
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
			</div>
		);
	}
}

export default averageTime;
var secondsToFullTime = function(totalSeconds) {
  if(totalSeconds === "-") return "-:-:-"; 
  var hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  var minutes = Math.floor(totalSeconds / 60);
  if(minutes < 0) minutes *= -1;
  if((minutes+"").length === 1) minutes = "0" + minutes;
  var seconds = Math.round(totalSeconds % 60);
  if(seconds < 0) seconds *= -1;
    if((seconds+"").length === 1) seconds = "0" + seconds;

  return hours + ":" + minutes + ":" + seconds;
}