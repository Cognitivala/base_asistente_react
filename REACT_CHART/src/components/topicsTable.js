import React, { Component } from 'react';

class topicsTable extends Component {

	showRows() {
		
		var commentary = [];
		var higher = 0;
		var quantity = 0;
		var percentage = 0;
		if(this.props.data){
			for(var i=0; i < this.props.data.length; i++){
				if(this.props.data[i].cantidad > higher){
					higher = this.props.data[i].cantidad;
				}
			}
			
			for(i=0; i < this.props.data.length; i++){	
				// for(var x=0; x < this.props.filterState.length; x++){
					// if(this.props.filterState[x]){
						
						// if(this.props.data[i].categoria !== undefined){
							
							// if(this.props.filterState[x] === this.props.data[i].categoria.abreviatura){

								quantity = (this.props.data[i].cantidad * 100 ) / higher;
								quantity = Math.round(quantity);
								percentage = this.props.data[i].porcentaje.toFixed(1);
								// commentary.push(<tr key={i+"_"+x}>
								commentary.push(<tr key={i}>
													<td className="table-text">
														<li>{this.props.data[i].pregunta}</li>
													</td>
													<td className="table-number">
														<div className="table-bar" style={{width: quantity + 'px'}}></div>
														<p className="table-number">{this.props.data[i].cantidad}</p>
													</td>
													{/* <td className="table-categories">
														<div className="categ-tc" style={{background: this.props.data[i].categoria.color+"33",color: this.props.data[i].categoria.color}}>{this.props.data[i].categoria.abreviatura}</div>
													</td> */}
													<td className="table-percentage">{percentage.replace(".",",")}%</td>
												</tr>);


							// }
						// }
					// }
				// }
			}
		}

		return	<tbody>
					{commentary}
				</tbody>
	}

	render() {
		return(
			<div className="box-content-table">
				<div className="topicsTable-header">
					<table style={{width: '97%'}}>
						<tbody>
							<tr>
								<td style={{width: '40%'}}>PREGUNTA</td>
								<td style={{width: '20%'}}>NÚMERO</td>
								{/* <td style={{width: '20%'}}>CATEGORÍA</td> */}
								<td style={{width: '20%'}}>PORCENTAJE</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="topicsTable-content">
					<table className="topicsTable">
						{this.showRows()}
					</table>
				</div>
			</div>
		);
	}

}

export default topicsTable;