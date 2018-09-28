import React, { Component } from 'react';

class box extends Component {

	loading() {
		if(this.props.loading){
			return <div>
						<div className="loading">
							<img className="loading" src="/assets/img/loader.gif" alt=""/>
							{/* <img className="loading" src="/img/loader.gif" alt=""/> */}
						</div>
					</div>
		}
	}

	render() {
		return(
			<div className="box" style={{width: "100%"}}>
				{this.props.children}
				{this.loading()}
			</div>
		);
	}

}

export default box;