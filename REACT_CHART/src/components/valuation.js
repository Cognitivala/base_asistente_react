import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class valuation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valuation_data: {
				display: false,
			  	labels: null,
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
			      	data: null,
			    },
			    {
			    	label: "2",
			    	type: 'bar',
			      	backgroundColor: 'rgba(234,50,77,1)',
			      	yAxisID: 'y-axis-1',
			      	data: null
			    },
			    {
			    	label: "3",
			    	type: 'bar',
			    	backgroundColor: 'rgba(255,221,0,1)',
			    	yAxisID: 'y-axis-1',
			      	data: null
			    },
			    {
			    	label: "4",
			    	type: 'bar',
			      	backgroundColor: 'rgba(120,207,53,1)',
			      	yAxisID: 'y-axis-1',
			      	data: null
			    }
			  	]
			}
		}
	}

	render() {

		var sum_detractores = [];
		var sum_promotores = [];
		var sum_pasivos = [];
		var sum_total = [];
		var percentage_detractores = 0;
		var percentage_promotores = 0;
		var percentage_pasivos = 0;
		var valuation_data = {...this.state.valuation_data};

		valuation_data.datasets[1].data = this.props.data.datasets[1].data;
		valuation_data.datasets[2].data = this.props.data.datasets[2].data;
		valuation_data.datasets[3].data = this.props.data.datasets[3].data;
		sum_detractores = this.props.data.datasets[1].data;
		sum_pasivos = this.props.data.datasets[2].data;
		
		sum_promotores = this.props.data.datasets[3].data;

		for(var i = 0; i < sum_detractores.length; i++){
			sum_total[i] = sum_detractores[i] + sum_promotores[i] + sum_pasivos[i];
			if(sum_total[i]>0){
				
				percentage_detractores = (sum_detractores[i]*100)/sum_total[i];
				percentage_promotores = (sum_promotores[i]*100)/sum_total[i];
				percentage_pasivos = (sum_pasivos[i]*100)/sum_total[i];
			
				valuation_data.datasets[1].data[i] = percentage_detractores;
				valuation_data.datasets[2].data[i] = percentage_pasivos;
				valuation_data.datasets[3].data[i] = percentage_promotores;
			}
		}
		return(
			<div className="box-content">
				<div className="font-style-charts">
					<div className="chart-title">
						<p className="chart-title-left">Porcentaje</p>
						<p className="chart-title-right">NPS</p>
					</div>
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
											return 'Porcentaje de usuarios detractores';
							        	}
							        	if(tooltipItem[0].datasetIndex === 2){
											return 'Porcentaje de usuarios pasivos';
							        	}
							        	if(tooltipItem[0].datasetIndex === 3){
											return 'Porcentaje de usuarios promotores';
							        	}
							            
							        },
							        label: function(tooltipItem, data) {
							        	if (data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] % 1 === 0) {
									        return ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "%";
									    } else {
									        return ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toFixed(2).replace(".",",") + "%";
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
						            suggestedMax: 100,
						            suggestedMin: 0,
						            ticks: {
						            	stepSize: 25,
						            	min: 0,
					                   	max: 100,
					                   	callback: function(value){return value+ "%"}
					                },
						        },
						        {
						            position: 'right',
						            id: 'y-axis-2',
						            ticks: {
						            	stepSize: 50,
						            	min: -100,
					                   	max: 100,
					                   	callback: function(value){return value+ "%"}
					                },
						            gridLines: {
						            	display: false
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

export default valuation;

