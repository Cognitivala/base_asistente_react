import React, { Component } from 'react';

class lastPrevMoth extends Component {

	render() {
		return(
			<div className="percent-barChart" style={{background: 'linear-gradient(to right, ' + this.props.color[0] + ' , ' + this.props.color[1] + ')'}}>
				<img className="percent-arrow" src="/assets/img/arrow.png" alt=""/>
				<p className="percent-thisMonth">{this.props.percentageLastMonth}%</p>
				<p className="percent-prevMonth">{this.props.percentagePrevMonth}%</p>
				<p className="thisMonth-text">Último Mes</p>
				<p className="prevMonth-text">Mes Anterior</p>
			</div>
		);
	}

}

export default lastPrevMoth;