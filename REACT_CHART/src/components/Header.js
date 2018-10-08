import React, { Component } from 'react';

class Header extends Component {

	render() {
		return (
			<div className="header">
				<div className="userInfo">
				   	<img className="UserPic" src="https://www2.shutterstock.com/blog/wp-content/uploads/sites/5/2015/02/crop3.jpg" alt="" />
				   	<div className="circle"></div>
				   	<ul className="userInfo">
				   		<li>
				   			<p className="userName">Nombre Usuario</p>
				   		</li>
				   		<li>
				   			<a className="singOut" href=""><strong>Cerrar Sesión</strong></a>
				   		</li>
				   	</ul>
			   	</div>
			</div>
		);
	}
}

export default Header;