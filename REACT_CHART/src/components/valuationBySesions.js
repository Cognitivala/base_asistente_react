import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class averageTime extends Component {

	render() {
		return(
			<div className="box-content">
				<div className="font-style-charts">
					<p className="chart-title-left">Cantidad</p>
					<p className="chart-title-right">NPS</p>
					<br/>
					<Bar
						data={this.props.data}
				        height={25}
			        	width={90}
				        options={{
				        	tooltips:{
				        		callbacks: {
							        title: function(tooltipItem, data) {
							        	if(tooltipItem[0].datasetIndex === 0){
											return 'NPS';
							        	}
							        	if(tooltipItem[0].datasetIndex === 1){
											return 'Cantidad de usuarios detractores';
							        	}
							        	if(tooltipItem[0].datasetIndex === 2){
											return 'Cantidad de usuarios pasivos';
							        	}
							        	if(tooltipItem[0].datasetIndex === 3){
											return 'Cantidad de usuarios promotores';
							        	}
							            
							        },
							        label: function(tooltipItem, data) {
							        	if(tooltipItem.datasetIndex === 0){
							        		if (data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] % 1 === 0) {
										        return ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "%";
										    } else {
										        return ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toFixed(2).replace(".",",") + "%";
										    }
							        	}else{
							        		return ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
							        	}
							            
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
						            position: 'left',
						            id: 'y-axis-1',
						            ticks: {
						            	min: -0,
					                },
						        },
						        {
						            position: 'right',
						            id: 'y-axis-2',
						            gridLines: {
						            	display: false
						            },
						            ticks: {
						            	stepSize: 50,
						            	min: -100,
					                   	max: 100,
					                   	callback: function(value){return value+ "%"}
					                },
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
				<div className="customers">
					<div className="scuareRed"></div>
					<p className="customers">Usuarios Detractores</p>
				</div>
				<div className="customers">
					<div className="scuareGreen"></div>
					<p className="customers">Usuarios Promotores</p>
				</div>
				<div className="customers">
					<div className="scuareYellow"></div>
					<p className="customers">Usuarios Pasivos</p>
				</div>
				<div className="customers">
					<div className="scuareYellow" style={{backgroundColor: "rgba(76,196,205,1)"}}></div>
					<p className="customers">NPS</p>
				</div>
			</div>
		);
	}
}

export default averageTime;