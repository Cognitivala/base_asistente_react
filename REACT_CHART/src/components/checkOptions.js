import React, { Component } from 'react';

class checkOptions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterContent: "TODAS",
			filter: false,
			classButton: "filterPer",
			classArrow: "arrowFilter",
		};
	}

	updateFilterContent(selected) {
		var content = "";
		var allTrue = true;
		for(var i=0;i < selected.length; i++) {
			if(selected[i] === false){
				allTrue = false;
			}else{
				if(content === ""){
					content = selected[i];
				}else{
					content = content + ", " + selected[i];
				}
			}
		}
		if(content === ""){
			content = "NINGUNA";
		}
		if(allTrue){
			content = "TODAS";
		}
		this.setState({
			filterContent: content,
		})
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if(nextProps.filterList){
			if(!this.state.filterState){
				var filterState = [];
				nextProps.filterList.forEach((filter, i) => {
					filterState.push(true);
				});
				this.setState({filterState});
			}
		}
	}

	toggleFilter(i) {
		var selected = [];
		var filterState = {...this.state.filterState};
		filterState[i] = !filterState[i];
		this.setState({filterState});
		
		for(i=0;i < this.props.filterList.length; i++) {
			if(filterState[i]){
				selected.push(this.props.filterList[i].abreviatura);

			}else{
				selected.push(false);
			}
		}
		
		this.updateFilterContent(selected);
		this.props.updateFilterState(selected);
	}

	showOptions() {
		if(this.state.filter === true){
			var options = [];
			options.push(<div key="-1" className="div-modal" onClick={this.changeFilter.bind(this)}></div>);
			this.props.filterList.forEach((filter, i) => {
				options.push(<div key={i} className="buttonFilterOptions" onClick={() => {this.toggleFilter(i)}}>
								<div className="circleOption" style={{backgroundColor: filter.color}}></div>
								<p className="filterOptions">{filter.nombre}</p>
								<div className={this.state.filterState[i] ? "fo-checkbox-active" : "fo-checkbox"}></div>
							</div>);
			});
			
			return	<div className="filterOptions">
						{options}
					</div>
		}
	}

	changeFilter() {
		if(this.state.filter === true){
			this.setState({
				filter: false,
				classArrow: "arrowFilter",
				classButton: "filterPer"
			});
		}else{
			this.setState({
				filter: true,
				classArrow: "arrowFilter-active",
				classButton: "filterPer-active"
			});
		}
	}

	render() {
		return(
			<div className="checkOptions">
				<button className={this.state.classButton} onClick={this.changeFilter.bind(this)}><p className="filterPer">{this.state.filterContent}</p><div className={this.state.classArrow}></div></button>
				{this.showOptions()}
			</div>
		);
	}

}

export default checkOptions;