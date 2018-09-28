import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
class sideBar extends Component {

	render() {
		return (
				<div className="sideBar">
				   	<img className="cognitiva-principal" src="/assets/img/cognitiva_principal.png" alt="Logo" />
				   	<hr/>
				   	<ul className="sideBar">
				   		<li>
				   			<NavLink to="/indicadores" activeClassName="btn-active">
				   				<div className="sb-btn">
				   					<div className="btn-bar"></div>
				   					<img className="sb-btn-img" src="/assets/img/chart.png" alt=""/>
				   				</div>	
				   			</NavLink>	
				   		</li>
				   		<li>
				   			<NavLink to="/apariencia" activeClassName="btn-active">
				   				<div className="sb-btn">
				   					<div className="btn-bar"></div>
				   					<img className="sb-btn-img" src="/assets/img/pen.png" alt=""/>
				   				</div>
				   			</NavLink>
				   		</li>
				   		<li>
				   			<NavLink to="/configurar" activeClassName="btn-active">
				   				<div className="sb-btn">
				   					<div className="btn-bar"></div>
				   					<img className="sb-btn-img" src="/assets/img/settings.png" alt=""/>
				   				</div>
				   			</NavLink>
				   		</li>
				   		<li>
				   			<NavLink to="/administrador" activeClassName="btn-active">
				   				<div className="sb-btn">
				   					<div className="btn-bar"></div>
				   					<img className="sb-btn-img" src="/assets/img/users.png" alt=""/>
				   				</div>
				   			</NavLink>
				   		</li>
				   		<li>
				   			<input type="button" className="btn-html"/>
				   		</li>
				   	</ul>
				</div>

		);
	}
}


	


export default sideBar;